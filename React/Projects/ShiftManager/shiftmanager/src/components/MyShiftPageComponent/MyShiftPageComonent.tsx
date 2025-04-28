import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import dayjs from "dayjs";

interface IShift {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  salary: number;
  confirmed?: boolean;
}

const MyShiftPageComponent: React.FC = () => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "checkIn", headerName: "Check-In", width: 160 },
    { field: "checkOut", headerName: "Check-Out", width: 160 },
    { field: "duration", headerName: "Duration", width: 120 },
    { field: "salary", headerName: "Salary ($)", width: 120, type: "number" },
    {
      field: "confirm",
      headerName: "Action",
      width: 150,
      renderCell: (params) =>
        params.row.confirmed ? (
          <Typography color="success.main">Confirmed</Typography>
        ) : (
          <Button
            variant="outlined"
            size="small"
            disabled={confirming === params.row.id}
            onClick={() => handleConfirm(params.row.id)}
          >
            {confirming === params.row.id ? "Confirming..." : "Confirm"}
          </Button>
        ),
    },
  ];

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const snapshot = await getDocs(collection(db, "Shifts"));
        const allShifts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];

        const assignedShifts = allShifts.filter(
          (shift) =>
            shift.users?.includes(currentUser.uid) ||
            shift.moderators?.includes(currentUser.uid)
        );

        const formattedShifts = assignedShifts.map((shift) => ({
          id: shift.id,
          date: shift.date,
          checkIn: dayjs(shift.checkIn).format("YYYY-MM-DD HH:mm"),
          checkOut: dayjs(shift.checkOut).format("YYYY-MM-DD HH:mm"),
          duration: shift.duration,
          salary: shift.salary,
          confirmed: shift.confirmations?.includes(currentUser.uid) || false,
        }));

        setShifts(formattedShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  const handleConfirm = async (shiftId: string) => {
    setConfirming(shiftId);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const shiftRef = doc(db, "Shifts", shiftId);
      const shiftDocSnap = await getDocs(collection(db, "Shifts"));
      const shiftData = shiftDocSnap.docs
        .find((doc) => doc.id === shiftId)
        ?.data();

      const updatedConfirmations = [
        ...(shiftData?.confirmations || []),
        currentUser.uid,
      ];

      await updateDoc(shiftRef, {
        confirmations: updatedConfirmations,
      });

      await addDoc(collection(db, "logs"), {
        userId: currentUser.uid,
        modifiedBy: currentUser.uid,
        action: "Shift Confirmation",
        changes: [`Confirmed shift ${shiftId}`],
        timestamp: serverTimestamp(),
      });

      setShifts((prev) =>
        prev.map((shift) =>
          shift.id === shiftId ? { ...shift, confirmed: true } : shift
        )
      );

      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to confirm shift:", err);
    } finally {
      setConfirming(null);
    }
  };

  return (
    <Paper sx={{ height: 500, width: "100%", mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        My Assigned Shifts
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={shifts}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          sx={{ border: 0 }}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Shift confirmed!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default MyShiftPageComponent;
