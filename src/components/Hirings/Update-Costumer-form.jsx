import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

const UpdateCostumerForm = ({ onCloseForm, costumerDetails }) =>{
    const [updatedCostumerDetails, setUpdatedCostumerDetails] = useState(costumerDetails);
    const {verifyToken} = VerifyStaffToken();
    const {maidID} = useParams();
    const [errorMessage, setErrorMessage] = useState(false)
    const [spinningLoader, setSpinningLoader] = useState(false)
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSpinningLoader(true);
        const formData = new FormData(e.currentTarget);
        try {
          const response = await axiosInstense.put(
            `api/v1/maids/hiring/edit/${costumerDetails._id}`,
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
      const handleInputChange = (value, fieldName) => {
        setUpdatedCostumerDetails(prevDetails => ({
            ...prevDetails,
            [fieldName]: value,
        }));
    };
    const getDefaultDate = updatedCostumerDetails.hiringDate;
    const defaultDate = getDefaultDate ? new Date(getDefaultDate).toISOString().slice(0, 10) : '';

        return(
        <>
            <div className="bg-[#F2F5FF] h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-semibold">Update Costumer</div>
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
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="form-label block text-xl">Customer Name</label>
                                <input  value={updatedCostumerDetails.fullName} onChange={(e) => handleInputChange(e.target.value, 'fullName')} type="text" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="fullName" />
                            </div>
                            {/* <div className="mb-4">
                                <label className="form-label block text-xl">Total Amount</label>
                                <input onChange={(e) => handleInputChange(e.target.value, 'totalAmount')} value={updatedCostumerDetails.totalAmount} type="number" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="totalAmount" />
                            </div>

                            <div class="mb-4">
                                <label className="form-label block text-xl">Advance Amount</label>
                                <input onChange={(e) => handleInputChange(e.target.value, 'advanceAmount')} value={updatedCostumerDetails.advanceAmount} type="number" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="advanceAmount" />
                            </div> */}
                            <div className="md:flex items-center justify-between md:flex-row">
                                <div class="mb-4">
                                    <label className="form-label block text-xl">Payment Method</label>
                                    <select value={updatedCostumerDetails.paymentMethod} onChange={(e) => handleInputChange(e.target.value, 'paymentMethod')} name="paymentMethod" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label className="form-label block text-xl">Received By</label>
                                    <select value={updatedCostumerDetails.receivedBy} onChange={(e) => handleInputChange(e.target.value, 'receivedBy')} name="receivedBy" class="w-full bg-[#E3E3E3] md:w-[12rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        <option value="Riya">Riya</option>
                                        <option value="Leena">Leena</option>
                                        <option value="Jitan">Jitan</option>
                                        <option value="Ali">Ali</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="mb-4">
                                <label className="form-label block text-xl">Hiring Date</label>
                                <input defaultValue={defaultDate} onChange={(e) => handleInputChange(e.target.value, 'hiringDate')} type="date" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="hiringDate" />
                            </div>
                            <div class="mb-4">
                                <label className="form-label block text-xl">Customer Ph#</label>
                                <input onChange={(e) => handleInputChange(e.target.value, 'cosPhone')} value={updatedCostumerDetails.cosPhone} type="number" className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="cosPhone" />
                            </div>
                            
                            <div>
                                <div class="mb-4">
                                    <button type="submit" className="w-full flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        {spinningLoader && <img className="w-8" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                        {!spinningLoader && "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default UpdateCostumerForm;
