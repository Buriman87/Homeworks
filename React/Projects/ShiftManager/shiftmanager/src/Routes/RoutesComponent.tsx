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
import EditShiftPageComponent from "../components/EditShiftPageComponent/EditShiftPageComponent";
import ViewAllUsersPageComponent from "../components/ViewAllUsersPageComponent/ViewAllUsersPageComponent";
import MyProfilePageComponent from "../components/MyProfilePageComponent/MyProfilePageComponent";
import ViewLogsPageComponent from "../components/ViewLogsPageComponent/ViewLogsPageComponent";

export const RoutesComponent: React.FC = (): JSX.Element => {
  const { user, isLoading, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          element={
            <ProtectedRoutes
              user={user}
              isLoading={isLoading}
              logout={logout}
            />
          }
        >
          <Route path="/" element={<HomepageComponent />} />
          <Route path="/addnewshift" element={<AddNewShiftPageComponent />} />
          <Route path="/shifts" element={<ViewAllShiftsPageComponent />} />
          <Route path="/editshift/:id" element={<EditShiftPageComponent />} />
          <Route path="/users" element={<ViewAllUsersPageComponent />} />
          <Route path="/myprofile" element={<MyProfilePageComponent />} />
          <Route path="/viewlogs" element={<ViewLogsPageComponent />} />
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
