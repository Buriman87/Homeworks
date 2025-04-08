import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IPublicRoutesProps {
  user: User | null;
  isLoading: boolean;
}
const PublicRoutes: React.FC<IPublicRoutesProps> = (props) => {
  const { user, isLoading } = props;
  if (isLoading) {
    return <CircularProgress />;
  }
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
