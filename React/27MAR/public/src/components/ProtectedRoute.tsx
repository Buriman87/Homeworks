import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import React, { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRouteProps {
  user: User | null;
  loading: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props): JSX.Element => {
  const { user, loading } = props;

  console.log(user);
  if (loading) {
    return <CircularProgress />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
