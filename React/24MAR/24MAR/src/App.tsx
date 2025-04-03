import React from "react";
import { AppRoute } from "./Routes/Routes";
import { AuthProvider } from "./Contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
};

export default App;
