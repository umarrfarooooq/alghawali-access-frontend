import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import SendIcon from '@mui/icons-material/Send';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Backdrop from "../UI/Backdrop";
import TransferAmountForm from "./Transfer-Amount-Form";
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import Tooltip from '@mui/material/Tooltip';
import MyPaymentDetailsPopup from "./My-Payment-Details";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Grow } from "@mui/material";
import DebitAmountForm from "./Debit-Amount-Form";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const StaffAccountTable = ({accountData}) => {
      const [isTransferFormVisible, setIsTransferFormVisible] = useState(false)
      const [isDebitFormVisible, setIsDebitFormVisible] = useState(false)
      const [isAccountDetailsVisible, setIsAccountDetailsVisible] = useState(false)
      const [openMyAccountAction, setOpenMyAccountAction] = useState(false)
      const [staffAccountDetails, setStaffAccountDetails] = useState([])
      const { staffId, verifyToken } = VerifyStaffToken();
      const toggleTransferFormVisibility = () => {
        setOpenMyAccountAction(false)
        setIsTransferFormVisible(prevState => !prevState);
      }
      const toggleDebitFormVisibility = () => {
        setOpenMyAccountAction(false)
        setIsDebitFormVisible(prevState => !prevState);
      }
      const toggleAccountDetailsPopupVisibility = () => {
        setOpenMyAccountAction(false)
        setIsAccountDetailsVisible(prevState => !prevState);
      }
      const toggleMyAccountActionBox = () =>{
        setOpenMyAccountAction(!openMyAccountAction)
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
        {isTransferFormVisible && <Backdrop showBackdrop={true} zIndex={20}/>}
        {isDebitFormVisible && <Backdrop showBackdrop={true} zIndex={20}/>}
        {isAccountDetailsVisible && <Backdrop showBackdrop={true}/>}
            {isTransferFormVisible && (
                <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
                    <TransferAmountForm onCloseForm={toggleTransferFormVisibility} />
                </aside>
            )}
            {isDebitFormVisible && (
                <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
                    <DebitAmountForm onCloseForm={toggleDebitFormVisibility} />
                </aside>
            )}
            
            {isAccountDetailsVisible && (
                <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
                    <MyPaymentDetailsPopup onCloseForm={toggleAccountDetailsPopupVisibility} userDetails={staffAccountDetails}/>
                </aside>
            )}
            {staffAccountDetails && <div className="requirementTable relative p-4 md:p-6 rounded-xl border border-[#C3D0D4] bg-[#FFFBFA]">
            {accountData.staffId === staffId && <div onClick={toggleMyAccountActionBox} className="absolute right-4 flex flex-col items-end gap-3 hover:bg-[#F2F2F2] active:bg-[#d3d3d3] transition-all cursor-pointer p-2 rounded-full">
                <MoreVertIcon />
            </div>}
                <div>
                    <div className="top flex sm:items-center p-2 md:p-3 sm:justify-between flex-col sm:flex-row gap-2">
                        <div className="text-base md:text-lg lg:text-xl">{accountData.staffName} ({accountData.staffCode})</div>
                        {accountData.staffId === staffId && <Grow in={openMyAccountAction}>
                            <div className={`${openMyAccountAction ? "flex" : "hidden"} transition-all border-solid border shadow-lg editAndDelSvg absolute right-8 top-12  flex-col items-end gap-3 bg-[#FFFBFA] z-10 p-3 rounded-xl`}>
                                <div className="w-full hidden">
                                    <div onClick={toggleTransferFormVisibility} className="border border-[#107243] hover:bg-opacity-25 active:bg-opacity-40 transition-all cursor-pointer p-2 mt-2 bg-[#107243] text-[#107243] rounded-md bg-opacity-10 flex items-center justify-center gap-2"><div>Transfer</div><SendIcon /></div>
                                </div>
                                <div className="w-full">
                                    <div onClick={toggleDebitFormVisibility} className="border border-[#107243] hover:bg-opacity-25 active:bg-opacity-40 transition-all cursor-pointer p-2 mt-2 bg-[#107243] text-[#107243] rounded-md bg-opacity-10 flex items-center justify-center gap-2"><div>Transfer</div><SendIcon /></div>
                                </div>
                            </div>
                        </Grow>}
                        
                    </div>
                    <hr />
                    <div className="main flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 p-2 md:p-3 h-full sm:h-16 md:h-24">
                        <div className="flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between gap-1">
                            <div className="text-base md:text-lg lg:text-xl">Available</div>
                            {staffAccountDetails && staffAccountDetails.totalBalance > 0 && <Tooltip title="Info" placement="top">
                                <InfoIcon onClick={toggleAccountDetailsPopupVisibility} className="cursor-pointer"/>
                            </Tooltip>}
                            
                        </div>
                            <div className="text-xl md:text-2xl lg:text-4xl font-semibold">{accountData.balance} OMR</div>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="text-base md:text-lg lg:text-xl">Received</div>
                                <div className="flex items-center gap-3">
                                    <div className="text-sm lg:text-base font-medium">{accountData.totalReceivedAmount} OMR</div>
                                <NavigateNextIcon />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="text-base md:text-lg lg:text-xl">Sended</div>
                                <div className="flex items-center gap-3">
                                    <div className="text-sm lg:text-base font-medium">{accountData.totalSentAmount} OMR</div>
                                    <NavigateNextIcon />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <Link to={`/my-account-history/${accountData.staffId}`}>
                        <div className="history w-full border border-[#107243] hover:bg-opacity-25 active:bg-opacity-40 transition-all cursor-pointer p-2 mt-2 bg-[#107243] text-[#107243] rounded-md bg-opacity-10 flex items-center justify-center gap-2">
                            <HistoryIcon />
                            <button>
                                History
                            </button>
                        </div>
                    </Link>
                </div>
                
            </div>}
            
        </>
    )
}

export default StaffAccountTable;