import React, { useState } from "react";
import Header from "../Header/Header";
import Avatar from "../../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import Modal from "../UI/Modal";
import roles from "../roles/roles";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import Backdrop from "../UI/Backdrop";
import logo from "./logo.svg";
import { BriefcaseMedical } from "lucide-react";
const Sidebar = () => {
  const { roles: userRoles, staffName } = VerifyStaffToken();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const accountsAllowed = false;

  const location = useLocation();
  const path = location.pathname;

  const navMap = {
    "/": "Home",
    "/maids": "Our Maids",
    "/agent-requests": "Agent Requests",
    "/custom-requirements": "Custom Requirements",
    "/staff": "Access",
    "/accounts": "Accounts",
    "/visa": "Visas",
    "/medical": "Medical",
    "/my-account": "My Account",
  };
  const [activeNav, setActiveNav] = useState(navMap[path] || "Home");

  const handleLogoutButton = () => {
    localStorage.removeItem("staffToken");
    window.location.href = "/";
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAdmin = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512].every((role) =>
    userRoles.includes(role)
  );

  const roleType = isAdmin ? "Admin" : "Staff Member";

  return (
    <>
      {isSidebarOpen && <Backdrop zIndex="4" showBackdrop={true} />}
      <Modal
        modalAction={handleLogoutButton}
        modalTxt={"Do you want to logout from AL-Ghwali ?"}
        confirmTxt={"Yes, Logout"}
        showModal={showModal}
        toggleModal={toggleModal}
      />
      <Header className="block md:hidden" onClick={toggleSidebar} />
      {/* Mobile  */}
      <aside
        id="default-sidebar"
        className={`fixed md:hidden top-0 left-0 z-[5] w-[90%] max-h-full min-h-full overflow-y-auto transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-[#F2F5FF]`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className="w-full">
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className={`inline-block cursor-pointer float-right items-center rounded-md bg-[#E3E3E3] p-2 text-sm md:hidden`}
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 18L6 6"
                  stroke="#CD2424"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 18L18 6"
                  stroke="#CD2424"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-y-6 mt-6 border-solid border-[#EBEBEB] border-[0.5rem] rounded-xl p-4">
            <div className="flex flex-col items-center gap-[16px] relative p-4">
              <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                <img
                  className="w-[7.5rem] h-[7.5rem] rounded-full object-cover object-top"
                  alt="Frame"
                  src={Avatar}
                />
              </div>
              <div className="flex flex-col h-[49px] items-center justify-center gap-[4px] relative self-stretch w-full">
                <div className="relative self-stretch mt-[-1.00px] text-lg font-bold text-center">
                  {staffName ? staffName : "Staff"}
                </div>
                <div className="relative self-stretch text-center text-sm">
                  {roleType}
                </div>
              </div>
            </div>
            <div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3 9L12 2L21 9L21 20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22L5 22C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20L3 9Z"
                        stroke="#434146"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 22L9 12H15V22"
                        stroke="#434146"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="ms-3 text-base">Home</span>
                  </Link>
                </li>
                {userRoles.includes(roles.canAccessOnAccounts) ||
                userRoles.includes(roles.fullAccessOnAccounts) ? (
                  <li>
                    <Link
                      to="/my-account"
                      className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M4.78906 7.63281L8.57854 7.63281"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z"
                          stroke="#434146"
                          stroke-width="2"
                        />
                        <path
                          d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648"
                          stroke="#434146"
                          stroke-width="2"
                        />
                        <path
                          d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M16.1484 11.4219H16.1584"
                          stroke="#434146"
                          stroke-width="1.89474"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span className="ms-3 text-base">My Account</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {userRoles.includes(roles.CanAddMaid) ||
                userRoles.includes(roles.ShowOurMaid) ? (
                  <li>
                    <Link
                      to="/maids"
                      className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15L9 15C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 4L17 3"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8.12898 19.707H15.2929"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9 4L7 3"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                      <span className="ms-3 text-base">Our Maids</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {userRoles.includes(roles.ShowAgentRequest) ||
                userRoles.includes(roles.ShowAgentRequest) ? (
                  <li>
                    <Link
                      to="/agent-requests"
                      className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15L6 15C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19L2 21"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M22 20.9989V18.9989C21.9993 18.1126 21.7044 17.2517 21.1614 16.5512C20.6184 15.8508 19.8581 15.3505 19 15.1289"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span className="ms-3 text-base">Agent Requests</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <Link
                    to="/custom-requirements"
                    className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                  >
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
                    <span className="ms-3 text-base">Custom Requirements</span>
                  </Link>
                </li>
                {userRoles.includes(roles.ShowAccessOnAddStaff) && (
                  <li>
                    <Link
                      to="/staff"
                      className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M10.6657 11.9245C11.8492 11.9245 12.9843 11.4544 13.8212 10.6175C14.6581 9.7807 15.1282 8.64571 15.1282 7.46225C15.1282 6.27879 14.6581 5.1438 13.8212 4.30696C12.9843 3.47013 11.8492 3 10.6657 3C9.48213 3 8.34707 3.47013 7.51018 4.30696C6.67329 5.1438 6.20313 6.27879 6.20313 7.46225C6.20313 8.64571 6.67329 9.7807 7.51018 10.6175C8.34707 11.4544 9.48213 11.9245 10.6657 11.9245Z"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3 20.8448C3 17.391 6.43617 14.5977 10.6667 14.5977C11.5949 14.5977 12.4874 14.7315 13.3174 14.9814"
                          stroke="#434146"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15.0226 19.3197L15.8779 20.175M19.8198 18.3678C19.4567 18.73 19.0015 18.9862 18.5035 19.1087C18.0054 19.2313 17.4833 19.2155 16.9935 19.0632L15.242 20.8109C15.1155 20.941 14.8664 21.0191 14.6879 20.9931L13.8772 20.8815C13.6094 20.8443 13.3603 20.5915 13.3194 20.3237L13.2078 19.5131C13.1818 19.3346 13.2673 19.0855 13.39 18.959L15.1379 17.2113C14.8404 16.2445 15.0709 15.1475 15.837 14.3852C16.934 13.2883 18.7153 13.2883 19.8161 14.3852C20.9169 15.4822 20.9169 17.2708 19.8198 18.3678Z"
                          stroke="#434146"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18 17C18.2652 17 18.5196 16.8946 18.7071 16.7071C18.8946 16.5196 19 16.2652 19 16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16C17 16.2652 17.1054 16.5196 17.2929 16.7071C17.4804 16.8946 17.7348 17 18 17Z"
                          stroke="#434146"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span className="ms-3 text-base">Access</span>
                    </Link>
                  </li>
                )}
                {userRoles.includes(roles.canAccessOnAccounts) &&
                  accountsAllowed && (
                    <li>
                      <Link
                        to="/accounts"
                        className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M4.78906 7.63281L8.57854 7.63281"
                            stroke="#434146"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z"
                            stroke="#434146"
                            stroke-width="2"
                          />
                          <path
                            d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648"
                            stroke="#434146"
                            stroke-width="2"
                          />
                          <path
                            d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426"
                            stroke="#434146"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.1484 11.4219H16.1584"
                            stroke="#434146"
                            stroke-width="1.89474"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="ms-3 text-base">Accounts</span>
                      </Link>
                    </li>
                  )}
                {userRoles.includes(roles.canAccessOnVisa) && (
                  <li>
                    <Link
                      to="/visa"
                      className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18.75 10.5C18.75 10.6989 18.671 10.8897 18.5303 11.0303C18.3897 11.171 18.1989 11.25 18 11.25H14.25C14.0511 11.25 13.8603 11.171 13.7197 11.0303C13.579 10.8897 13.5 10.6989 13.5 10.5C13.5 10.3011 13.579 10.1103 13.7197 9.96967C13.8603 9.82902 14.0511 9.75 14.25 9.75H18C18.1989 9.75 18.3897 9.82902 18.5303 9.96967C18.671 10.1103 18.75 10.3011 18.75 10.5ZM18 12.75H14.25C14.0511 12.75 13.8603 12.829 13.7197 12.9697C13.579 13.1103 13.5 13.3011 13.5 13.5C13.5 13.6989 13.579 13.8897 13.7197 14.0303C13.8603 14.171 14.0511 14.25 14.25 14.25H18C18.1989 14.25 18.3897 14.171 18.5303 14.0303C18.671 13.8897 18.75 13.6989 18.75 13.5C18.75 13.3011 18.671 13.1103 18.5303 12.9697C18.3897 12.829 18.1989 12.75 18 12.75ZM21.75 5.25L21.75 18.75C21.75 19.1478 21.592 19.5294 21.3107 19.8107C21.0294 20.092 20.6478 20.25 20.25 20.25L3.75 20.25C3.35218 20.25 2.97064 20.092 2.68934 19.8107C2.40804 19.5294 2.25 19.1478 2.25 18.75L2.25 5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75L20.25 3.75C20.6478 3.75 21.0294 3.90804 21.3107 4.18934C21.592 4.47064 21.75 4.85218 21.75 5.25ZM20.25 18.75L20.25 5.25L3.75 5.25L3.75 18.75H20.25ZM12.7256 15.5625C12.7754 15.7552 12.7465 15.9598 12.6454 16.1312C12.5443 16.3026 12.3793 16.4268 12.1866 16.4766C11.9939 16.5263 11.7893 16.4974 11.6179 16.3963C11.4465 16.2952 11.3222 16.1302 11.2725 15.9375C11.0259 14.9756 10.0481 14.25 8.99906 14.25C7.95 14.25 6.97312 14.9756 6.72563 15.9375C6.6759 16.1302 6.55166 16.2952 6.38024 16.3963C6.20882 16.4974 6.00426 16.5263 5.81156 16.4766C5.61887 16.4268 5.45382 16.3026 5.35272 16.1312C5.25163 15.9598 5.22277 15.7552 5.2725 15.5625C5.51588 14.6566 6.09118 13.8755 6.88406 13.3744C6.46272 12.9555 6.17522 12.421 6.05802 11.8386C5.94082 11.2562 5.99918 10.652 6.22572 10.1028C6.45226 9.55361 6.83676 9.08402 7.3305 8.75358C7.82423 8.42315 8.40496 8.24675 8.99906 8.24675C9.59317 8.24675 10.1739 8.42315 10.6676 8.75358C11.1614 9.08402 11.5459 9.55361 11.7724 10.1028C11.9989 10.652 12.0573 11.2562 11.9401 11.8386C11.8229 12.421 11.5354 12.9555 11.1141 13.3744C11.9078 13.8748 12.4836 14.6562 12.7266 15.5625H12.7256ZM9 12.75C9.29667 12.75 9.58668 12.662 9.83335 12.4972C10.08 12.3324 10.2723 12.0981 10.3858 11.824C10.4994 11.5499 10.5291 11.2483 10.4712 10.9574C10.4133 10.6664 10.2704 10.3991 10.0607 10.1893C9.85088 9.97956 9.58361 9.8367 9.29264 9.77882C9.00166 9.72094 8.70006 9.75065 8.42597 9.86418C8.15189 9.97771 7.91762 10.17 7.7528 10.4166C7.58797 10.6633 7.5 10.9533 7.5 11.25C7.5 11.6478 7.65804 12.0294 7.93934 12.3107C8.22064 12.592 8.60218 12.75 9 12.75Z"
                          fill="#434146"
                        />
                      </svg>
                      <span className="ms-3 text-base">Visas</span>
                    </Link>
                  </li>
                )}
                {userRoles.includes(roles.canAccessOnVisa) && (
                  <li>
                    <Link
                      to="/medical"
                      className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                    >
                      <BriefcaseMedical />
                      <span className="ms-3 text-base">Medical</span>
                    </Link>
                  </li>
                )}

                <li onClick={toggleModal}>
                  <a
                    href="#"
                    className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 3L19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                        stroke="#CD2424"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 17L15 12L10 7"
                        stroke="#CD2424"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 12L3 12"
                        stroke="#CD2424"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="ms-3 text-[#CD2424] text-base">
                      Log Out
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      {/* Desktop  */}

      <div className="hidden md:block">
        <div className="flex">
          <aside
            id="default-sidebar"
            style={{ borderRight: "1px solid #C3D0D4" }}
            className="fixed top-0 hidden md:block left-0 z-[5] w-[20rem] max-h-full overflow-y-auto min-h-full transition-transform md:translate-x-0 bg-[#F2F5FF]"
            aria-label="Sidebar"
          >
            <div>
              <div>
                <div className="flex items-center gap-4 bg-[#253061] p-6">
                  <div>
                    <Link to="/">
                      <img className="w-[2.8rem] h-[3rem]" src={logo} />
                    </Link>
                  </div>

                  <div className="text-white">Al Ghawali</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-6 mt-[5rem] rounded-xl p-4">
                <div className="flex flex-col items-center gap-[16px] relative p-4">
                  <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                    <img
                      className="w-[7.5rem] h-[7.5rem] rounded-full object-cover object-top"
                      alt="Frame"
                      src={Avatar}
                    />
                  </div>
                  <div className="flex flex-col h-[49px] items-center justify-center gap-[4px] relative self-stretch w-full">
                    <div className="relative self-stretch mt-[-1.00px] text-lg font-bold text-center">
                      {staffName ? staffName : "Staff"}
                    </div>
                    <div className="relative self-stretch text-center text-sm">
                      {roleType}
                    </div>
                  </div>
                </div>
                <div>
                  <ul className="space-y-2 font-medium">
                    <li onClick={() => setActiveNav("Home")}>
                      <Link
                        to="/"
                        className={`flex items-center p-4 rounded-lg ${
                          activeNav === "Home"
                            ? "bg-[#107243] text-white"
                            : "text-gray-900"
                        } group`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M3 9L12 2L21 9L21 20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22L5 22C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20L3 9Z"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 22L9 12H15V22"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ms-3 text-base">Home</span>
                      </Link>
                    </li>
                    {userRoles.includes(roles.ShowOurMaid) ||
                    userRoles.includes(roles.CanAddMaid) ? (
                      <li onClick={() => setActiveNav("Our Maids")}>
                        <Link
                          to="/maids"
                          className={`flex items-center p-4 rounded-lg ${
                            activeNav === "Our Maids"
                              ? "bg-[#107243] text-white transition-all"
                              : "text-gray-900"
                          } group`}
                        >
                          <svg
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15L9 15C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 4L17 3"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8.12898 19.707H15.2929"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9 4L7 3"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="ms-3 text-base">Our Maids</span>
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    {userRoles.includes(roles.ShowAgentRequest) ||
                    userRoles.includes(roles.ShowAgentRequest) ? (
                      <li onClick={() => setActiveNav("Agent Requests")}>
                        <Link
                          to="/agent-requests"
                          className={`flex items-center p-4 rounded-lg ${
                            activeNav === "Agent Requests"
                              ? "bg-[#107243] text-white transition-all"
                              : "text-gray-900"
                          } group`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15L6 15C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19L2 21"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M22 20.9989V18.9989C21.9993 18.1126 21.7044 17.2517 21.1614 16.5512C20.6184 15.8508 19.8581 15.3505 19 15.1289"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span className="ms-3 text-base">Agent Requests</span>
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}

                    <li onClick={() => setActiveNav("Custom Requirements")}>
                      <Link
                        to="/custom-requirements"
                        className={`flex items-center p-4 rounded-lg ${
                          activeNav === "Custom Requirements"
                            ? "bg-[#107243] text-white transition-all"
                            : "text-gray-900"
                        } group`}
                      >
                        <svg
                          stroke="currentColor"
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
                        <span className="ms-3 text-base">
                          Custom Requirements
                        </span>
                      </Link>
                    </li>
                    {userRoles.includes(roles.ShowAccessOnAddStaff) && (
                      <li onClick={() => setActiveNav("Access")}>
                        <Link
                          to="/staff"
                          className={`flex items-center p-4 rounded-lg ${
                            activeNav === "Access"
                              ? "bg-[#107243] text-white transition-all"
                              : "text-gray-900"
                          } group`}
                        >
                          <svg
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M10.6657 11.9245C11.8492 11.9245 12.9843 11.4544 13.8212 10.6175C14.6581 9.7807 15.1282 8.64571 15.1282 7.46225C15.1282 6.27879 14.6581 5.1438 13.8212 4.30696C12.9843 3.47013 11.8492 3 10.6657 3C9.48213 3 8.34707 3.47013 7.51018 4.30696C6.67329 5.1438 6.20313 6.27879 6.20313 7.46225C6.20313 8.64571 6.67329 9.7807 7.51018 10.6175C8.34707 11.4544 9.48213 11.9245 10.6657 11.9245Z"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M3 20.8448C3 17.391 6.43617 14.5977 10.6667 14.5977C11.5949 14.5977 12.4874 14.7315 13.3174 14.9814"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.0226 19.3197L15.8779 20.175M19.8198 18.3678C19.4567 18.73 19.0015 18.9862 18.5035 19.1087C18.0054 19.2313 17.4833 19.2155 16.9935 19.0632L15.242 20.8109C15.1155 20.941 14.8664 21.0191 14.6879 20.9931L13.8772 20.8815C13.6094 20.8443 13.3603 20.5915 13.3194 20.3237L13.2078 19.5131C13.1818 19.3346 13.2673 19.0855 13.39 18.959L15.1379 17.2113C14.8404 16.2445 15.0709 15.1475 15.837 14.3852C16.934 13.2883 18.7153 13.2883 19.8161 14.3852C20.9169 15.4822 20.9169 17.2708 19.8198 18.3678Z"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M18 17C18.2652 17 18.5196 16.8946 18.7071 16.7071C18.8946 16.5196 19 16.2652 19 16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16C17 16.2652 17.1054 16.5196 17.2929 16.7071C17.4804 16.8946 17.7348 17 18 17Z"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span className="ms-3 text-base">Access</span>
                        </Link>
                      </li>
                    )}
                    {userRoles.includes(roles.canAccessOnAccounts) &&
                      accountsAllowed && (
                        <li onClick={() => setActiveNav("Accounts")}>
                          <Link
                            to="/accounts"
                            className={`flex items-center p-4 rounded-lg ${
                              activeNav === "Accounts"
                                ? "bg-[#107243] text-white transition-all"
                                : "text-gray-900"
                            } group`}
                          >
                            <svg
                              stroke="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                            >
                              <path
                                d="M4.78906 7.63281L8.57854 7.63281"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z"
                                stroke-width="2"
                              />
                              <path
                                d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648"
                                stroke-width="2"
                              />
                              <path
                                d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M16.1484 11.4219H16.1584"
                                stroke-width="1.89474"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span className="ms-3 text-base">Accounts</span>
                          </Link>
                        </li>
                      )}

                    {userRoles.includes(roles.canAccessOnVisa) && (
                      <li onClick={() => setActiveNav("Visas")}>
                        <Link
                          to="/visa"
                          className={`flex items-center p-4 rounded-lg ${
                            activeNav === "Visas"
                              ? "bg-[#107243] text-white transition-all"
                              : "text-gray-900"
                          } group`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M18.75 10.5C18.75 10.6989 18.671 10.8897 18.5303 11.0303C18.3897 11.171 18.1989 11.25 18 11.25H14.25C14.0511 11.25 13.8603 11.171 13.7197 11.0303C13.579 10.8897 13.5 10.6989 13.5 10.5C13.5 10.3011 13.579 10.1103 13.7197 9.96967C13.8603 9.82902 14.0511 9.75 14.25 9.75H18C18.1989 9.75 18.3897 9.82902 18.5303 9.96967C18.671 10.1103 18.75 10.3011 18.75 10.5ZM18 12.75H14.25C14.0511 12.75 13.8603 12.829 13.7197 12.9697C13.579 13.1103 13.5 13.3011 13.5 13.5C13.5 13.6989 13.579 13.8897 13.7197 14.0303C13.8603 14.171 14.0511 14.25 14.25 14.25H18C18.1989 14.25 18.3897 14.171 18.5303 14.0303C18.671 13.8897 18.75 13.6989 18.75 13.5C18.75 13.3011 18.671 13.1103 18.5303 12.9697C18.3897 12.829 18.1989 12.75 18 12.75ZM21.75 5.25L21.75 18.75C21.75 19.1478 21.592 19.5294 21.3107 19.8107C21.0294 20.092 20.6478 20.25 20.25 20.25L3.75 20.25C3.35218 20.25 2.97064 20.092 2.68934 19.8107C2.40804 19.5294 2.25 19.1478 2.25 18.75L2.25 5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75L20.25 3.75C20.6478 3.75 21.0294 3.90804 21.3107 4.18934C21.592 4.47064 21.75 4.85218 21.75 5.25ZM20.25 18.75L20.25 5.25L3.75 5.25L3.75 18.75H20.25ZM12.7256 15.5625C12.7754 15.7552 12.7465 15.9598 12.6454 16.1312C12.5443 16.3026 12.3793 16.4268 12.1866 16.4766C11.9939 16.5263 11.7893 16.4974 11.6179 16.3963C11.4465 16.2952 11.3222 16.1302 11.2725 15.9375C11.0259 14.9756 10.0481 14.25 8.99906 14.25C7.95 14.25 6.97312 14.9756 6.72563 15.9375C6.6759 16.1302 6.55166 16.2952 6.38024 16.3963C6.20882 16.4974 6.00426 16.5263 5.81156 16.4766C5.61887 16.4268 5.45382 16.3026 5.35272 16.1312C5.25163 15.9598 5.22277 15.7552 5.2725 15.5625C5.51588 14.6566 6.09118 13.8755 6.88406 13.3744C6.46272 12.9555 6.17522 12.421 6.05802 11.8386C5.94082 11.2562 5.99918 10.652 6.22572 10.1028C6.45226 9.55361 6.83676 9.08402 7.3305 8.75358C7.82423 8.42315 8.40496 8.24675 8.99906 8.24675C9.59317 8.24675 10.1739 8.42315 10.6676 8.75358C11.1614 9.08402 11.5459 9.55361 11.7724 10.1028C11.9989 10.652 12.0573 11.2562 11.9401 11.8386C11.8229 12.421 11.5354 12.9555 11.1141 13.3744C11.9078 13.8748 12.4836 14.6562 12.7266 15.5625H12.7256ZM9 12.75C9.29667 12.75 9.58668 12.662 9.83335 12.4972C10.08 12.3324 10.2723 12.0981 10.3858 11.824C10.4994 11.5499 10.5291 11.2483 10.4712 10.9574C10.4133 10.6664 10.2704 10.3991 10.0607 10.1893C9.85088 9.97956 9.58361 9.8367 9.29264 9.77882C9.00166 9.72094 8.70006 9.75065 8.42597 9.86418C8.15189 9.97771 7.91762 10.17 7.7528 10.4166C7.58797 10.6633 7.5 10.9533 7.5 11.25C7.5 11.6478 7.65804 12.0294 7.93934 12.3107C8.22064 12.592 8.60218 12.75 9 12.75Z"
                              fill="#434146"
                            />
                          </svg>

                          <span className="ms-3 text-base">Visas</span>
                        </Link>
                      </li>
                    )}
                    {userRoles.includes(roles.canAccessOnVisa) && (
                      <li onClick={() => setActiveNav("Medical")}>
                        <Link
                          to="/medical"
                          className={`flex items-center p-4 rounded-lg ${
                            activeNav === "Medical"
                              ? "bg-[#107243] text-white transition-all"
                              : "text-gray-900"
                          } group`}
                        >
                          <BriefcaseMedical />

                          <span className="ms-3 text-base">Medical</span>
                        </Link>
                      </li>
                    )}

                    <li onClick={toggleModal}>
                      <a
                        href="#"
                        className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 3L19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                            stroke="#CD2424"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 17L15 12L10 7"
                            stroke="#CD2424"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15 12L3 12"
                            stroke="#CD2424"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="ms-3 text-[#CD2424] text-base">
                          Log Out
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          <Header className="hidden md:block w-full ml-[20rem] px-8 py-4" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
