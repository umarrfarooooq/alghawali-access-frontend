import AllAgentRequests from "../components/Agent-Requests/All-Requests";
import Search from "../components/Search/Search";
import Sidebar from "../components/sidebar/sidebar";
import React, { useState } from "react";

const AgentRequests = () => {
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="bg-[#F2F5FF]">
        <Sidebar />
        <div className="md:ml-[20rem] md:px-8 px-4 mt-4 md:mt-0">
          <Search onSearch={setSearchTerm} />
        </div>
        <AllAgentRequests searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default AgentRequests;
