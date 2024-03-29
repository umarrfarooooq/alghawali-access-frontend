import React, { useEffect, useState } from "react";
import StaffAccountTable from "./Staff-Account-Table";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import axios from "axios";
import roles from "../roles/roles";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';
const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const StaffAccount = () => {

    const {verifyToken , staffId, roles: userRoles} = VerifyStaffToken();
    const [accountData, setAccountData]  = useState([])
    const [allAccountData, setAllAccountData]  = useState([])
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("My Account");
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    useEffect(() => {
        const fetchAccountData = async () => {
          try {
            const response = await axiosInstense.get(`api/v1/staffAccounts/my-account/${staffId}`,
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            setAccountData(response.data);
          } catch (error) {
            console.error("Error fetching maid data:", error);
          }
        };
    
        fetchAccountData();
      }, [accountData]);


    useEffect(() => {
        const fetchAllAccountData = async () => {
          try {
            const response = await axiosInstense.get(`api/v1/staffAccounts/all-accounts`,
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            setAllAccountData(response.data);
          } catch (error) {
            console.error("Error fetching maid data:", error);
          }
        };
    
        fetchAllAccountData();
      }, [allAccountData]);

    return(
        <div className="md:px-8 px-4 pt-2">
            <div onClick={() => navigate(-1)} className='bg-[#fff] my-4 w-fit cursor-pointer p-3 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5L5 12L12 19" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 12L5 12" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
                  {userRoles.includes(roles.fullAccessOnAccounts) && <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                        <div onClick={() => handleTabClick("My Account")} className={`${activeTab === "My Account" ? "bg-[#FFFBFA] , shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <WalletIcon />
                        
                        <span className="text-sm md:text-base hidden sm:inline-block">My Account</span>
                        </div>
                        <div onClick={() => handleTabClick("All Accounts")} className={`${activeTab === "All Accounts" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <AccountBalanceWalletIcon />
                        <span className="text-sm md:text-base hidden sm:inline-block">All Accounts</span>
                        </div>
                    </div>}
                    
                    <div className="w-full border rounded-3xl border-solid p-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {activeTab === "My Account" ? (
                        <StaffAccountTable accountData={accountData} /> 
                      ) : (
                        allAccountData.map((accountData, index) => (
                          <StaffAccountTable key={index} accountData={accountData} />
                        ))
                    )}
                    </div>
        </div>
    )
}

export default StaffAccount;