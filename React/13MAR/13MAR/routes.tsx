import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import HomeComponent from "./components/HomeComponent"
import ContactComponent from "./components/ContactComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import DashboardComponent from "./components/DashboardComponent";
import AnaliticsComponent from "./components/AnaliticsComponent";
import CyberComponent from "./components/CyberComponent";
import PrivateRoute from "./components/PrivateRouteComponent";

const Rute =()=>{


    return(
      <Router>
        <Routes>
            <Route path="/" element={<HomeComponent/>}/>
            <Route path="/Contact/:prenume" element={<PrivateRoute><ContactComponent/></PrivateRoute>}/>

            <Route path="/dashboard" element={<DashboardComponent/>}>
                <Route path="analitics" element={<AnaliticsComponent/>}/>
                <Route path="cyber" element={<CyberComponent/>}/>

            </Route>

            <Route path="*" element={<NotFoundComponent/>}/>

        </Routes>


      </Router>


    )
}
export default Rute;