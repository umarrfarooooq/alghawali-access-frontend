import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import AllMaids from "../components/All-Maids/All-Maids";

const OurMaids = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <AllMaids />
            </div>
        </>
    )
}

export default OurMaids;