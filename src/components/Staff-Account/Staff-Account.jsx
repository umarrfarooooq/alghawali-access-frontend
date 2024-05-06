import React, { useEffect, useState } from "react";
import StaffAccountTable from "./Staff-Account-Table";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import axios from "axios";
import roles from "../roles/roles";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WalletIcon from '@mui/icons-material/Wallet';
import PendingPaymentTable from "./Pending-Payment";
const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const StaffAccount = () => {

    const {verifyToken , staffId, roles: userRoles} = VerifyStaffToken();
    const [accountData, setAccountData]  = useState([])
    const [pendingPaymentRequests, setPendingPaymentRequests]  = useState([])
    const [allAccountData, setAllAccountData]  = useState([])
    const [updateFlag, setUpdateFlag] = useState(false);
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
      }, []);


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
      }, []);

      
    useEffect(() => {
        const fetchAllAPendingPaymentRequests = async () => {
          try {
            const response = await axiosInstense.get(`api/v1/staffAccounts/all-pending-approvals`,
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            setPendingPaymentRequests(response.data);
          } catch (error) {
            console.error("Error fetching requests:", error);
          }
        };
    
        fetchAllAPendingPaymentRequests();
      }, [updateFlag]);

      return (
        <div className="md:px-8 px-4 pt-2">
            <div onClick={() => navigate(-1)} className='bg-[#fff] my-4 w-fit cursor-pointer p-3 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5L5 12L12 19" stroke="#262F32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 12L5 12" stroke="#262F32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            {userRoles.includes(roles.fullAccessOnAccounts) && 
                <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                    <div onClick={() => handleTabClick("My Account")} className={`${activeTab === "My Account" ? "bg-[#FFFBFA] , shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <WalletIcon />
                        <span className="text-sm md:text-base hidden sm:inline-block">My Account</span>
                    </div>
                    <div onClick={() => handleTabClick("All Accounts")} className={`${activeTab === "All Accounts" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <AccountBalanceWalletIcon />
                        <span className="text-sm md:text-base hidden sm:inline-block">All Accounts</span>
                    </div>
                    <div onClick={() => handleTabClick("Pending Payments")} className={`${activeTab === "Pending Payments" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <PendingActionsIcon />
                        <span className="text-sm md:text-base hidden sm:inline-block">Pending Payments</span>
                    </div>
                </div>
            }
            <div>
                {activeTab === "Pending Payments" ? (
                  <div className="w-full border rounded-3xl border-solid p-6 flex flex-col gap-3">
                    {pendingPaymentRequests.map((paymentRequest, index) => (
                          <PendingPaymentTable setUpdateFlag={setUpdateFlag} key={index} pendingPaymentData={paymentRequest}/>
                      ))}
                  </div>
                ) : null}
            </div>
            {activeTab === "My Account" && (
                <div className="w-full border rounded-3xl border-solid p-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <StaffAccountTable accountData={accountData} />
                </div>
            )}

            {activeTab === "All Accounts" && (
                <div className="w-full border rounded-3xl border-solid p-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {allAccountData.map((accountData, index) => (
                        <StaffAccountTable key={index} accountData={accountData} />
                    ))}
                </div>
            )}

        </div>
    );
}
export default StaffAccount;