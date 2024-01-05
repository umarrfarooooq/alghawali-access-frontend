import React, { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Search from "../components/Search/Search";
import AllVisas from "../components/All-Visas/All-Visas";
const Staff = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <div className="md:ml-[20rem] md:px-8 px-4 mt-4 md:mt-0">
                    <Search onSearch={setSearchTerm}/>
                </div>
                <AllVisas searchTerm={searchTerm}/>
            </div>
        </>
    )
}

export default Staff;