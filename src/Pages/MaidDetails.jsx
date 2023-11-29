import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import MaidDetailComponent from "../components/Maid-Details/Maid-Details";
const MaidDetails = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <MaidDetailComponent />
            </div>
        </>
    )
}

export default MaidDetails;