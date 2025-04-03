import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePageComponent from "../components/HomePageComponent";
import LoginPageComponent from "../components/LoginPageComponent";
import RegisterPageComponent from "../components/RegisterPageComponent";
import NotFoundPageComponent from "../components/NotFoundPageComponent";
import AddFlat from "../components/AddFlat";
import { useAuth } from "../AuthContext/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

const RoutesComponent: React.FC = (): JSX.Element => {
  const { user, loading } = useAuth();
  const text = "text";
  const textDoi = "text Doi";
  const addNumber = (a: number, b: number) => {
    return a + b;
  };
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute user={user} loading={loading} />}>
          <Route path="/addflat" element={<AddFlat />} />
          <Route
            path="/"
            element={
              <HomePageComponent
                text={text}
                textDoi={textDoi}
                addNumber={addNumber}
              />
            }
          />
        </Route>
        <Route element={<PublicRoute user={user} loading={loading} />}>
          <Route path="/login" element={<LoginPageComponent />} />
          <Route path="/register" element={<RegisterPageComponent />} />
        </Route>
        <Route path="*" element={<NotFoundPageComponent />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
