import axios from "axios";
import React, { useState } from "react";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
const AddStaffForm = ({ onCloseForm }) =>{
    const {verifyToken} = VerifyStaffToken();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        roles: [],
      });
      const [spinningLoader, setSpinningLoader] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const updatedRoles = checked
          ? [...formData.roles, parseInt(value, 10)]
          : formData.roles.filter((role) => role !== parseInt(value, 10));
        setFormData({ ...formData, roles: updatedRoles });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSpinningLoader(true);
    
        try {
          const response = await axiosInstense.post('api/v1/staff', formData, {
            headers: {
                Authorization: `Bearer ${verifyToken}`,
                'Content-Type': 'application/json',
            },
          });
          
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
            <div className="text-2xl font-semibold">Add New Staff</div>
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
                                <label className="form-label block text-xl">Full Name</label>
                                <input onChange={handleInputChange} type="text" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="fullName" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label block text-xl">Email</label>
                                <input onChange={handleInputChange} type="email" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="email" />
                            </div>

                            <div class="mb-4">
                                <label className="form-label block text-xl">Password</label>
                                <input onChange={handleInputChange} type="password" class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2" name="password" />
                            </div>
                            <div className="roles">
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="agentReq" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Show “Agents Requests” to this member?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="agentReq" type="checkbox" value="1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="selfApplied" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Show “Self Applied” to this member?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="selfApplied" type="checkbox" value="2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="plannedInterviews" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Show “Planned Interviews” to this member?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="plannedInterviews" type="checkbox" value="4" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="ourMaids" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Show “Our Maids” to this member?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="ourMaids" type="checkbox" value="8" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="addMaid" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Can “Add Maid”?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="addMaid" type="checkbox" value="16" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="canAddStaff" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Can Add or Delete Staff?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="canAddStaff" type="checkbox" value="32" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="canEditMaid" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Can Edit Maid?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="canEditMaid" type="checkbox" value="64" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div style={{borderBottom:".5px solid #C3D0D4"}} class="flex items-center justify-between gap-2 mb-4">
                                        <label htmlFor="canAccessOnAccounts" class="mb-2 text-sm md:text-base font-medium text-[#434146]">Have Access On Accounts or Maid History?</label>
                                        <input  onChange={handleCheckboxChange} name="roles[]" id="canAccessOnAccounts" type="checkbox" value="128" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div>
                                <div class="mb-4">
                                    <button type="submit" className="w-full flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                                        {spinningLoader && <img className="w-8" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                        {!spinningLoader && "Add to System"}
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

export default AddStaffForm;
