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
import { INewShift } from "../Interfaces/IAddNewShiftInterface";
import { useNavigate } from "react-router-dom";

interface IUserOption {
  id: string;
  label: string;
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
      moderators: selectedModerators.map((m) => m.id),
      users: selectedUsers.map((u) => u.id),
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
      setSalary("");
      navigate("/");
    } catch (err) {
      console.error("Failed to add shift:", err);
      setSuccess("Something went wrong.");
    } finally {
      setLoading(false);
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={handleSubmit}>
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
            label="Salary"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <Autocomplete
            multiple
            options={usersList}
            getOptionLabel={(option) => option.label}
            value={selectedModerators}
            onChange={(_, value) => setSelectedModerators(value)}
            renderInput={(params) => (
              <TextField {...params} label="Moderators" sx={{ mb: 2 }} />
            )}
          />
          <Autocomplete
            multiple
            options={usersList}
            getOptionLabel={(option) => option.label}
            value={selectedUsers}
            onChange={(_, value) => setSelectedUsers(value)}
            renderInput={(params) => (
              <TextField {...params} label="Users" sx={{ mb: 2 }} />
            )}
          />
          <Typography variant="body2" sx={{ mb: 2 }}>
            Duration: <strong>{duration}</strong>
            {isNextDay && (
              <Typography variant="caption" sx={{ color: "orange", ml: 1 }}>
                (Check-out is on the next day)
              </Typography>
            )}
          </Typography>
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
