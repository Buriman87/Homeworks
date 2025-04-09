import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Paper,
  CircularProgress,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface IUserRow {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

const ViewAllUsersPageComponent: React.FC = () => {
  const [users, setUsers] = useState<IUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData: IUserRow[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            role: data.role || "",
            isActive: data.isActive ?? true,
          };
        });
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "isActive",
      headerName: "Active",
      width: 100,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            onClick={() => navigate(`/edituser/${params.row.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => console.log("Delete user", params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 550, width: "100%", mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        All Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate("/adduser")}
      >
        Add User
      </Button>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default ViewAllUsersPageComponent;
