import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import AllStaff from "../components/All-Staff/All-Staff";

const Staff = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <AllStaff />
            </div>
        </>
    )
}

export default Staff;