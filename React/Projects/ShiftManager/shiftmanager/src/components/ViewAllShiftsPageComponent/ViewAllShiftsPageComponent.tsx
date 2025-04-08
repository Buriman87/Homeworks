import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface ShiftRow {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  salary: number;
}

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
];

const paginationModel = { page: 0, pageSize: 5 };

const ViewAllShiftsPageComponent: React.FC = () => {
  const [rows, setRows] = useState<ShiftRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Shifts"));
        const fetchedShifts: ShiftRow[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            date: data.date,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            duration: data.duration,
            salary: data.salary,
          };
        });
        setRows(fetchedShifts);
      } catch (err) {
        console.error("Error loading shifts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  return (
    <Paper sx={{ height: 500, width: "100%", p: 2, mt: 4 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default ViewAllShiftsPageComponent;
