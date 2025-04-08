import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPageComponent from "../components/RegisterPageComponent/RegisterPageComponent";
import HomepageComponent from "../components/HomepageComponent/HomepageComponent";
import NotFoundPageComponent from "../components/NotFoundPageComponent/NotFoundPageComponent";
import { useAuth } from "../components/Context/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPageComponent from "../components/LoginPageComponent/LoginPageComponent";
import AddNewShiftPageComponent from "../components/AddNewShiftPageComponent/AddNewShiftPageComponent";
import ViewAllShiftsPageComponent from "../components/ViewAllShiftsPageComponent/ViewAllShiftsPageComponent";

export const RoutesComponent: React.FC = (): JSX.Element => {
  const { user, isLoading, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes user={user} isLoading={isLoading} />}>
          <Route path="/" element={<HomepageComponent logout={logout} />} />
          <Route path="/addnewshift" element={<AddNewShiftPageComponent />} />
          <Route path="/shifts" element={<ViewAllShiftsPageComponent />} />
        </Route>
        <Route element={<PublicRoutes user={user} isLoading={isLoading} />}>
          <Route path="/register" element={<RegisterPageComponent />} />
          <Route path="/login" element={<LoginPageComponent />} />
        </Route>
        <Route path="*" element={<NotFoundPageComponent />} />
      </Routes>
    </Router>
  );
};
