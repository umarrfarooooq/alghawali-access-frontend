import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import AccountsCompo from "../components/Account-Cards/Account-Cards";
const Home = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <AccountsCompo />
            </div>
        </>
    )
}

export default Home;