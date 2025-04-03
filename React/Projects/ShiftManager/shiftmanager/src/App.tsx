import "./App.css";
import { AuthProvider } from "./components/Context/AuthContext";

import { RoutesComponent } from "./Routes/RoutesComponent";

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
