import React, { useEffect, useState } from "react";
import HomeCard from "../HomePage/HomeCard";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  
const AccountsCompo = () =>{
    const [accountDetails, setAccountDetails] = useState(null)
    const {verifyToken} = VerifyStaffToken();

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
                <div className="relative">
                    <div className="maidsProfiles mt-2">
                    <div className="flex flex-col gap-y-8">
                        <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 flex items-center justify-between border border-solid p-6">
                            <HomeCard cardTxt="Total Amount (Advance)" total={accountDetails.totalAdvanceAmount} count={accountDetails.totalAdvanceAmount}/>
                            <HomeCard cardTxt="Balance (Remaining)" total={accountDetails.balanceAmount} count={accountDetails.balanceAmount}/>
                            <HomeCard cardTxt="Return Amount" total={accountDetails.totalReturnAmount} count={accountDetails.totalReturnAmount}/>
                        </div>
                    </div>
                    </div>
                </div>
            
        </div>}
            
        </>
    )
}

export default AccountsCompo;