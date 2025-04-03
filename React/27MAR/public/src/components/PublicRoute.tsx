import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import React, { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IPublicRouteProps {
  user: User | null;
  loading: boolean;
}

const PublicRoute: React.FC<IPublicRouteProps> = (props): JSX.Element => {
  const { user, loading } = props;

  console.log(user);
  if (loading) {
    return <CircularProgress />;
  }
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
