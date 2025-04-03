import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePageComponent } from "./components/HomePageComponent/HomePageComponent";
import { SignInPageComponent } from "./components/SignInComponentPage/SignInComponentPage";

export const AppRoute: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePageComponent />}></Route>
        <Route path="/signin" element={<SignInPageComponent />}></Route>
      </Routes>
    </Router>
  );
};
