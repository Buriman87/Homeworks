import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridEventListener,
} from "@mui/x-data-grid";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

interface ShiftRow {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  salary: number;
  moderators: string[];
  users: string[];
}

interface IUserMap {
  [uid: string]: string;
}

const ViewAllShiftsPageComponent: React.FC = () => {
  const [rows, setRows] = useState<ShiftRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userMap, setUserMap] = useState<IUserMap>({});
  const [selectedShift, setSelectedShift] = useState<ShiftRow | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const userMapData: IUserMap = {};
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          userMapData[doc.id] = `${data.lastName || ""} ${
            data.firstName || ""
          }`.trim();
        });
        setUserMap(userMapData);

        const shiftSnapshot = await getDocs(collection(db, "Shifts"));
        const fetchedShifts: ShiftRow[] = shiftSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            date: data.date,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            duration: data.duration,
            salary: data.salary,
            moderators: data.moderators || [],
            users: data.users || [],
          };
        });

        setRows(fetchedShifts);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderUserNames = (ids: string[]) =>
    ids.map((id) => userMap[id] || id).join(", ");

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setSelectedShift(params.row);
  };

  const handleCloseModal = () => setSelectedShift(null);
  const handleCloseConfirm = () => setConfirmOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleEdit = () => {
    if (selectedShift) navigate(`/editshift/${selectedShift.id}`);
  };

  const handleDelete = async () => {
    if (!selectedShift) return;

    try {
      await deleteDoc(doc(db, "Shifts", selectedShift.id));
      setRows((prev) => prev.filter((shift) => shift.id !== selectedShift.id));
      handleCloseModal();
      setSnackbarMessage("Shift deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Delete error:", err);
      setSnackbarMessage("Failed to delete shift.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setConfirmOpen(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "checkIn", headerName: "Check-In", width: 140 },
    { field: "checkOut", headerName: "Check-Out", width: 140 },
    { field: "duration", headerName: "Duration", width: 100 },
    {
      field: "salary",
      headerName: "Salary ($)",
      type: "number",
      width: 110,
    },
    {
      field: "moderators",
      headerName: "Moderators",
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        renderUserNames(params.value as string[]),
    },
    {
      field: "users",
      headerName: "Users",
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        renderUserNames(params.value as string[]),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => setSelectedShift(params.row)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <Paper sx={{ height: 500, width: "100%", p: 2, mt: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10]}
          onRowClick={handleRowClick}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          sx={{ border: 0, cursor: "pointer" }}
        />
      </Paper>

      {/* Details Modal */}
      <Dialog
        open={!!selectedShift}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Shift Details</DialogTitle>
        <DialogContent dividers>
          {selectedShift && (
            <>
              <Typography>
                <strong>Date:</strong> {selectedShift.date}
              </Typography>
              <Typography>
                <strong>Check-In:</strong> {selectedShift.checkIn}
              </Typography>
              <Typography>
                <strong>Check-Out:</strong> {selectedShift.checkOut}
              </Typography>
              <Typography>
                <strong>Duration:</strong> {selectedShift.duration}
              </Typography>
              <Typography>
                <strong>Salary:</strong> ${selectedShift.salary}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1">Moderators</Typography>
              <List dense>
                {selectedShift.moderators.map((id) => (
                  <ListItem key={id}>
                    <ListItemText primary={userMap[id] || id} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Users
              </Typography>
              <List dense>
                {selectedShift.users.map((id) => (
                  <ListItem key={id}>
                    <ListItemText primary={userMap[id] || id} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Edit
          </Button>
          <Button
            onClick={() => setConfirmOpen(true)}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this shift? This action is
          irreversible.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ViewAllShiftsPageComponent;
