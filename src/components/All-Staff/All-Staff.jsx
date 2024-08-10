import React, { useEffect, useState } from "react";
import StaffProfile from "../Staff-Profiles/Staff-Profiles";
import AddStaffForm from "../Add-Staff/Add-Staff";
import InviteStaffForm from "../Add-Staff/Invite-Staff";
import Backdrop from "../UI/Backdrop";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import InviteAgentForm from "../Agents/Invite-Agent-Form";
import AgentProfile from "../Agents/Agent-Profile";
import AgentRequestsComponent from "../Agent-Requests/Agent-Requests-Component";
import roles from "../roles/roles";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AllStaff = () => {
  const { verifyToken, roles: userRoles } = VerifyStaffToken();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isInviteFormVisible, setIsInviteFormVisible] = useState(false);
  const [isInviteAgentFormVisible, setIsInviteAgentFormVisible] =
    useState(false);
  const [staffData, setStaffData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [activeTab, setActiveTab] = useState("Staff");
  const [nestedActiveTab, setNestedActiveTab] = useState("Active Agents");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleNestedTabClick = (tab) => {
    setNestedActiveTab(tab);
  };
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axiosInstense.get("api/v1/staff", {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        setStaffData(response.data);
      } catch (error) {
        console.error("Error fetching maid data:", error);
      }
    };

    fetchStaffData();
  }, [isFormVisible, staffData]);

  useEffect(() => {
    const fetchAgentsData = async () => {
      try {
        const response = await axiosInstense.get("api/v1/agents/all-agents", {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        setAgentsData(response.data.data);
      } catch (error) {
        console.error("Error fetching maid data:", error);
      }
    };

    fetchAgentsData();
  }, [isInviteAgentFormVisible, agentsData]);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };
  const toggleInviteFormVisibility = () => {
    setIsInviteFormVisible((prevState) => !prevState);
  };
  const toggleInviteAgentFormVisibility = () => {
    setIsInviteAgentFormVisible((prevState) => !prevState);
  };

  const filteredStaffData = staffData.filter(
    (staff) => staff.email !== "jitan@alghawalimanpower.com"
  );
  const staffCount = filteredStaffData.length;

  return (
    <>
      {isFormVisible && <Backdrop showBackdrop={true} />}
      {isInviteFormVisible && <Backdrop showBackdrop={true} />}
      {isInviteAgentFormVisible && <Backdrop showBackdrop={true} />}
      <div className="md:ml-[20rem] md:px-8 px-4 rounded-3xl">
        <div className="relative">
          {isFormVisible && (
            <aside className="absolute z-[20] right-0 -mt-8">
              <AddStaffForm onCloseForm={toggleFormVisibility} />
            </aside>
          )}
          {isInviteFormVisible && (
            <aside className="absolute z-[20] right-0 -mt-8">
              <InviteStaffForm onCloseForm={toggleInviteFormVisibility} />
            </aside>
          )}
          {isInviteAgentFormVisible && (
            <aside className="absolute z-[20] right-0 -mt-8">
              <InviteAgentForm onCloseForm={toggleInviteAgentFormVisibility} />
            </aside>
          )}
          <div className="maidsCount flex items-center justify-between my-4">
            <span className="text-xl font-bold hidden sm:inline-block">
              All Staff {staffCount}
            </span>
            <div>
              <div className="maidActions grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="markHired p-4 text-[#fff] bg-[#107243] rounded-lg text-base">
                  <button
                    className="flex items-center justify-center gap-1 outline-none border-none"
                    onClick={toggleFormVisibility}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 12H5"
                        stroke="#FFFBFA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 5V19"
                        stroke="#FFFBFA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Add New Staff
                  </button>
                </div>
                <div className="markHired p-4 text-[#fff] bg-[#107243] rounded-lg text-base">
                  <button
                    className="flex items-center justify-center gap-1 outline-none border-none"
                    onClick={toggleInviteFormVisibility}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 12H5"
                        stroke="#FFFBFA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 5V19"
                        stroke="#FFFBFA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Invite Member
                  </button>
                </div>
                {userRoles.includes(roles.ShowAgentRequest) && (
                  <div className="markHired p-4 text-[#fff] bg-[#107243] rounded-lg text-base">
                    <button
                      className="flex items-center justify-center gap-1 outline-none border-none"
                      onClick={toggleInviteAgentFormVisibility}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 12H5"
                          stroke="#FFFBFA"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 5V19"
                          stroke="#FFFBFA"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Invite Agent
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="staffProfiles mt-2 min-h-screen max-h-full">
            <div>
              {userRoles.includes(roles.ShowAgentRequest) && (
                <div className="bg-[#E3E3E3] rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                  <div
                    onClick={() => handleTabClick("Staff")}
                    className={`${
                      activeTab === "Staff" ? "bg-[#FFFBFA] , shadow-md" : ""
                    } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7.5 3.5C7.10218 3.5 6.72064 3.65804 6.43934 3.93934C6.15804 4.22064 6 4.60218 6 5C6 5.39782 6.15804 5.77936 6.43934 6.06066C6.72064 6.34196 7.10218 6.5 7.5 6.5C7.89782 6.5 8.27936 6.34196 8.56066 6.06066C8.84196 5.77936 9 5.39782 9 5C9 4.60218 8.84196 4.22064 8.56066 3.93934C8.27936 3.65804 7.89782 3.5 7.5 3.5ZM4.5 5C4.5 4.20435 4.81607 3.44129 5.37868 2.87868C5.94129 2.31607 6.70435 2 7.5 2C8.29565 2 9.05871 2.31607 9.62132 2.87868C10.1839 3.44129 10.5 4.20435 10.5 5C10.5 5.79565 10.1839 6.55871 9.62132 7.12132C9.05871 7.68393 8.29565 8 7.5 8C6.70435 8 5.94129 7.68393 5.37868 7.12132C4.81607 6.55871 4.5 5.79565 4.5 5ZM3.768 9C2.79 9 2 9.791 2 10.768L2 11.128C2 11.335 2 12.536 2.7 13.703C3.248 14.613 4.177 15.43 5.675 15.796C5.88017 15.2506 6.2517 14.7836 6.737 14.461C5.134 14.29 4.376 13.578 3.987 12.931C3.503 12.125 3.5 11.267 3.5 11.125V10.768C3.5 10.62 3.62 10.5 3.768 10.5H8.03C8.09606 9.9712 8.26779 9.46108 8.535 9H3.768ZM15.465 9C15.726 9.452 15.902 9.959 15.969 10.5H20.232C20.38 10.5 20.5 10.62 20.5 10.768V11.125C20.5 11.267 20.497 12.125 20.013 12.93C19.624 13.578 18.866 14.29 17.263 14.461C17.743 14.781 18.119 15.247 18.325 15.796C19.823 15.43 20.752 14.613 21.299 13.703C22 12.536 22 11.336 22 11.127V10.767C22 9.792 21.209 9 20.232 9L15.465 9ZM15 5C15 4.60218 15.158 4.22064 15.4393 3.93934C15.7206 3.65804 16.1022 3.5 16.5 3.5C16.8978 3.5 17.2794 3.65804 17.5607 3.93934C17.842 4.22064 18 4.60218 18 5C18 5.39782 17.842 5.77936 17.5607 6.06066C17.2794 6.34196 16.8978 6.5 16.5 6.5C16.1022 6.5 15.7206 6.34196 15.4393 6.06066C15.158 5.77936 15 5.39782 15 5ZM16.5 2C15.7044 2 14.9413 2.31607 14.3787 2.87868C13.8161 3.44129 13.5 4.20435 13.5 5C13.5 5.79565 13.8161 6.55871 14.3787 7.12132C14.9413 7.68393 15.7044 8 16.5 8C17.2956 8 18.0587 7.68393 18.6213 7.12132C19.1839 6.55871 19.5 5.79565 19.5 5C19.5 4.20435 19.1839 3.44129 18.6213 2.87868C18.0587 2.31607 17.2956 2 16.5 2ZM12 9.5C11.803 9.5 11.608 9.5388 11.426 9.61418C11.244 9.68956 11.0786 9.80005 10.9393 9.93934C10.8001 10.0786 10.6896 10.244 10.6142 10.426C10.5388 10.608 10.5 10.803 10.5 11C10.5 11.197 10.5388 11.392 10.6142 11.574C10.6896 11.756 10.8001 11.9214 10.9393 12.0607C11.0786 12.1999 11.244 12.3104 11.426 12.3858C11.608 12.4612 11.803 12.5 12 12.5C12.3978 12.5 12.7794 12.342 13.0607 12.0607C13.342 11.7794 13.5 11.3978 13.5 11C13.5 10.6022 13.342 10.2206 13.0607 9.93934C12.7794 9.65804 12.3978 9.5 12 9.5ZM9 11C9 10.2044 9.31607 9.44129 9.87868 8.87868C10.4413 8.31607 11.2044 8 12 8C12.7956 8 13.5587 8.31607 14.1213 8.87868C14.6839 9.44129 15 10.2044 15 11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11ZM6.5 16.768C6.5 15.79 7.291 15 8.268 15L15.732 15C16.709 15 17.5 15.791 17.5 16.768V17.128C17.5 17.335 17.5 18.536 16.8 19.703C16.057 20.937 14.613 22 12 22C9.387 22 7.942 20.937 7.2 19.703C6.5 18.536 6.5 17.336 6.5 17.127V16.768ZM8.268 16.5C8.23281 16.5 8.19796 16.5069 8.16544 16.5204C8.13293 16.5339 8.10338 16.5536 8.0785 16.5785C8.05361 16.6034 8.03387 16.6329 8.0204 16.6654C8.00693 16.698 8 16.7328 8 16.768V17.125C8 17.267 8.003 18.125 8.487 18.93C8.933 19.673 9.864 20.5 12 20.5C14.136 20.5 15.067 19.673 15.513 18.93C15.997 18.125 16 17.267 16 17.125V16.768C16 16.6969 15.9718 16.6288 15.9215 16.5785C15.8712 16.5282 15.8031 16.5 15.732 16.5H8.268Z"
                          fill="#434146"
                        />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">Staff</span>
                  </div>
                  <div
                    onClick={() => handleTabClick("Agents")}
                    className={`${
                      activeTab === "Agents" ? "bg-[#FFFBFA]  shadow-md" : ""
                    } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15L6 15C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19L2 21"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M22 20.9989V18.9989C21.9993 18.1126 21.7044 17.2517 21.1614 16.5512C20.6184 15.8508 19.8581 15.3505 19 15.1289"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">Agents</span>
                  </div>
                </div>
              )}
            </div>
            {activeTab === "Staff" && (
              <div>
                <div className="w-full border border-solid p-6 rounded-3xl 2xl:grid grid-cols-2 gap-2">
                  {filteredStaffData.map((staff) => (
                    <StaffProfile key={staff._id} staff={staff} />
                  ))}
                </div>
              </div>
            )}
            {activeTab === "Agents" && (
              <div>
                <div>
                  <div className="bg-[#E3E3E3] rounded-xl my-4 md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                    <div
                      onClick={() => handleNestedTabClick("Active Agents")}
                      className={`${
                        nestedActiveTab === "Active Agents"
                          ? "bg-[#FFFBFA] , shadow-md"
                          : ""
                      } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7.5 3.5C7.10218 3.5 6.72064 3.65804 6.43934 3.93934C6.15804 4.22064 6 4.60218 6 5C6 5.39782 6.15804 5.77936 6.43934 6.06066C6.72064 6.34196 7.10218 6.5 7.5 6.5C7.89782 6.5 8.27936 6.34196 8.56066 6.06066C8.84196 5.77936 9 5.39782 9 5C9 4.60218 8.84196 4.22064 8.56066 3.93934C8.27936 3.65804 7.89782 3.5 7.5 3.5ZM4.5 5C4.5 4.20435 4.81607 3.44129 5.37868 2.87868C5.94129 2.31607 6.70435 2 7.5 2C8.29565 2 9.05871 2.31607 9.62132 2.87868C10.1839 3.44129 10.5 4.20435 10.5 5C10.5 5.79565 10.1839 6.55871 9.62132 7.12132C9.05871 7.68393 8.29565 8 7.5 8C6.70435 8 5.94129 7.68393 5.37868 7.12132C4.81607 6.55871 4.5 5.79565 4.5 5ZM3.768 9C2.79 9 2 9.791 2 10.768L2 11.128C2 11.335 2 12.536 2.7 13.703C3.248 14.613 4.177 15.43 5.675 15.796C5.88017 15.2506 6.2517 14.7836 6.737 14.461C5.134 14.29 4.376 13.578 3.987 12.931C3.503 12.125 3.5 11.267 3.5 11.125V10.768C3.5 10.62 3.62 10.5 3.768 10.5H8.03C8.09606 9.9712 8.26779 9.46108 8.535 9H3.768ZM15.465 9C15.726 9.452 15.902 9.959 15.969 10.5H20.232C20.38 10.5 20.5 10.62 20.5 10.768V11.125C20.5 11.267 20.497 12.125 20.013 12.93C19.624 13.578 18.866 14.29 17.263 14.461C17.743 14.781 18.119 15.247 18.325 15.796C19.823 15.43 20.752 14.613 21.299 13.703C22 12.536 22 11.336 22 11.127V10.767C22 9.792 21.209 9 20.232 9L15.465 9ZM15 5C15 4.60218 15.158 4.22064 15.4393 3.93934C15.7206 3.65804 16.1022 3.5 16.5 3.5C16.8978 3.5 17.2794 3.65804 17.5607 3.93934C17.842 4.22064 18 4.60218 18 5C18 5.39782 17.842 5.77936 17.5607 6.06066C17.2794 6.34196 16.8978 6.5 16.5 6.5C16.1022 6.5 15.7206 6.34196 15.4393 6.06066C15.158 5.77936 15 5.39782 15 5ZM16.5 2C15.7044 2 14.9413 2.31607 14.3787 2.87868C13.8161 3.44129 13.5 4.20435 13.5 5C13.5 5.79565 13.8161 6.55871 14.3787 7.12132C14.9413 7.68393 15.7044 8 16.5 8C17.2956 8 18.0587 7.68393 18.6213 7.12132C19.1839 6.55871 19.5 5.79565 19.5 5C19.5 4.20435 19.1839 3.44129 18.6213 2.87868C18.0587 2.31607 17.2956 2 16.5 2ZM12 9.5C11.803 9.5 11.608 9.5388 11.426 9.61418C11.244 9.68956 11.0786 9.80005 10.9393 9.93934C10.8001 10.0786 10.6896 10.244 10.6142 10.426C10.5388 10.608 10.5 10.803 10.5 11C10.5 11.197 10.5388 11.392 10.6142 11.574C10.6896 11.756 10.8001 11.9214 10.9393 12.0607C11.0786 12.1999 11.244 12.3104 11.426 12.3858C11.608 12.4612 11.803 12.5 12 12.5C12.3978 12.5 12.7794 12.342 13.0607 12.0607C13.342 11.7794 13.5 11.3978 13.5 11C13.5 10.6022 13.342 10.2206 13.0607 9.93934C12.7794 9.65804 12.3978 9.5 12 9.5ZM9 11C9 10.2044 9.31607 9.44129 9.87868 8.87868C10.4413 8.31607 11.2044 8 12 8C12.7956 8 13.5587 8.31607 14.1213 8.87868C14.6839 9.44129 15 10.2044 15 11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11ZM6.5 16.768C6.5 15.79 7.291 15 8.268 15L15.732 15C16.709 15 17.5 15.791 17.5 16.768V17.128C17.5 17.335 17.5 18.536 16.8 19.703C16.057 20.937 14.613 22 12 22C9.387 22 7.942 20.937 7.2 19.703C6.5 18.536 6.5 17.336 6.5 17.127V16.768ZM8.268 16.5C8.23281 16.5 8.19796 16.5069 8.16544 16.5204C8.13293 16.5339 8.10338 16.5536 8.0785 16.5785C8.05361 16.6034 8.03387 16.6329 8.0204 16.6654C8.00693 16.698 8 16.7328 8 16.768V17.125C8 17.267 8.003 18.125 8.487 18.93C8.933 19.673 9.864 20.5 12 20.5C14.136 20.5 15.067 19.673 15.513 18.93C15.997 18.125 16 17.267 16 17.125V16.768C16 16.6969 15.9718 16.6288 15.9215 16.5785C15.8712 16.5282 15.8031 16.5 15.732 16.5H8.268Z"
                            fill="#434146"
                          />
                        </svg>
                      </span>
                      <span className="text-sm md:text-base">
                        Active Agents
                      </span>
                    </div>
                    <div
                      onClick={() => handleNestedTabClick("Agent Requests")}
                      className={`${
                        nestedActiveTab === "Agent Requests"
                          ? "bg-[#FFFBFA]  shadow-md"
                          : ""
                      } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15L6 15C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19L2 21"
                            stroke="#434146"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                            stroke="#434146"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M22 20.9989V18.9989C21.9993 18.1126 21.7044 17.2517 21.1614 16.5512C20.6184 15.8508 19.8581 15.3505 19 15.1289"
                            stroke="#434146"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
                            stroke="#434146"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm md:text-base">
                        Agent Requests
                      </span>
                    </div>
                  </div>
                </div>
                {nestedActiveTab === "Active Agents" && (
                  <div className="w-full border border-solid p-6 rounded-3xl 2xl:grid grid-cols-2 gap-2">
                    {agentsData.map((agent) => (
                      <AgentProfile key={agent._id} agent={agent} />
                    ))}
                  </div>
                )}
                {nestedActiveTab === "Agent Requests" && (
                  <div className="w-full border border-solid p-6 rounded-3xl 2xl:grid grid-cols-2 gap-2">
                    <AgentRequestsComponent />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStaff;
