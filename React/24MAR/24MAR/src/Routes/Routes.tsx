import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageComponent from "../Components/HomePageComponent";
import RegisterPageComponent from "../Components/RegisterPageComponent";
import LogInPageComponent from "../Components/LogInPageComponent";
import { useAuth } from "../Contexts/AuthContext";

export const AppRoute: React.FC = (): JSX.Element => {
  const { register } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageComponent />}></Route>
        <Route
          path="/register"
          element={<RegisterPageComponent register={register} />}
        ></Route>
        <Route path="/login" element={<LogInPageComponent />}></Route>
      </Routes>
    </Router>
  );
};
