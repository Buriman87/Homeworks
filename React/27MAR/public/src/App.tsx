import React, { JSX } from "react";
import RoutesComponent from "./Routes/RoutesComponent";
import { AuthProvider } from "./AuthContext/AuthContext";

const App: React.FC = (): JSX.Element => {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
};

export default App;
