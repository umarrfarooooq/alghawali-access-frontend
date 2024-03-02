import React, { useEffect, useState } from "react";
import HomeCard from "../HomePage/HomeCard";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import AccountsPaymentHistory from "./Accounts-Payment-History";
import AllPaymentDetailsPopup from "./All-Payments-Details";
import Backdrop from "../UI/Backdrop";
import CostumerAccountDetails from "./Costumers-Accounts";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  
const AccountsCompo = () =>{
    const [selectedUser, setSelectedUser] = useState(null);
    const [accountDetails, setAccountDetails] = useState(null)
    const [costumerAccountDetails, setCostumerAccountDetails] = useState(null)
    const {verifyToken} = VerifyStaffToken();
    const [users, setUsers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("totalPayment");
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    useEffect(() => {
        const fetchAccountHistory = async () => {
          try {
            const response = await axiosInstense.get(
              "api/v1/customerAccounts/accountsSummary",
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

    useEffect(() => {
        const fetchCostumerAccounts = async () => {
          try {
            const response = await axiosInstense.get(
              "api/v1/customerAccounts/all",
              {
                headers: {
                  Authorization: `Bearer ${verifyToken}`,
                },
              }
            );
            setCostumerAccountDetails(response.data);
          } catch (error) {
            console.error("Error fetching maids:", error);
          }
        };
    
        fetchCostumerAccounts();
      }, []);

      const handleUserSelection = (userName) => {
        setSelectedUser(userName);
      };
    
      const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
      };

      const remainingRecievedDetails = accountDetails && accountDetails.remainingRecievedDetails;
      useEffect(() => { 
        if(remainingRecievedDetails) {
          setUsers(Object.keys(remainingRecievedDetails));
        }
      }, [remainingRecievedDetails]);

    return(
        <>
        {selectedUser && <Backdrop showBackdrop={true} />}
        {accountDetails && <div className="md:ml-[20rem] relative min-h-screen max-h-full md:px-8 px-4">
                { selectedUser && <aside className="absolute z-[20] right-0 -mt-8">
                  <AllPaymentDetailsPopup onCloseForm={() => setSelectedUser(null)} userDetails={accountDetails.remainingRecievedDetails[selectedUser]}/>
                </aside>
                }
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
                        <span className="text-sm md:text-base hidden sm:inline-block">Total Payment</span>
                        </div>
                        <div onClick={() => handleTabClick("Costumers")} className={`${activeTab === "Costumers" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M7.5 3.5C7.10218 3.5 6.72064 3.65804 6.43934 3.93934C6.15804 4.22064 6 4.60218 6 5C6 5.39782 6.15804 5.77936 6.43934 6.06066C6.72064 6.34196 7.10218 6.5 7.5 6.5C7.89782 6.5 8.27936 6.34196 8.56066 6.06066C8.84196 5.77936 9 5.39782 9 5C9 4.60218 8.84196 4.22064 8.56066 3.93934C8.27936 3.65804 7.89782 3.5 7.5 3.5ZM4.5 5C4.5 4.20435 4.81607 3.44129 5.37868 2.87868C5.94129 2.31607 6.70435 2 7.5 2C8.29565 2 9.05871 2.31607 9.62132 2.87868C10.1839 3.44129 10.5 4.20435 10.5 5C10.5 5.79565 10.1839 6.55871 9.62132 7.12132C9.05871 7.68393 8.29565 8 7.5 8C6.70435 8 5.94129 7.68393 5.37868 7.12132C4.81607 6.55871 4.5 5.79565 4.5 5ZM3.768 9C2.79 9 2 9.791 2 10.768L2 11.128C2 11.335 2 12.536 2.7 13.703C3.248 14.613 4.177 15.43 5.675 15.796C5.88017 15.2506 6.2517 14.7836 6.737 14.461C5.134 14.29 4.376 13.578 3.987 12.931C3.503 12.125 3.5 11.267 3.5 11.125V10.768C3.5 10.62 3.62 10.5 3.768 10.5H8.03C8.09606 9.9712 8.26779 9.46108 8.535 9H3.768ZM15.465 9C15.726 9.452 15.902 9.959 15.969 10.5H20.232C20.38 10.5 20.5 10.62 20.5 10.768V11.125C20.5 11.267 20.497 12.125 20.013 12.93C19.624 13.578 18.866 14.29 17.263 14.461C17.743 14.781 18.119 15.247 18.325 15.796C19.823 15.43 20.752 14.613 21.299 13.703C22 12.536 22 11.336 22 11.127V10.767C22 9.792 21.209 9 20.232 9L15.465 9ZM15 5C15 4.60218 15.158 4.22064 15.4393 3.93934C15.7206 3.65804 16.1022 3.5 16.5 3.5C16.8978 3.5 17.2794 3.65804 17.5607 3.93934C17.842 4.22064 18 4.60218 18 5C18 5.39782 17.842 5.77936 17.5607 6.06066C17.2794 6.34196 16.8978 6.5 16.5 6.5C16.1022 6.5 15.7206 6.34196 15.4393 6.06066C15.158 5.77936 15 5.39782 15 5ZM16.5 2C15.7044 2 14.9413 2.31607 14.3787 2.87868C13.8161 3.44129 13.5 4.20435 13.5 5C13.5 5.79565 13.8161 6.55871 14.3787 7.12132C14.9413 7.68393 15.7044 8 16.5 8C17.2956 8 18.0587 7.68393 18.6213 7.12132C19.1839 6.55871 19.5 5.79565 19.5 5C19.5 4.20435 19.1839 3.44129 18.6213 2.87868C18.0587 2.31607 17.2956 2 16.5 2ZM12 9.5C11.803 9.5 11.608 9.5388 11.426 9.61418C11.244 9.68956 11.0786 9.80005 10.9393 9.93934C10.8001 10.0786 10.6896 10.244 10.6142 10.426C10.5388 10.608 10.5 10.803 10.5 11C10.5 11.197 10.5388 11.392 10.6142 11.574C10.6896 11.756 10.8001 11.9214 10.9393 12.0607C11.0786 12.1999 11.244 12.3104 11.426 12.3858C11.608 12.4612 11.803 12.5 12 12.5C12.3978 12.5 12.7794 12.342 13.0607 12.0607C13.342 11.7794 13.5 11.3978 13.5 11C13.5 10.6022 13.342 10.2206 13.0607 9.93934C12.7794 9.65804 12.3978 9.5 12 9.5ZM9 11C9 10.2044 9.31607 9.44129 9.87868 8.87868C10.4413 8.31607 11.2044 8 12 8C12.7956 8 13.5587 8.31607 14.1213 8.87868C14.6839 9.44129 15 10.2044 15 11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11ZM6.5 16.768C6.5 15.79 7.291 15 8.268 15L15.732 15C16.709 15 17.5 15.791 17.5 16.768V17.128C17.5 17.335 17.5 18.536 16.8 19.703C16.057 20.937 14.613 22 12 22C9.387 22 7.942 20.937 7.2 19.703C6.5 18.536 6.5 17.336 6.5 17.127V16.768ZM8.268 16.5C8.23281 16.5 8.19796 16.5069 8.16544 16.5204C8.13293 16.5339 8.10338 16.5536 8.0785 16.5785C8.05361 16.6034 8.03387 16.6329 8.0204 16.6654C8.00693 16.698 8 16.7328 8 16.768V17.125C8 17.267 8.003 18.125 8.487 18.93C8.933 19.673 9.864 20.5 12 20.5C14.136 20.5 15.067 19.673 15.513 18.93C15.997 18.125 16 17.267 16 17.125V16.768C16 16.6969 15.9718 16.6288 15.9215 16.5785C15.8712 16.5282 15.8031 16.5 15.732 16.5H8.268Z" fill="#434146"/>
                        </svg>
                        </span>
                        <span className="text-sm md:text-base hidden sm:inline-block">Costumers</span>
                        </div>
                        <div onClick={() => handleTabClick("paymentHistory")} className={`${activeTab === "paymentHistory" ? "bg-[#FFFBFA]  shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.07914 5.06894C8.87402 1.27905 15.0438 1.31905 18.8617 5.13793C22.6816 8.95782 22.7216 15.1306 18.9257 18.9255C15.1308 22.7204 8.95802 22.6814 5.13814 18.8615C4.06367 17.7915 3.25184 16.487 2.76638 15.0504C2.28093 13.6138 2.13506 12.0842 2.34022 10.5818C2.36714 10.3846 2.47129 10.2062 2.62975 10.0858C2.78821 9.96538 2.98801 9.91287 3.18519 9.93979C3.38238 9.9667 3.56079 10.0709 3.68118 10.2293C3.80158 10.3878 3.85409 10.5876 3.82718 10.7848C3.65302 12.058 3.77649 13.3543 4.18787 14.5718C4.59926 15.7893 5.28735 16.8949 6.1981 17.8015C9.443 21.0454 14.6658 21.0644 17.8657 17.8655C21.0646 14.6656 21.0457 9.4428 17.8017 6.1979C14.5588 2.956 9.33901 2.935 6.1391 6.1299L6.88708 6.1329C6.98557 6.13336 7.083 6.15322 7.17382 6.19133C7.26463 6.22945 7.34705 6.28507 7.41637 6.35504C7.48569 6.42501 7.54054 6.50794 7.57781 6.59911C7.61508 6.69028 7.63402 6.78789 7.63356 6.88638C7.6331 6.98487 7.61325 7.0823 7.57513 7.17312C7.53702 7.26393 7.48139 7.34635 7.41142 7.41567C7.34145 7.48499 7.25852 7.53984 7.16735 7.57711C7.07618 7.61437 6.97857 7.63332 6.88008 7.63286L4.33416 7.62086C4.13647 7.6198 3.94718 7.54074 3.80748 7.40085C3.66779 7.26096 3.58897 7.07158 3.58818 6.87388L3.57518 4.32996C3.57466 4.23147 3.59354 4.13384 3.63074 4.04265C3.66795 3.95146 3.72275 3.86849 3.79202 3.79847C3.86129 3.72846 3.94367 3.67278 4.03446 3.6346C4.12525 3.59643 4.22267 3.57651 4.32116 3.57598C4.41965 3.57546 4.51728 3.59433 4.60847 3.63154C4.69966 3.66874 4.78263 3.72355 4.85265 3.79282C4.92266 3.86209 4.97834 3.94447 5.01652 4.03526C5.05469 4.12605 5.07461 4.22347 5.07514 4.32196L5.07914 5.06994V5.06894ZM11.9989 7.24887C12.1978 7.24887 12.3886 7.32788 12.5292 7.46853C12.6699 7.60918 12.7489 7.79994 12.7489 7.99885V11.6887L15.0298 13.9687C15.1015 14.0378 15.1587 14.1205 15.198 14.212C15.2374 14.3035 15.2581 14.4019 15.259 14.5015C15.2599 14.6011 15.241 14.6998 15.2033 14.792C15.1657 14.8842 15.11 14.968 15.0396 15.0384C14.9692 15.1089 14.8855 15.1646 14.7934 15.2024C14.7012 15.2401 14.6025 15.2591 14.5029 15.2583C14.4033 15.2575 14.3049 15.2368 14.2134 15.1976C14.1219 15.1583 14.0391 15.1012 13.9699 15.0296L11.2499 12.3097V7.99985C11.2499 7.80094 11.329 7.61018 11.4696 7.46953C11.6103 7.32888 11.801 7.24987 11.9999 7.24987L11.9989 7.24887Z" fill="#434146"/>
                        </svg>
                        </span>
                        <span className="text-sm md:text-base hidden sm:inline-block">Payment History</span>
                        </div>
                    </div>
                </div>
                {accountDetails && costumerAccountDetails ? <div>
                  {activeTab === "totalPayment" &&  <div className="relative">
                      <div className="maidsProfiles mt-2">
                      <div className="flex flex-col gap-y-8">
                          <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 grid grid-cols-1 sm:flex items-center justify-start border border-solid p-6">
                                <HomeCard cardTxt="Received Amount" total={accountDetails.receivedAmount} count={accountDetails.receivedAmount}/>
                                <HomeCard cardTxt="Balance (Remaining)" total={accountDetails.remainingAmount} count={accountDetails.remainingAmount}/>
                                <HomeCard cardTxt="Return Amount" total={accountDetails.returnAmount} count={accountDetails.returnAmount}/>
                          </div>
                          <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 grid grid-cols-1 sm:flex items-center justify-start border border-solid p-6">
                            {users.map((user) => (
                              <div key={user} onClick={() => handleUserSelection(user)}>
                              {accountDetails.remainingRecievedDetails && accountDetails.remainingRecievedDetails[user] && (
                                <HomeCard
                                  cursor="true"
                                  detailsPopUp={toggleFormVisibility}
                                  cardTxt={`${user} Received`}
                                  total={`${accountDetails.remainingRecievedDetails[user].total} OMR`}
                                  count={`${accountDetails.remainingRecievedDetails[user].total} OMR`}
                                />
                              )}
                              </div>
                            ))}
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
                {activeTab === "Costumers" && <div className="costumersAccounts">
                   <div className="flex flex-col gap-2 md:gap-4">
                        {costumerAccountDetails
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map(details => (
                            <CostumerAccountDetails key={details._id} accountDetails={details} />
                        ))}
                    </div>
                  </div>}
                </div> : "Loading..."}
                
        </div>}
        
            
        </>
    )
}

export default AccountsCompo;