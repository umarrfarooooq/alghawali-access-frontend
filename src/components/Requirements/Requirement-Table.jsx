import React, { useState } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
const RequirementsTable = ({requirementsData}) => {
    const [showModal, setShowModal] = useState(false);
    const {verifyToken} = VerifyStaffToken();

    const handleRequirementDelete = async () =>{
        try {
            const response = await axiosInstense.delete(`api/v1/customRequirements/${requirementsData._id}`,
            {
                headers: {
                    Authorization: `Bearer ${verifyToken}`,
                },
            }
            );
            window.location.href = "/custom-requirements"
    
        } catch (error) {
            console.error("Error deleting requirement:", error);
        }
    }
    const handleRequirementMarkDone = async () =>{
        try {
            const response = await axiosInstense.put(
                `api/v1/customRequirements/mark-done/${requirementsData._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${verifyToken}`,
                    },
                }
            );
            window.location.href = "/custom-requirements"
    
        } catch (error) {
            console.error("Error mark done requirement:", error);
        }
    }


    const toggleModal = () => {
        setShowModal(prevState => !prevState);
      };

    return(
        <>
            <div className="requirementTable p-3 rounded-xl border border-[#C3D0D4] bg-[#FFFBFA]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8">
                                    <div className="name">
                                        <div className="text-xs">Cos. Name</div>
                                        <div className="text-sm font-semibold">{requirementsData.name}</div>
                                    </div>
                                    <div className="number">
                                        <div className="text-xs">Cos. Number</div>
                                        <div className="text-sm font-semibold">{requirementsData.phoneNumber}</div>
                                    </div>
                                    <div className="nationality">
                                        <div className="text-xs">Nationality</div>
                                        <div className="text-sm font-semibold">{requirementsData.nationality}</div>
                                    </div>
                                    <div className="Category">
                                        <div className="text-xs">Category</div>
                                        <div className="text-sm font-semibold">{requirementsData.category}</div>
                                    </div>
                                    <div className="religion">
                                        <div className="text-xs">Religion</div>
                                        <div className="text-sm font-semibold">{requirementsData.religion}</div>
                                    </div>
                                    <div className="maritalStatus">
                                        <div className="text-xs">Marital Status</div>
                                        <div className="text-sm font-semibold">{requirementsData.maritalStatus}</div>
                                    </div>
                                    <div className="maritalStatus">
                                        <div className="text-xs">Experience</div>
                                        <div className="text-sm font-semibold">{requirementsData.experience}</div>
                                    </div>
                                    
                                    <div className="Languages">
                                        <div className="text-xs">Languages</div>
                                        <div className="text-sm font-semibold">{requirementsData.languages.join(', ')}</div>
                                    </div>
                                    <div className="actionBtns flex gap-2">
                                    <Modal  modalAction={handleRequirementDelete} name={requirementsData.name} showModal={showModal} toggleModal={toggleModal}/>
                                        <div onClick={ requirementsData.pendingStatus === "pending" ? handleRequirementMarkDone : null} className={`text-xs ${requirementsData.pendingStatus === "pending" ? "cursor-pointer bg-[#0C8B3F]" : "cursor-not-allowed bg-[#575757]"} w-fit h-fit p-3  bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-all rounded-3xl`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M2.75 8.75016L6.25014 12.2503L13.2504 4.75" stroke="#0C8B3F" stroke-width="1.50006" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        <div onClick={toggleModal} className="text-sm cursor-pointer font-semibold w-fit h-fit p-3 bg-[#CD2424] bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-all rounded-3xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M18 18L6 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 18L18 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                        </div>
                                    </div>
                                    
                </div>
            </div>
        </>
    )
}

export default RequirementsTable;