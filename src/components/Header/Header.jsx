import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../assets/avatar.png"
import { VerifyStaffToken } from "../Auth/VerifyToken";
import logo from "../sidebar/logo.svg"

const Header = ({ onClick, className, headerTxt }) =>{

    const {staffName} = VerifyStaffToken()

    return(
        <>
        <div className={`${className}`}>
            <div className="bg-[#253061] md:hidden">
                <div className="flex items-center justify-between p-4">
                    <div className="leftSideHeader">
                        <Link to="/">
                            <img className="w-12 h-11" src={logo}/>
                        </Link>
                    </div>
                    <div className="rightSideHeader cursor-pointer"  onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                        <path d="M1.00312 1H20.2031" stroke="#FFFBFA" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M7.00313 7H20.2031" stroke="#FFFBFA" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M14.2031 13H20.2031" stroke="#FFFBFA" stroke-width="1.5" stroke-linecap="round"/>
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
                    <div className="profile">
                        <img className="w-12 h-12 rounded-full object-cover object-top" src={Avatar}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header;