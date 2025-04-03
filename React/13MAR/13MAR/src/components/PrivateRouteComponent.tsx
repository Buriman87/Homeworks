import { JSX } from "react";
import { Navigate } from "react-router-dom";



const isAuth = ()=>{
    return localStorage.getItem("token") !==null;
}


const PrivateRoute =({children}:{children:JSX.Element})=>{
    return isAuth()? children:<Navigate to="/"></Navigate>
}
export default PrivateRoute;