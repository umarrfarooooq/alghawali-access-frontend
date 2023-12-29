import React, { useState } from 'react';
import Header from '../Header/Header';
import Avatar from "../../assets/avatar.png"
import { Link } from 'react-router-dom';
import Modal from '../UI/Modal';
import roles from '../roles/roles';
import { VerifyStaffToken } from '../Auth/VerifyToken';
import Backdrop from '../UI/Backdrop';

const Sidebar = () => {
  const { roles: userRoles, staffName} = VerifyStaffToken();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);

    const handleLogoutButton = () =>{
        localStorage.removeItem("staffToken")
        window.location.href = "/"
    }


    const toggleModal = () => {
      setShowModal(prevState => !prevState);
    };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAdmin = [1, 2, 4, 8, 16, 32].every(role => userRoles.includes(role));

    const roleType = isAdmin ? "Admin" : "Staff Member";

  return (
    <>
            {isSidebarOpen && <Backdrop zIndex="4" showBackdrop={true} />}
            <Modal modalAction={handleLogoutButton} modalTxt={"Do you want to logout from AL-Ghwali ?"} confirmTxt={"Yes, Logout"} showModal={showModal} toggleModal={toggleModal}/>
            <Header className="block md:hidden" onClick={toggleSidebar}/>
            {/* Mobile  */}
            <aside
            id="default-sidebar"
            className={`fixed md:hidden top-0 left-0 z-[5] w-[90%] max-h-full min-h-full overflow-y-auto transition-transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 bg-[#F2F5FF]`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
            <div className='w-full'>
                <button
                    data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    type="button"
                    className={`inline-block cursor-pointer float-right items-center rounded-md bg-[#E3E3E3] p-2 text-sm md:hidden`}
                    onClick={toggleSidebar}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 18L6 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 18L18 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
                
                <div className='flex flex-col gap-y-6 mt-6 border-solid border-[#EBEBEB] border-[0.5rem] rounded-xl p-4'>
                    <div className="flex flex-col items-center gap-[16px] relative p-4">
                        <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                            <img className="w-[7.5rem] h-[7.5rem] rounded-full object-cover object-top" alt="Frame" src={Avatar} />
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
                                <Link to="/" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 9L12 2L21 9L21 20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22L5 22C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20L3 9Z" stroke="#434146" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 22L9 12H15V22" stroke="#434146" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ms-3 text-base">Home</span>
                                </Link>
                        </li>
                            {userRoles.includes(roles.CanAddMaid) || userRoles.includes(roles.ShowOurMaid) ?
                                <li>
                                    <Link to="/maids" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15L9 15C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16 4L17 3" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M8.12898 19.707H15.2929" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M9 4L7 3" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    <span className="ms-3 text-base">Our Maids</span>
                                    </Link>
                            </li> : null
                            }
                            {userRoles.includes(roles.ShowAccessOnAddStaff) && <li>
                                <Link to="/staff" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M10.6657 11.9245C11.8492 11.9245 12.9843 11.4544 13.8212 10.6175C14.6581 9.7807 15.1282 8.64571 15.1282 7.46225C15.1282 6.27879 14.6581 5.1438 13.8212 4.30696C12.9843 3.47013 11.8492 3 10.6657 3C9.48213 3 8.34707 3.47013 7.51018 4.30696C6.67329 5.1438 6.20313 6.27879 6.20313 7.46225C6.20313 8.64571 6.67329 9.7807 7.51018 10.6175C8.34707 11.4544 9.48213 11.9245 10.6657 11.9245Z" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M3 20.8448C3 17.391 6.43617 14.5977 10.6667 14.5977C11.5949 14.5977 12.4874 14.7315 13.3174 14.9814" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.0226 19.3197L15.8779 20.175M19.8198 18.3678C19.4567 18.73 19.0015 18.9862 18.5035 19.1087C18.0054 19.2313 17.4833 19.2155 16.9935 19.0632L15.242 20.8109C15.1155 20.941 14.8664 21.0191 14.6879 20.9931L13.8772 20.8815C13.6094 20.8443 13.3603 20.5915 13.3194 20.3237L13.2078 19.5131C13.1818 19.3346 13.2673 19.0855 13.39 18.959L15.1379 17.2113C14.8404 16.2445 15.0709 15.1475 15.837 14.3852C16.934 13.2883 18.7153 13.2883 19.8161 14.3852C20.9169 15.4822 20.9169 17.2708 19.8198 18.3678Z" stroke="#434146" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18 17C18.2652 17 18.5196 16.8946 18.7071 16.7071C18.8946 16.5196 19 16.2652 19 16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16C17 16.2652 17.1054 16.5196 17.2929 16.7071C17.4804 16.8946 17.7348 17 18 17Z" stroke="#434146" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                    <span className="ms-3 text-base">Access Staff</span>
                                </Link>
                            </li>
                        }
                        <li>
                                <Link to="/accounts" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M4.78906 7.63281L8.57854 7.63281" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z" stroke="#434146" stroke-width="2"/>
                                    <path d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648" stroke="#434146" stroke-width="2"/>
                                    <path d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M16.1484 11.4219H16.1584" stroke="#434146" stroke-width="1.89474" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ms-3 text-base">Accounts</span>
                                </Link>
                        </li>
                        <li>
                                        <Link to="/visa" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M4.78906 7.63281L8.57854 7.63281" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z" stroke="#434146" stroke-width="2"/>
                                            <path d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648" stroke="#434146" stroke-width="2"/>
                                            <path d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M16.1484 11.4219H16.1584" stroke="#434146" stroke-width="1.89474" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>

                                            <span className="ms-3 text-base">Visas</span>
                                        </Link>
                        </li>
                        
                        <li onClick={toggleModal}>
                            <a href="#" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 3L19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 17L15 12L10 7" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15 12L3 12" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                                <span className="ms-3 text-[#CD2424] text-base">Log Out</span>
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
                    className="fixed top-0 hidden md:block left-0 z-[5] w-[20rem] max-h-full overflow-y-auto min-h-full transition-transform md:translate-x-0 bg-[#F2F5FF]"
                    aria-label="Sidebar"
                    >
                    <div>
                        <div>
                            <div className='flex items-center gap-4 bg-[#253061] p-6'>
                                <div>
                                <Link to="/">
                                    <img className='w-[2.8rem] h-[3rem]' src='https://www.alghawalimanpower.com/static/media/Group%202.bb033483138d53c80d39856edff45090.svg'/>
                                </Link>
                                </div>

                                <div className='text-white'>Al Ghawali</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-6 mt-[5rem] rounded-xl p-4'>
                                <div className="flex flex-col items-center gap-[16px] relative p-4">
                                    <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                                        <img className="w-[7.5rem] h-[7.5rem] rounded-full object-cover object-top" alt="Frame" src={Avatar} />
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
                                            <Link to="/" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 9L12 2L21 9L21 20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22L5 22C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20L3 9Z" stroke="#434146" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M9 22L9 12H15V22" stroke="#434146" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <span className="ms-3 text-base">Home</span>
                                            </Link>
                                        </li>
                                        {userRoles.includes(roles.CanAddMaid) || userRoles.includes(roles.ShowOurMaid) ? <li>
                                            <Link to="/maids" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                            <svg className='active:stroke-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15L9 15C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="#434146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#434146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M16 4L17 3" stroke="#434146" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M8.12898 19.707H15.2929" stroke="#434146" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M9 4L7 3" stroke="#434146" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            <span className="ms-3 text-base">Our Maids</span>
                                            </Link>
                                        </li> : null
                                        }
                                        {userRoles.includes(roles.ShowAccessOnAddStaff) && <li>
                                        <Link to="/staff" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M10.6657 11.9245C11.8492 11.9245 12.9843 11.4544 13.8212 10.6175C14.6581 9.7807 15.1282 8.64571 15.1282 7.46225C15.1282 6.27879 14.6581 5.1438 13.8212 4.30696C12.9843 3.47013 11.8492 3 10.6657 3C9.48213 3 8.34707 3.47013 7.51018 4.30696C6.67329 5.1438 6.20313 6.27879 6.20313 7.46225C6.20313 8.64571 6.67329 9.7807 7.51018 10.6175C8.34707 11.4544 9.48213 11.9245 10.6657 11.9245Z" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M3 20.8448C3 17.391 6.43617 14.5977 10.6667 14.5977C11.5949 14.5977 12.4874 14.7315 13.3174 14.9814" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M15.0226 19.3197L15.8779 20.175M19.8198 18.3678C19.4567 18.73 19.0015 18.9862 18.5035 19.1087C18.0054 19.2313 17.4833 19.2155 16.9935 19.0632L15.242 20.8109C15.1155 20.941 14.8664 21.0191 14.6879 20.9931L13.8772 20.8815C13.6094 20.8443 13.3603 20.5915 13.3194 20.3237L13.2078 19.5131C13.1818 19.3346 13.2673 19.0855 13.39 18.959L15.1379 17.2113C14.8404 16.2445 15.0709 15.1475 15.837 14.3852C16.934 13.2883 18.7153 13.2883 19.8161 14.3852C20.9169 15.4822 20.9169 17.2708 19.8198 18.3678Z" stroke="#434146" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18 17C18.2652 17 18.5196 16.8946 18.7071 16.7071C18.8946 16.5196 19 16.2652 19 16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16C17 16.2652 17.1054 16.5196 17.2929 16.7071C17.4804 16.8946 17.7348 17 18 17Z" stroke="#434146" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                            <span className="ms-3 text-base">Access Staff</span>
                                        </Link>
                                        </li>
                                        }
                                        <li>
                                        <Link to="/accounts" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M4.78906 7.63281L8.57854 7.63281" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z" stroke="#434146" stroke-width="2"/>
                                            <path d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648" stroke="#434146" stroke-width="2"/>
                                            <path d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M16.1484 11.4219H16.1584" stroke="#434146" stroke-width="1.89474" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                            <span className="ms-3 text-base">Accounts</span>
                                        </Link>
                                        </li>
                                        <li>
                                        <Link to="/visa" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M4.78906 7.63281L8.57854 7.63281" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.8385 8.57813H16.3734C14.6824 8.57813 13.3125 9.85044 13.3125 11.4202C13.3125 12.99 14.6833 14.2623 16.3725 14.2623H18.8385C18.9181 14.2623 18.9569 14.2623 18.9901 14.2604C19.5017 14.2292 19.909 13.8512 19.9422 13.3765C19.9441 13.3462 19.9441 13.3093 19.9441 13.2363V9.60413C19.9441 9.53118 19.9441 9.49423 19.9422 9.46391C19.9081 8.98928 19.5017 8.61128 18.9901 8.58002C18.9569 8.57812 18.9181 8.57813 18.8385 8.57813Z" stroke="#434146" stroke-width="2"/>
                                            <path d="M18.9668 8.58059C18.8929 6.80712 18.6561 5.71954 17.8897 4.95407C16.7803 3.84375 14.9936 3.84375 11.4211 3.84375L8.57895 3.84375C5.00642 3.84375 3.21968 3.84375 2.11032 4.95407C1 6.06343 1 7.85017 1 11.4227C1 14.9952 1 16.782 2.11032 17.8913C3.21968 19.0016 5.00642 19.0016 8.57895 19.0016H11.4211C14.9936 19.0016 16.7803 19.0016 17.8897 17.8913C18.6561 17.1259 18.8939 16.0383 18.9668 14.2648" stroke="#434146" stroke-width="2"/>
                                            <path d="M4.78906 3.8426L8.32748 1.49597C8.8251 1.17229 9.40596 1 9.99959 1C10.5932 1 11.1741 1.17229 11.6717 1.49597L15.2101 3.8426" stroke="#434146" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M16.1484 11.4219H16.1584" stroke="#434146" stroke-width="1.89474" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>

                                            <span className="ms-3 text-base">Visas</span>
                                        </Link>
                                        </li>
                                    
                                    <li onClick={toggleModal}>
                                        <a href="#" className="flex items-center p-4 text-gray-900 rounded-lg active:bg-[#107243] active:text-white group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15 3L19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M10 17L15 12L10 7" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M15 12L3 12" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                            <span className="ms-3 text-[#CD2424] text-base">Log Out</span>
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                
                        </div>
                    </div>
                    
                    </aside>
                    <Header className="hidden md:block w-full ml-[20rem] px-8 py-4"/>
                </div>
            </div>
            
            
        
    
    </>
  );
};

export default Sidebar;
