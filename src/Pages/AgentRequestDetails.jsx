import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import RequestDetails from "../components/Agent-Requests/Request-Details";
const AgentRequestDetailsPage = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <RequestDetails />
            </div>
        </>
    )
}

export default AgentRequestDetailsPage;