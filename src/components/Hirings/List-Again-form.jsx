import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import { AutocompleteInput } from "./AutoSuggestMaid";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

const ListAgainForm = ({ onCloseForm }) =>{
    const {verifyToken, staffName} = VerifyStaffToken();
    const [accountDetails, setAccountDetails] = useState(null)
    const {maidID} = useParams();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [errorMessage, setErrorMessage] = useState(false)
    const [spinningLoader, setSpinningLoader] = useState(false)
    const [activeTab, setActiveTab] = useState("Return");
    const [isAmountReceived, setIsAmountReceived] = useState(false);
    const [newMaidID, setNewMaidID] = useState(null);
    const [staffNames, setStaffNames] = useState([]);

    useEffect(() => {
        const fetchAccountNames = async () => {
          try {
            const response = await axiosInstense.get(
              "api/v1/staffAccounts/all-accounts",
              {
                headers: {
                  Authorization: `Bearer ${verifyToken}`,
                },
              }
            );
            setStaffNames(response.data.map(staff => staff.staffName));
          } catch (error) {
            console.error("Error fetching staff names:", error);
          }
        };
    
        fetchAccountNames();
      }, [verifyToken]);

    const handleMaidIdSelected = (selectedMaidID) => {
        setNewMaidID(selectedMaidID);
      };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

      useEffect(() => {
        const fetchAccountDetails = async () => {
          try {
            const response = await axiosInstense.get(
              "api/v1/customerAccounts/maid/" + maidID,
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
        }
        fetchAccountDetails()
      }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSpinningLoader(true);
        const formData = new FormData(e.currentTarget);
        formData.append('newMaidId', newMaidID)
        formData.append('staffAccount', staffName)
        try {
          const response = await axiosInstense.post(
            `api/v1/customerAccounts/unHiring/${maidID}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${verifyToken}`,
                'Content-Type': 'multipart/form-data',
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
      const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleNewMaidPriceChange = (e) => {
      const newMaidPrice = parseFloat(e.target.value);
      const officeCharges = parseFloat(e.target.value);
      const difference = newMaidPrice - officeCharges;
      setIsAmountReceived(difference > parseFloat(accountDetails.receivedAmount));
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
                    <div>
                        <div className="flex items-center justify-between my-4 gap-2">
                            <div onClick={() => handleTabClick("Return")} className="py-3 px-4 flex items-center justify-center hover:bg-[#0c8b3f2a] transition-all cursor-pointer border text-[#0C8B3F] border-[#0C8B3F] w-full rounded-lg">
                                <span>Return</span>
                            </div>
                            <div onClick={() => handleTabClick("Replace")} className="py-3 px-4 flex items-center justify-center hover:bg-[#43414634] transition-all cursor-pointer border text-[#434146] border-[#434146] w-full rounded-lg">
                                <span>Replace</span>
                            </div>
                        </div>
                    </div>
                        {activeTab === "Return" && <form onSubmit={handleFormSubmit}>
                                
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Office Charges</label>
                                    <input type="number" placeholder="OMR 1000" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="officeCharges" />
                                </div>
                                <input type="text" name="option" value="return" hidden/>
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Return Amount</label>
                                    <input type="number" placeholder="OMR 1000" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="returnAmount" />
                                </div>
                                <div className="md:flex items-center justify-between md:flex-row">
                                <div class="mb-4">
                                    <label className="form-label block text-xl">Payment Method</label>
                                    <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange} name="paymentMethod" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                
                                <div class="mb-4">
                                    <label className="form-label block text-xl">Sended By</label>
                                    <select name="sendedBy" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    {staffNames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            {selectedPaymentMethod === "Bank Transfer" && (
                                        <div className="mb-4">
                                            <label className="form-label block text-xl">Select Bank</label>
                                              <select
                                                  name="selectedBank"
                                                  className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                              >
                                                  <option value="" disabled>Select Bank</option>
                                                  <option value="Central Bank">Central Bank</option>
                                                  <option value="Central Bank of Oman">Central Bank of Oman</option>
                                                  <option value="Bank Muscat">Bank Muscat</option>
                                                  <option value="Bank Dhofar">Bank Dhofar</option>
                                                  <option value="National Bank of Oman">National Bank of Oman</option>
                                                  <option value="Sohar International">Sohar International</option>
                                                  <option value="Oman Arab Bank">Oman Arab Bank</option>
                                                  <option value="HSBC Oman">HSBC Oman</option>
                                                  <option value="Ahli Bank">Ahli Bank</option>
                                                  <option value="Bank Nizwa">Bank Nizwa</option>
                                                  <option value="Alizz Islamic Bank">Alizz Islamic Bank</option>
                                                  <option value="First Abu Dhabi Bank Oman">First Abu Dhabi Bank Oman</option>
                                                  <option value="Standard and Charter Bank Oman">Standard and Charter Bank Oman</option>
                                                  <option value="Beirut Oman Bank">Beirut Oman Bank</option>
                                              </select>
                                        </div>
                                    )}
                                <div class="mb-4">
                                    <label className="form-label block text-xl">Un-Hiring Reason</label>
                                    <input type="text" placeholder="Un Hiring Reason" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="unHiringReason" />
                                </div>
                                <label class="block text-xl">Payment Slip</label>                                
                                <div class="flex items-center mb-4 justify-center w-full">
                                    <label htmlFor="payment-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                                        </div>
                                        <input id="payment-file" type="file" name="paymentProof" hidden />
                                    </label>
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
                        {activeTab === "Replace" && <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Office Charges</label>
                                    <input onChange={handleNewMaidPriceChange} type="number" placeholder="OMR 1000" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="officeCharges" />
                                </div>
                                <input type="text" name="option" value="replace" hidden/>
                                <AutocompleteInput onMaidIdSelected={handleMaidIdSelected} />

                                <div className="mb-4">
                                    <label className="form-label block text-xl">New Maid Price</label>
                                    <input onChange={handleNewMaidPriceChange} type="number" placeholder="OMR 1000" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="newMaidPrice" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label block text-xl">Received Amount</label>
                                    <input type="number" placeholder="OMR 1000" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="receivedAmount" />
                                </div>
                                <div className="md:flex items-center justify-between md:flex-row">
                                <div class="mb-4">
                                    <label className="form-label block text-xl">Payment Method</label>
                                    <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange} name="paymentMethod" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                {isAmountReceived ? <div class="mb-4">
                                    <label className="form-label block text-xl">Sended By</label>
                                    <select name="sendedBy" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        {staffNames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                    </select>
                                </div>: <div class="mb-4">
                                    <label className="form-label block text-xl">Received By</label>
                                    <select name="receivedBy" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                    {staffNames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                    </select>
                                </div>}

                            </div>
                            {selectedPaymentMethod === "Bank Transfer" && (
                                        <div className="mb-4">
                                            <label className="form-label block text-xl">Select Bank</label>
                                              <select
                                                  name="selectedBank"
                                                  className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                                              >
                                                  <option value="" disabled>Select Bank</option>
                                                  <option value="Central Bank">Central Bank</option>
                                                  <option value="Central Bank of Oman">Central Bank of Oman</option>
                                                  <option value="Bank Muscat">Bank Muscat</option>
                                                  <option value="Bank Dhofar">Bank Dhofar</option>
                                                  <option value="National Bank of Oman">National Bank of Oman</option>
                                                  <option value="Sohar International">Sohar International</option>
                                                  <option value="Oman Arab Bank">Oman Arab Bank</option>
                                                  <option value="HSBC Oman">HSBC Oman</option>
                                                  <option value="Ahli Bank">Ahli Bank</option>
                                                  <option value="Bank Nizwa">Bank Nizwa</option>
                                                  <option value="Alizz Islamic Bank">Alizz Islamic Bank</option>
                                                  <option value="First Abu Dhabi Bank Oman">First Abu Dhabi Bank Oman</option>
                                                  <option value="Standard and Charter Bank Oman">Standard and Charter Bank Oman</option>
                                                  <option value="Beirut Oman Bank">Beirut Oman Bank</option>
                                              </select>
                                        </div>
                             )}
                               
                                <label class="block text-xl">Payment Slip</label>                                
                                <div class="flex items-center mb-4 justify-center w-full">
                                    <label htmlFor="payment-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                                        </div>
                                        <input id="payment-file" type="file" name="paymentProof" hidden />
                                    </label>
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
