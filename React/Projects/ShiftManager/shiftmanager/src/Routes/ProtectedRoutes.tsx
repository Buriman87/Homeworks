import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import ProtectedLayout from "./ProtectedLayout";

interface IProtectedRoutesProps {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = (props) => {
  const { user, isLoading, logout } = props;

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ProtectedLayout logout={logout}>
      <Outlet />
    </ProtectedLayout>
  );
};

export default ProtectedRoutes;
