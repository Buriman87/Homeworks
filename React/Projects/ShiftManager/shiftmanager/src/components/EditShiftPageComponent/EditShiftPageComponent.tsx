import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Autocomplete,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import NotFoundPageComponent from "../NotFoundPageComponent/NotFoundPageComponent";

interface IUserOption {
  id: string;
  label: string;
}

const EditShiftPageComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState<Dayjs | null>(null);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [salary, setSalary] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [moderators, setModerators] = useState<IUserOption[]>([]);
  const [users, setUsers] = useState<IUserOption[]>([]);
  const [userOptions, setUserOptions] = useState<IUserOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        const usersList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          label: `${doc.data().lastName} ${doc.data().firstName}`,
        }));
        setUserOptions(usersList);

        const docRef = doc(db, "Shifts", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setNotFound(true);
          return;
        }

        const data = docSnap.data();
        setDate(dayjs(data.date));
        setCheckIn(dayjs(data.checkIn));
        setCheckOut(dayjs(data.checkOut));
        setSalary(String(data.salary));
        setDuration(data.duration);
        setModerators(
          data.moderators
            ?.map((uid: string) => usersList.find((u) => u.id === uid))
            .filter(Boolean) || []
        );
        setUsers(
          data.users
            ?.map((uid: string) => usersList.find((u) => u.id === uid))
            .filter(Boolean) || []
        );
      } catch (error) {
        console.error("Failed to load shift", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut && date) {
      const checkInFull = date.hour(checkIn.hour()).minute(checkIn.minute());
      let checkOutFull = date.hour(checkOut.hour()).minute(checkOut.minute());

      if (checkOutFull.isBefore(checkInFull)) {
        checkOutFull = checkOutFull.add(1, "day");
      }

      const diffMinutes = checkOutFull.diff(checkInFull, "minute");
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      setDuration(`${hours}h ${minutes}m`);
    }
  }, [checkIn, checkOut, date]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !date || !checkIn || !checkOut) return;
    setSaving(true);

    try {
      await updateDoc(doc(db, "Shifts", id), {
        date: date.format("YYYY-MM-DD"),
        checkIn: date
          .hour(checkIn.hour())
          .minute(checkIn.minute())
          .format("YYYY-MM-DDTHH:mm"),
        checkOut: date
          .hour(checkOut.hour())
          .minute(checkOut.minute())
          .isBefore(date.hour(checkIn.hour()).minute(checkIn.minute()))
          ? date
              .hour(checkOut.hour())
              .minute(checkOut.minute())
              .add(1, "day")
              .format("YYYY-MM-DDTHH:mm")
          : date
              .hour(checkOut.hour())
              .minute(checkOut.minute())
              .format("YYYY-MM-DDTHH:mm"),
        salary: Number(salary),
        duration,
        moderators: moderators.map((m) => m.id),
        users: users.map((u) => u.id),
      });

      // ✅ Update currentShift for users
      await Promise.all(
        users.map((user) =>
          updateDoc(doc(db, "users", user.id), {
            currentShift: id,
          })
        )
      );

      setSnackbarMessage("Shift updated successfully");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/shifts"), 1000);
    } catch (err) {
      console.error("Update failed:", err);
      setSnackbarMessage("Failed to update shift");
      setSnackbarOpen(true);
    } finally {
      setSaving(false);
    }
  };

  if (notFound) return <NotFoundPageComponent />;

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Edit Shift
      </Typography>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component="form" onSubmit={handleUpdate}>
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
              options={userOptions}
              getOptionLabel={(option) => option.label}
              value={moderators}
              onChange={(_, value) => setModerators(value)}
              renderInput={(params) => (
                <TextField {...params} label="Moderators" sx={{ mb: 2 }} />
              )}
            />
            <Autocomplete
              multiple
              options={userOptions}
              getOptionLabel={(option) => option.label}
              value={users}
              onChange={(_, value) => setUsers(value)}
              renderInput={(params) => (
                <TextField {...params} label="Users" sx={{ mb: 2 }} />
              )}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
              Duration: <strong>{duration}</strong>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={saving}
            >
              {saving ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </Box>
        </LocalizationProvider>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EditShiftPageComponent;
