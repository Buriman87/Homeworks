import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { INewShift } from "../Interfaces/IAddNewShiftInterface";
import { useNavigate } from "react-router-dom";

interface IUser {
  id: string;
  username: string;
}

const AddNewShiftPageComponent: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs());
  const [salary, setSalary] = useState("");
  const [duration, setDuration] = useState<string>("");
  const [isNextDay, setIsNextDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedModerators, setSelectedModerators] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers: IUser[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username || doc.data().email || "Unnamed",
      }));
      setUsers(fetchedUsers);
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
    }
  }, [checkIn, checkOut, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

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

    const newShift: INewShift = {
      id,
      date: date?.format("YYYY-MM-DD") || "",
      checkIn: checkInDate?.format("YYYY-MM-DDTHH:mm") || "",
      checkOut: checkOutDate?.format("YYYY-MM-DDTHH:mm") || "",
      duration,
      salary: Number(salary),
      moderators: selectedModerators,
      users: selectedUsers,
    };

    try {
      await setDoc(doc(db, "Shifts", id), newShift);
      setSuccess("Shift successfully added!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Failed to add shift:", err);
      setSuccess("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add New Shift
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />

          <TimePicker
            label="Check-In Time"
            value={checkIn}
            onChange={(newValue) => setCheckIn(newValue)}
          />

          <TimePicker
            label="Check-Out Time"
            value={checkOut}
            onChange={(newValue) => setCheckOut(newValue)}
          />

          <TextField
            required
            label="Salary Amount ($)"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          {duration && (
            <Typography
              variant="body2"
              sx={{ mt: 1, ml: 1, color: "text.secondary" }}
            >
              Duration: <strong>{duration}</strong>
              {isNextDay && (
                <Typography variant="caption" sx={{ color: "orange", ml: 1 }}>
                  (Check-out is on the next day)
                </Typography>
              )}
            </Typography>
          )}

          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="user-select-label">Select Users</InputLabel>
            <Select
              multiple
              labelId="user-select-label"
              value={selectedUsers}
              onChange={(e) => setSelectedUsers(e.target.value as string[])}
              input={<OutlinedInput label="Select Users" />}
              renderValue={(selected) =>
                users
                  .filter((u) => selected.includes(u.id))
                  .map((u) => u.username)
                  .join(", ")
              }
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox checked={selectedUsers.indexOf(user.id) > -1} />
                  <ListItemText primary={user.username} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="moderator-select-label">
              Select Moderators
            </InputLabel>
            <Select
              multiple
              labelId="moderator-select-label"
              value={selectedModerators}
              onChange={(e) =>
                setSelectedModerators(e.target.value as string[])
              }
              input={<OutlinedInput label="Select Moderators" />}
              renderValue={(selected) =>
                users
                  .filter((u) => selected.includes(u.id))
                  .map((u) => u.username)
                  .join(", ")
              }
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox
                    checked={selectedModerators.indexOf(user.id) > -1}
                  />
                  <ListItemText primary={user.username} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={3} textAlign="center">
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
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Paper>
  );
};

export default AddNewShiftPageComponent;
