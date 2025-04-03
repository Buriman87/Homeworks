import React, { JSX } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useAuth } from "./Contexts/AuthContext";
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";
import NotFoundComponent from "./Components/NotFoundComponent/NotFoundComponent";
import HomePageComponent from "./Components/HomePageComponent/HomePageComponent";
import LoginPageComponent from "./Components/LoginPageComponent/LoginPageComponent";
import RegisterPageComponent from "./Components/RegisterPageComponent/RegisterPageComponent";
import DashBoardComponent from "./Components/DashboardComponent/DashBoardComponent";
import PrivateRoute from "./PrivateRoute";

const App: React.FC = (): JSX.Element => {
  const { users, user, logout, register, login } = useAuth();
  console.log(users);
  return (
    <Router>
      <NavbarComponent user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/dashboard/:id" element={<DashBoardComponent />} />
        </Route>
        <Route path="/login" element={<LoginPageComponent login={login} />} />
        <Route
          path="/register"
          element={<RegisterPageComponent register={register} />}
        />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
