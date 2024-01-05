import React, { useEffect, useState } from "react";
import HomeCard from "../HomePage/HomeCard";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import AccountsPaymentHistory from "./Accounts-Payment-History";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  
const AccountsCompo = () =>{
    const [accountDetails, setAccountDetails] = useState(null)
    const {verifyToken} = VerifyStaffToken();
    const [activeTab, setActiveTab] = useState("totalPayment");
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    useEffect(() => {
        const fetchAccountHistory = async () => {
          try {
            const response = await axiosInstense.get(
              "api/v1/maids/hirings/all/",
              {
                headers: {
                  Authorization: `Bearer ${verifyToken}`,
                },
              }
            );
            setAccountDetails(response.data);
          } catch (error) {
            console.error("Error fetching maids:", error);
          }
        };
    
        fetchAccountHistory();
      }, []);


    return(
        <>
        {accountDetails && <div className="md:ml-[20rem] min-h-screen max-h-full md:px-8 px-4">
        <div>
                    <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                        <div onClick={() => handleTabClick("totalPayment")} className={`${activeTab === "totalPayment" ? "bg-[#FFFBFA] , shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                          <path d="M4.78906 7.63257H8.57854" stroke="#434146" stroke-width="1.42105" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M18.8385 8.57788H16.3734C14.6824 8.57788 13.3125 9.8502 13.3125 11.42C13.3125 12.9898 14.6833 14.2621 16.3725 14.2621H18.8385C18.9181 14.2621 18.9569 14.2621 18.9901 14.2602C19.5017 14.2289 19.909 13.8509 19.9422 13.3763C19.9441 13.346 19.9441 13.309 19.9441 13.2361V9.60388C19.9441 9.53093 19.9441 9.49399 19.9422 9.46367C19.9081 8.98904 19.5017 8.61104 18.9901 8.57978C18.9569 8.57788 18.9181 8.57788 18.8385 8.57788Z" stroke="#434146" stroke-width="1.42105"/>
                          <path d="M18.9663 8.58045C18.8924 6.80703 18.6556 5.71948 17.8892 4.95403C16.7798 3.84375 14.9932 3.84375 11.4207 3.84375H8.57872C5.0063 3.84375 3.21962 3.84375 2.11028 4.95403C1 6.06337 1 7.85005 1 11.4225C1 14.9949 1 16.7816 2.11028 17.8909C3.21962 19.0012 5.0063 19.0012 8.57872 19.0012H11.4207C14.9932 19.0012 16.7798 19.0012 17.8892 17.8909C18.6556 17.1254 18.8934 16.0379 18.9663 14.2645" stroke="#434146" stroke-width="1.42105"/>
                          <path d="M4.78906 3.84252L8.32738 1.49596C8.82498 1.17229 9.40582 1 9.99943 1C10.593 1 11.1739 1.17229 11.6715 1.49596L15.2098 3.84252" stroke="#434146" stroke-width="1.42105" stroke-linecap="round"/>
                          <path d="M16.1484 11.4214H16.1584" stroke="#434146" stroke-width="1.89474" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                        <span className="text-sm md:text-base">Total Payment</span>
                        </div>
                        <div onClick={() => handleTabClick("paymentHistory")} className={`${activeTab === "paymentHistory" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.07914 5.06894C8.87402 1.27905 15.0438 1.31905 18.8617 5.13793C22.6816 8.95782 22.7216 15.1306 18.9257 18.9255C15.1308 22.7204 8.95802 22.6814 5.13814 18.8615C4.06367 17.7915 3.25184 16.487 2.76638 15.0504C2.28093 13.6138 2.13506 12.0842 2.34022 10.5818C2.36714 10.3846 2.47129 10.2062 2.62975 10.0858C2.78821 9.96538 2.98801 9.91287 3.18519 9.93979C3.38238 9.9667 3.56079 10.0709 3.68118 10.2293C3.80158 10.3878 3.85409 10.5876 3.82718 10.7848C3.65302 12.058 3.77649 13.3543 4.18787 14.5718C4.59926 15.7893 5.28735 16.8949 6.1981 17.8015C9.443 21.0454 14.6658 21.0644 17.8657 17.8655C21.0646 14.6656 21.0457 9.4428 17.8017 6.1979C14.5588 2.956 9.33901 2.935 6.1391 6.1299L6.88708 6.1329C6.98557 6.13336 7.083 6.15322 7.17382 6.19133C7.26463 6.22945 7.34705 6.28507 7.41637 6.35504C7.48569 6.42501 7.54054 6.50794 7.57781 6.59911C7.61508 6.69028 7.63402 6.78789 7.63356 6.88638C7.6331 6.98487 7.61325 7.0823 7.57513 7.17312C7.53702 7.26393 7.48139 7.34635 7.41142 7.41567C7.34145 7.48499 7.25852 7.53984 7.16735 7.57711C7.07618 7.61437 6.97857 7.63332 6.88008 7.63286L4.33416 7.62086C4.13647 7.6198 3.94718 7.54074 3.80748 7.40085C3.66779 7.26096 3.58897 7.07158 3.58818 6.87388L3.57518 4.32996C3.57466 4.23147 3.59354 4.13384 3.63074 4.04265C3.66795 3.95146 3.72275 3.86849 3.79202 3.79847C3.86129 3.72846 3.94367 3.67278 4.03446 3.6346C4.12525 3.59643 4.22267 3.57651 4.32116 3.57598C4.41965 3.57546 4.51728 3.59433 4.60847 3.63154C4.69966 3.66874 4.78263 3.72355 4.85265 3.79282C4.92266 3.86209 4.97834 3.94447 5.01652 4.03526C5.05469 4.12605 5.07461 4.22347 5.07514 4.32196L5.07914 5.06994V5.06894ZM11.9989 7.24887C12.1978 7.24887 12.3886 7.32788 12.5292 7.46853C12.6699 7.60918 12.7489 7.79994 12.7489 7.99885V11.6887L15.0298 13.9687C15.1015 14.0378 15.1587 14.1205 15.198 14.212C15.2374 14.3035 15.2581 14.4019 15.259 14.5015C15.2599 14.6011 15.241 14.6998 15.2033 14.792C15.1657 14.8842 15.11 14.968 15.0396 15.0384C14.9692 15.1089 14.8855 15.1646 14.7934 15.2024C14.7012 15.2401 14.6025 15.2591 14.5029 15.2583C14.4033 15.2575 14.3049 15.2368 14.2134 15.1976C14.1219 15.1583 14.0391 15.1012 13.9699 15.0296L11.2499 12.3097V7.99985C11.2499 7.80094 11.329 7.61018 11.4696 7.46953C11.6103 7.32888 11.801 7.24987 11.9999 7.24987L11.9989 7.24887Z" fill="#434146"/>
                        </svg>
                        </span>
                        <span className="text-sm md:text-base">Payment History</span>
                        </div>
                    </div>
                </div>
                {activeTab === "totalPayment" &&  <div className="relative">
                    <div className="maidsProfiles mt-2">
                    <div className="flex flex-col gap-y-8">
                        <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 flex items-center justify-between border border-solid p-6">
                            <HomeCard cardTxt="Total Amount (Advance)" total={accountDetails.totalAdvanceAmount} count={accountDetails.totalAdvanceAmount}/>
                            <HomeCard cardTxt="Balance (Remaining)" total={accountDetails.balanceAmount} count={accountDetails.balanceAmount}/>
                            <HomeCard cardTxt="Return Amount" total={accountDetails.totalReturnAmount} count={accountDetails.totalReturnAmount}/>
                        </div>
                        <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 flex items-center justify-between border border-solid p-6">
                            <HomeCard cardTxt="Riya Received" total={`${accountDetails.receivedByTotal.Riya} OMR`} count={`${accountDetails.receivedByTotal.Riya} OMR`}/>
                            <HomeCard cardTxt="Leena Received" total={`${accountDetails.receivedByTotal.Leena} OMR`} count={`${accountDetails.receivedByTotal.Leena} OMR`}/>
                            <HomeCard cardTxt="Jitan Received" total={`${accountDetails.receivedByTotal.Jitan} OMR`} count={`${accountDetails.receivedByTotal.Jitan} OMR`}/>
                            <HomeCard cardTxt="Ali Received" total={`${accountDetails.receivedByTotal.Ali} OMR`} count={`${accountDetails.receivedByTotal.Ali} OMR`}/>
                        </div>
                    </div>
                    </div>
                </div>}
               {activeTab === "paymentHistory" && <div className="accountsPaymentHistory">
                  {accountDetails.allHiring && <div className="historyBoxes bg-[#FFFBFA] p-4 rounded-lg">
                        {accountDetails.allHiring.map(history => (
                            <AccountsPaymentHistory key={history._id} accountDetails={history} />
                        ))}
                    </div>
                  }
                    
                  </div>}
        </div>}
        
            
        </>
    )
}

export default AccountsCompo;