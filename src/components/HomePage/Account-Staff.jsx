import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import Backdrop from "../UI/Backdrop";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MyPaymentDetailsPopup from "../Staff-Account/My-Payment-Details";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const StaffAccountRow = ({accountData, action}) => {
      const [isAccountDetailsVisible, setIsAccountDetailsVisible] = useState(false)
      const [staffAccountDetails, setStaffAccountDetails] = useState([])
      const { verifyToken } = VerifyStaffToken();
      
      const toggleAccountDetailsPopupVisibility = () => {
        setIsAccountDetailsVisible(prevState => !prevState);
      }
      
      useEffect( () =>  {
        const fetchMyAccountData = async () => {
            try {
                const response = await axiosInstense.get(`api/v1/staffAccounts/my-account-summary/${accountData.staffId}`,
                {
                    headers: {
                      Authorization:
                      `Bearer ${verifyToken}`,
                    },
                  }
                );
                setStaffAccountDetails(response.data)
            } catch (error) {
                console.error("Error fetching Account data:", error);
            }
        }
        fetchMyAccountData();
      }, [accountData])
    return(
        <>
        {isAccountDetailsVisible && <Backdrop showBackdrop={true}/>}
            
            {isAccountDetailsVisible && (
                <aside className="absolute z-[20] -right-4 sm:right-0 w-screen sm:w-auto -mt-8">
                    <MyPaymentDetailsPopup onCloseForm={toggleAccountDetailsPopupVisibility} userDetails={staffAccountDetails}/>
                </aside>
            )}
            {staffAccountDetails &&
            <div onClick={action === "balance" ? toggleAccountDetailsPopupVisibility : undefined} className="cursor-pointer flex items-center justify-between p-3 rounded-md bg-[#EBEBEB]">
                    <div className="text-sm font-bold">{accountData.staffName}</div>
                    <div className="flex items-center gap-2">
                        {action === "balance" && <div className="text-sm font-semibold">{accountData.balance} OMR</div>}
                        {action === "received" && <div className="text-sm font-semibold">{accountData.totalReceivedAmount} OMR</div>}
                        {action === "sent" && <div className="text-sm font-semibold">{accountData.totalSentAmount} OMR</div>}
                        {accountData.staffId && <NavigateNextIcon className={`${action === "balance" ? "opacity-100" : "opacity-0"}`}/>}
                    </div>
            </div>}
            
        </>
    )
}

export default StaffAccountRow;