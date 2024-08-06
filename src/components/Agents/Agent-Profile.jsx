import React, { useState } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import Avatar from "../../assets/avatarStaff.jpg";
import { Ban, KeyRound } from "lucide-react";
const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AgentProfile = ({ agent }) => {
  const { verifyToken } = VerifyStaffToken();

  const [showBanModal, setShowBanModal] = useState(false);

  const toggleBanModal = () => {
    setShowBanModal((prevState) => !prevState);
  };
 
  const handleBanAgent = async () => {
    try {
      const response = await axiosInstense.post(
        `api/v1/agents/toggle-block/${agent._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Agent block status toggled successfully:", response.data);
        toggleBanModal();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 404) {
          console.error("Agent not found.");
        } else if (error.response.status === 400) {
          console.error(error.response.data.error);
        } else {
          console.error("An error occurred:", error.response.data.error);
        }
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  

  return (
    <>
      <div className="StaffCard bg-[#FFFBFA] rounded-xl border border-solid p-4 mb-4 block lg:flex lg:items-start gap-4 shadow-md">
        <div className="staffLeftSide">
          <div className="maidImage">
            <img
              className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
              src={Avatar}
            />
          </div>
        </div>
        <div className="staffRightSide w-full">
          <div className="staffName text-lg font-bold">{agent.name ? agent.name : "Invited"}</div>
          <div className="overflow-x-auto w-full">
            <div className="staffDetails overflow-y-auto max-w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                <div className="dashboardId w-full">
                  <div className="text-xs">Dashboard Id</div>
                  <div className="text-sm font-semibold">{agent.email}</div>
                </div>
                <div className="password sm:w-1/2 sm:justify-self-end">
                  <div className="text-xs">Status</div>
                  <div className="text-sm font-semibold">
                    {agent.status.toUpperCase()}
                  </div>
                </div>
                <div className="editAndDelSvg flex items-center sm:gap-4 sm:justify-self-end">
                  <Modal
                    noIcon={true}
                    modalTxt={`Are you sure you want to ${agent.status === "blocked" ? "Unban" : "Ban"} ${agent.name}`}
                    modalAction={handleBanAgent}
                    name={agent.name}
                    showModal={showBanModal}
                    toggleModal={toggleBanModal}
                  />
                  {agent.status === "active" && (
                    <div
                      onClick={toggleBanModal}
                      className="editStaffDetails cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl"
                    >
                      <div>
                        <Ban color="#CD2424" />
                      </div>
                    </div>
                  )}
                  {agent.status === "blocked" && (
                    <div
                      onClick={toggleBanModal}
                      className="editStaffDetails cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl"
                    >
                      <div>
                        <KeyRound color="#107243" />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentProfile;
