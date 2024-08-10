import axios from "axios";
import AgentProfile from "./Agent-Profile";
import React, { useEffect, useState } from "react";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AgentRequestsComponent = () => {
  const [agentRequestData, setAgentRequestsData] = useState([]);
  const { verifyToken } = VerifyStaffToken();

  const updateAgentRequestData = (updatedProfile) => {
    setAgentRequestsData((prevData) =>
      prevData.map((profile) =>
        profile._id === updatedProfile._id ? updatedProfile : profile
      )
    );
  };

  useEffect(() => {
    const fetchAgentRequestsData = async () => {
      try {
        const response = await axiosInstance.get(
          "api/v1/agentRegister/registrations",
          {
            headers: {
              Authorization: `Bearer ${verifyToken}`,
            },
          }
        );
        setAgentRequestsData(response.data.data);
      } catch (error) {
        console.error("Error fetching agent request data:", error);
      }
    };

    fetchAgentRequestsData();
  }, [verifyToken]);

  return (
    <div>
      {agentRequestData.length > 0 ? (
        agentRequestData
          .sort((a, b) => {
            if (a.status === "pending" && b.status !== "pending") return -1;
            if (a.status !== "pending" && b.status === "pending") return 1;
            return 0;
          })
          .map((requestData) => (
            <AgentProfile
              key={requestData._id}
              profile={requestData}
              updateAgentRequestData={updateAgentRequestData}
            />
          ))
      ) : (
        <p>No agent requests available.</p>
      )}
    </div>
  );
};

export default AgentRequestsComponent;
