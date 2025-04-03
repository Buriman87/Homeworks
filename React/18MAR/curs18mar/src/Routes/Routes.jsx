import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginComponent } from "../components/LoginComponent/LoginComponent";

export function RoutesComponents(){
    return(
        <Router>
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/Home" element={<HomeComponent />}></Route>
          <Route path="/Result" element={<ResultComponent />}></Route>
          <Route path="/Data" element={<DataComponent />}></Route>
          <Route path="*" element={<NotFoundComponent />}></Route>
        </Routes>
      </Router>
    )
}
