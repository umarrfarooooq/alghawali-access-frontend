import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import AllVisas from "../components/All-Visas/All-Visas";
const Staff = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <AllVisas />
            </div>
        </>
    )
}

export default Staff;