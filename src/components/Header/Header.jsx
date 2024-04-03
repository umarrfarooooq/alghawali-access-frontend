import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../assets/avatar.png"
import { VerifyStaffToken } from "../Auth/VerifyToken";
import logo from "../sidebar/logo.svg"
import { Grow } from "@mui/material";
import roles from "../roles/roles";

const Header = ({ onClick, className, headerTxt }) => {
    const { staffName , roles: userRoles } = VerifyStaffToken();
    const [myAccountList, setMyAccountList] = useState(false);
    const myAccountRef = useRef(null);

    const handleAccountListToggle = () => {
        setMyAccountList(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (myAccountRef.current && !myAccountRef.current.contains(event.target)) {
                setMyAccountList(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [myAccountRef]);

    return (
        <>
        <div className={`${className}`}>
            <div className="bg-[#253061] md:hidden">
                <div className="flex items-center justify-between p-4">
                    <div className="leftSideHeader">
                        <Link to="/">
                            <img className="w-12 h-11" src={logo}/>
                        </Link>
                    </div>
                    <div className="rightSideHeader cursor-pointer" onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                            <path d="M1.00312 1H20.2031" stroke="#FFFBFA" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M7.00313 7H20.2031" stroke="#FFFBFA" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M14.2031 13H20.2031" stroke="#FFFBFA" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
           
            <div className="md:block hidden">
                <div className="flex items-center justify-between ">
                    <div className="leftSideDesktop">
                        <span className="text-3xl">{headerTxt ? headerTxt : `Welcome Back, ${staffName}`}</span>
                    </div>
                    <div className="rightSideDesktop">
                        <div className="profile relative">
                            <img onClick={handleAccountListToggle} className="w-12 h-12 cursor-pointer rounded-full object-cover object-top" src={Avatar} />
                            {userRoles.includes(roles.canAccessOnAccounts) && myAccountList && 
                                <Grow in={myAccountList}>
                                    <div ref={myAccountRef} className="absolute z-10 right-0">
                                        <div className="bg-white shadow-lg rounded-md py-1 w-[16rem]">
                                            <ul>
                                                <Link to="/my-account">
                                                    <li className="px-2 py-2 hover:bg-gray-200 cursor-pointer transition-all">My Account</li>
                                                </Link>
                                            </ul>
                                        </div>
                                    </div>
                                </Grow>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header;
