import { Outlet } from "react-router-dom";

const DashboardComponent=()=>{
    return (
        <>
        Dashboard Component
        <br></br>
        <Outlet></Outlet>
        </>
    )
}

export default DashboardComponent;