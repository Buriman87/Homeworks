import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPageComponent from "../components/RegisterPageComponent/RegisterPageComponent";
import HomepageComponent from "../components/HomepageComponent/HomepageComponent";
import NotFoundPageComponent from "../components/NotFoundPageComponent/NotFoundPageComponent";

export const RoutesComponent:React.FC = ():JSX.Element =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomepageComponent/>}/>
                <Route path="/register" element={<RegisterPageComponent/>}/>
                <Route path="*" element={<NotFoundPageComponent />} />
            </Routes>
        </Router>
    )
    
}