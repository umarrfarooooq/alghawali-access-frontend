import React, { useEffect, useState } from "react";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import StaffAccountPaymentHistory from "./Account-History-Table";
import axios from "axios";
import History from "@mui/icons-material/History";
import StaffAccountTransferPaymentHistory from "./Account-Transfer-History-Table";
import { useNavigate, useParams } from "react-router-dom";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const StaffAccountHistory = () => {

    const {verifyToken , staffId : savedStaffId} = VerifyStaffToken();
    const [accountData, setAccountData]  = useState([])
    const { staffId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Account History");
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    const formatDate = (inputDate) => {
      const date = new Date(inputDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
  };
    useEffect(() => {
        const fetchAccountHistoryData = async () => {
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
    
        fetchAccountHistoryData();
      }, [accountData]);

    return(
        <div className="md:px-8 px-4 pt-2">
         <div onClick={() => navigate(-1)} className='bg-[#fff] my-4 w-fit cursor-pointer p-3 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5L5 12L12 19" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 12L5 12" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div>
                    <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                        <div onClick={() => handleTabClick("Account History")} className={`${activeTab === "Account History" ? "bg-[#FFFBFA] , shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <History />
                        <span className="text-sm md:text-base hidden sm:inline-block">Account History</span>
                        </div>
                        <div onClick={() => handleTabClick("Transfer History")} className={`${activeTab === "Transfer History" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <History />
                        <span className="text-sm md:text-base hidden sm:inline-block">Transfer History</span>
                        </div>
                    </div>
            </div> 
            {accountData.accountHistory && <div>
            {activeTab === "Account History" && (
                <div>
                    {accountData.accountHistory.map((accountHistory) => (
                        <StaffAccountPaymentHistory key={accountHistory.id} formatDate={formatDate} paymentHistory={accountHistory} />
                    ))}
                </div>
            )}
            </div>}
            {accountData.transferHistory && <div>
            {activeTab === "Transfer History" && (
                <div>
                    {accountData.transferHistory.map((transferHistory) => (
                        <StaffAccountTransferPaymentHistory key={transferHistory.id} formatDate={formatDate} transferHistory={transferHistory} />
                    ))}
                </div>
            )}
            </div>}
            
        </div>
    )
}

export default StaffAccountHistory;