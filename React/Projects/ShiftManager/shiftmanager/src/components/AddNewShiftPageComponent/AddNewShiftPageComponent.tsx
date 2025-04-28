import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ListItemIcon,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface IUserOption {
  id: string;
  label: string;
  role: string;
}

const AddNewShiftPageComponent: React.FC = () => {
  const [name, setName] = useState<"daytime" | "nighttime" | "">("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs());
  const [salaryPerHour, setSalaryPerHour] = useState("");
  const [calculatedSalary, setCalculatedSalary] = useState(0);
  const [duration, setDuration] = useState<string>("");
  const [isNextDay, setIsNextDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [usersList, setUsersList] = useState<IUserOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUserOption[]>([]);
  const [selectedModerators, setSelectedModerators] = useState<IUserOption[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        label: `${doc.data().lastName} ${doc.data().firstName}`,
        role: doc.data().role,
      }));
      setUsersList(list);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (checkIn && checkOut && date) {
      const checkInFull = date.hour(checkIn.hour()).minute(checkIn.minute());
      let checkOutFull = date.hour(checkOut.hour()).minute(checkOut.minute());

      if (checkOutFull.isBefore(checkInFull)) {
        checkOutFull = checkOutFull.add(1, "day");
        setIsNextDay(true);
      } else {
        setIsNextDay(false);
      }

      const diffMinutes = checkOutFull.diff(checkInFull, "minute");
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      setDuration(`${hours}h ${minutes}m`);

      const salary = parseFloat(salaryPerHour || "0");
      const total = (diffMinutes / 60) * salary * selectedUsers.length;
      setCalculatedSalary(Math.round(total * 100) / 100);
    }
  }, [checkIn, checkOut, date, salaryPerHour, selectedUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const id = uuidv4();
    const checkInDate = date
      ?.hour(checkIn?.hour() || 0)
      .minute(checkIn?.minute() || 0);
    let checkOutDate = date
      ?.hour(checkOut?.hour() || 0)
      .minute(checkOut?.minute() || 0);
    if (checkOutDate && checkInDate && checkOutDate.isBefore(checkInDate)) {
      checkOutDate = checkOutDate.add(1, "day");
    }

    const newShift = {
      id,
      name,
      date: date?.format("YYYY-MM-DD") || "",
      checkIn: checkInDate?.format("YYYY-MM-DDTHH:mm") || "",
      checkOut: checkOutDate?.format("YYYY-MM-DDTHH:mm") || "",
      duration,
      estimatedSalary: calculatedSalary,
      moderators: selectedModerators.map((m) => m.id),
      users: selectedUsers.map((u) => u.id),
      confirmations: [],
    };

    try {
      await setDoc(doc(db, "Shifts", id), newShift);

      await Promise.all(
        selectedUsers.map((user) =>
          updateDoc(doc(db, "users", user.id), {
            currentShift: id,
          })
        )
      );

      setSuccess("Shift successfully added!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Failed to add shift:", err);
      setError("Something went wrong while saving the shift.");
    } finally {
      setLoading(false);
    }
  };

  const eligibleModerators = usersList.filter((u) =>
    ["owner", "moderator"].includes(u.role)
  );
  const eligibleUsers = usersList.filter((u) =>
    ["owner", "moderator", "user"].includes(u.role)
  );

  const getIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <AdminPanelSettingsIcon fontSize="small" />;
      case "moderator":
        return <SupervisorAccountIcon fontSize="small" />;
      default:
        return <EmojiPeopleIcon fontSize="small" />;
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add New Shift
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="shift-label">Shift Name</InputLabel>
            <Select
              labelId="shift-label"
              value={name}
              label="Shift Name"
              onChange={(e) =>
                setName(e.target.value as "daytime" | "nighttime")
              }
              required
            >
              <MenuItem value="daytime">Daytime</MenuItem>
              <MenuItem value="nighttime">Nighttime</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            sx={{ mb: 2, width: "100%" }}
          />
          <TimePicker
            label="Check-In"
            value={checkIn}
            onChange={setCheckIn}
            sx={{ mb: 2, width: "100%" }}
          />
          <TimePicker
            label="Check-Out"
            value={checkOut}
            onChange={setCheckOut}
            sx={{ mb: 2, width: "100%" }}
          />
          <TextField
            label="Salary per Hour"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={salaryPerHour}
            onChange={(e) => setSalaryPerHour(e.target.value)}
          />

          <Typography variant="body2" sx={{ mb: 2 }}>
            Duration: <strong>{duration}</strong>
            {isNextDay && (
              <Typography variant="caption" sx={{ color: "orange", ml: 1 }}>
                (Check-out is on the next day)
              </Typography>
            )}
          </Typography>

          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Estimated Cost with Salary: <strong>${calculatedSalary}</strong>
          </Typography>

          <Autocomplete
            multiple
            options={eligibleModerators}
            groupBy={(option) => option.role}
            getOptionLabel={(option) => option.label}
            value={selectedModerators}
            onChange={(_, value) => setSelectedModerators(value)}
            renderOption={(props, option) => (
              <li {...props}>
                <ListItemIcon>{getIcon(option.role)}</ListItemIcon>
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Moderators" sx={{ mb: 2 }} />
            )}
          />

          <Autocomplete
            multiple
            options={eligibleUsers}
            groupBy={(option) => option.role}
            getOptionLabel={(option) => option.label}
            value={selectedUsers}
            onChange={(_, value) => setSelectedUsers(value)}
            renderOption={(props, option) => (
              <li {...props}>
                <ListItemIcon>{getIcon(option.role)}</ListItemIcon>
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Users" sx={{ mb: 2 }} />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save Shift"}
          </Button>
        </Box>
      </LocalizationProvider>
    </Paper>
  );
};

export default AddNewShiftPageComponent;
