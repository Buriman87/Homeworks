import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import NotFoundComponent from "./components/notFoundComponent";
import ContactComponent from "./components/ContactComponent";
import DashboardComponent from "./components/DashboardComponent";
import AnaliticsComponent from "./components/AnaliticsComponent";
import CyberComponent from "./components/CyberComponent";

const Rute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/Contact/:prenume" element={<ContactComponent />} />
        <Route path="*" element={<NotFoundComponent />} />

        <Route path="/dashboard" element={<DashboardComponent />}>
          <Route path="analictics" element={<AnaliticsComponent />} />
          
          <Route path="cyber" element={<CyberComponent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rute;
