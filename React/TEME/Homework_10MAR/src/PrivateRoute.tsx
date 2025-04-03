import React from "react";
import { IUser } from "./Interfaces/UserInterface";
import { Navigate, Outlet } from "react-router-dom";

interface IPrivateRouteProps {
  user?: IUser;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const { user } = props;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
