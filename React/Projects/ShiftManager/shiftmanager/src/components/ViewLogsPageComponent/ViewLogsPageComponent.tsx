import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc as firestoreDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import dayjs from "dayjs";

interface LogEntry {
  id: string;
  userId: string;
  modifiedBy: string;
  action: string;
  changes: string[];
  timestamp?: { seconds: number; nanoseconds: number };
}

const ViewLogsPageComponent: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState<Record<string, string>>({});
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, "logs"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const logsData: LogEntry[] = snapshot.docs.map((docSnap): LogEntry => {
          const data = docSnap.data() as DocumentData;
          return {
            id: docSnap.id,
            userId: data.userId || "",
            modifiedBy: data.modifiedBy || "",
            action: data.action || "",
            changes: Array.isArray(data.changes) ? data.changes : [],
            timestamp: data.timestamp,
          };
        });

        const uniqueUserIds = Array.from(
          new Set([
            ...logsData.map((log) => log.userId).filter((id) => id),
            ...logsData.map((log) => log.modifiedBy).filter((id) => id),
          ])
        );

        const userMap: Record<string, string> = {};
        await Promise.all(
          uniqueUserIds.map(async (uid) => {
            if (!uid || uid.includes("/")) return;
            try {
              const userDocRef = firestoreDoc(db, "users", uid);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                userMap[uid] =
                  userData.username ||
                  `${userData.firstName} ${userData.lastName}`;
              } else {
                userMap[uid] = uid;
              }
            } catch (err) {
              userMap[uid] = uid;
            }
          })
        );

        setUsernames(userMap);
        setLogs(logsData);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      (usernames[log.userId] || log.userId)
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      (usernames[log.modifiedBy] || log.modifiedBy)
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      log.action.toLowerCase().includes(filterText.toLowerCase()) ||
      log.changes.join(", ").toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Paper sx={{ maxWidth: 1200, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        System Logs
      </Typography>

      <TextField
        fullWidth
        placeholder="Search logs..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Modified By</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Changes</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{usernames[log.userId] || log.userId}</TableCell>
                <TableCell>
                  {usernames[log.modifiedBy] || log.modifiedBy}
                </TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.changes?.join(", ")}</TableCell>
                <TableCell>
                  {log.timestamp
                    ? dayjs
                        .unix(log.timestamp.seconds)
                        .format("YYYY-MM-DD HH:mm:ss")
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default ViewLogsPageComponent;
