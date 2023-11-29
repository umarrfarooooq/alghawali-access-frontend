import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import HomePageCompo from "../components/HomePage/homePageCompo";

const Home = () =>{
    return(
        <>
            <div className="bg-[#F2F5FF]">
                <Sidebar />
                <HomePageCompo />
            </div>
        </>
    )
}

export default Home;