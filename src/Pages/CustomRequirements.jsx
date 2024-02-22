import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import AllRequirementsTable from "../components/Requirements/All-Requirements";
const CustomRequirements = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF] min-h-screen">
                <Sidebar />
                <AllRequirementsTable />
            </div>
        </>
    )
}

export default CustomRequirements;