import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

const ListAgainForm = ({ onCloseForm }) =>{
    const {verifyToken} = VerifyStaffToken();
    const {maidID} = useParams();
    const [errorMessage, setErrorMessage] = useState(false)
    const [spinningLoader, setSpinningLoader] = useState(false)
    const [activeTab, setActiveTab] = useState("profileListed");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSpinningLoader(true);
        const formData = new FormData(e.currentTarget);
        try {
          
          const response = await axiosInstense.post(
            `api/v1/maids/unHiring/${maidID}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${verifyToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          setSpinningLoader(false);
          onCloseForm();
        } catch (error) {
          console.error('Error submitting form:', error);
          setErrorMessage('An error occurred. Please try again.');
          setSpinningLoader(false);
        }
      };
        return(
        <>
            <div className="bg-[#F2F5FF] h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-semibold">List Again Maid</div>
                <div className="p-3 rounded-md bg-[#EBEBEB] cursor-pointer" onClick={ onCloseForm }>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 18L6 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 18L18 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
            </div>
                <div className="bg-[#EBEBEB] p-3 sm:p-8 rounded-xl shadow-lg">
                    <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
                    {errorMessage && 
                    <div className="p-4 mb-4 w-full md:w-[26rem] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{errorMessage}</span>
                    </div>
                    }
                        
                        {activeTab === "profileListed" && <form onSubmit={handleFormSubmit}>
                                
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Return Amount</label>
                                    <input type="number" placeholder="OMR 1000" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="returnAmount" />
                                </div>

                                <div class="mb-4">
                                    <label className="form-label block text-xl">Un-Hiring Reason</label>
                                    <input type="text" placeholder="Un Hiring Reason" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="unHiringReason" />
                                </div>
                                <div>
                                    <div class="mb-4">
                                        <button type="submit" className="w-full flex items-center justify-center text-sm font-semibold bg-[#CD2424] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                            {spinningLoader && <img className="w-8" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                            {!spinningLoader && "List Again"}
                                        </button>
                                    </div>
                                </div>
                        </form>}
                        
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default ListAgainForm;
