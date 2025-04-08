import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRoutesProps {
  user: User | null;
  isLoading: boolean;
}
const ProtectedRoutes: React.FC<IProtectedRoutesProps> = (props) => {
  const { user, isLoading } = props;
  if (isLoading) {
    return <CircularProgress />;
  }
  return user ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoutes;
