import React, { useState } from "react";
import ExtensionHistory from "./Extension-History";
import Modal from "../UI/Modal";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import UpdateOrExtendVisaForm from "./Update-And-Extend-Visa";
import Backdrop from "../UI/Backdrop";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

const VisaProfile = ({visa}) =>{
    const {verifyToken} = VerifyStaffToken();
    const [historyOpen, setHistoryOpen] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showEditExtendForm, setShowEditExtendForm] = useState(false)
   
    const toggleHistoryBox = () =>{
        setHistoryOpen(!historyOpen)
    }

    const toggleFormVisibility = () => {
        setShowEditExtendForm(prevState => !prevState);
    }

    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString('en-US', options);
    };
    const calculateVisaDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const diffInMs = Math.abs(end - start);
    
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
    
        return `${months}.${(remainingDays / 30 * 10).toFixed()} Months (${days} days)`;
    };
    const calculateRemainingDays = (endDate) => {
        const end = new Date(endDate);
        const today = new Date();
    
        const diffInMs = end - today;
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
        if (days < 0) {
            const lateDays = Math.abs(days);
            return `${lateDays} Days Late`;
        } else if (days === 0) {
            return 'last day';
        }
    
        return `${days} Days`;
    };
    const toggleModal = () => {
        setShowModal(prevState => !prevState);
      };
      const handleVisaDelete = async () =>{
        try {
            const response = await axiosInstense.delete(`api/v1/visa/${visa._id}`,
            {
                headers: {
                Authorization:
                `Bearer ${verifyToken}`,
                },
            }
            );
            window.location.href = "/visa"
    
        } catch (error) {
            console.error("Error deleting maid:", error);
        }
    }
    const handleUpdateStatus = async () => {
        try {
    
            const response = await axiosInstense.put(`api/v1/visa/hiring-status/${visa._id}`,
            {
                headers: {
                Authorization:
                `Bearer ${verifyToken}`,
                },
            }
            );
            window.location.href = "/visa"
        } catch (error) {
            console.error("Error Updating Status:", error);
        }
    }

    const remainingDays = calculateRemainingDays(visa.visaEndTime);
    let textColor = '#000';
    if (remainingDays.includes('Days Late')) {
        textColor = '#FFD700'; 
      } else {
        const days = parseInt(remainingDays);
        if (days < 4) {
          textColor = '#FF0000'; 
        } else if (days < 10) {
          textColor = '#FFA500';
        }
      }

    const extensionHistory = visa.extensionHistory;
    return(

        <>
        {showEditExtendForm && <Backdrop showBackdrop={true} />}
            <div className="profileCard bg-[#FFFBFA] rounded-lg relative border border-solid p-4 mb-4 shadow-md">
            {showEditExtendForm && (
                    <aside className="absolute z-[20] right-0 -mt-8">
                    <UpdateOrExtendVisaForm visaValueData={visa} onCloseForm={toggleFormVisibility} />
                    </aside>
            )}
            <div className="editAndDelSvg absolute right-4 flex flex-col items-end gap-3">
                                    <div className="flex items-center gap-2">
                                        <div onClick={handleUpdateStatus} className="hiringBtn">
                                        {visa.hiringStatus ? <div className="py-3 px-4 flex items-center justify-center bg-[#28bb761a] transition-all cursor-pointer border text-[#0C8B3F] border-[#0C8B3F] w-full rounded-lg">
                                            <span>List Again</span>
                                        </div> : <div className="py-3 px-4 flex items-center justify-center bg-[#28bb761a] transition-all cursor-pointer border text-[#0C8B3F] border-[#0C8B3F] w-full rounded-lg">
                                            <span>Hired</span>
                                        </div>}
                                        
                                        </div>
                                        <div className="downloadVisaDetails cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.5533 16.506C12.483 16.5829 12.3975 16.6442 12.3022 16.6862C12.2069 16.7282 12.1039 16.7499 11.9998 16.7499C11.8957 16.7499 11.7927 16.7282 11.6974 16.6862C11.6021 16.6442 11.5166 16.5829 11.4463 16.506L7.4463 12.131C7.3121 11.9841 7.24177 11.7898 7.25077 11.5911C7.25977 11.3923 7.34737 11.2052 7.4943 11.071C7.64123 10.9368 7.83545 10.8665 8.03424 10.8755C8.23303 10.8845 8.4201 10.9721 8.5543 11.119L11.2503 14.069V3C11.2503 2.80109 11.3293 2.61032 11.47 2.46967C11.6106 2.32902 11.8014 2.25 12.0003 2.25C12.1992 2.25 12.39 2.32902 12.5306 2.46967C12.6713 2.61032 12.7503 2.80109 12.7503 3V14.068L15.4473 11.118C15.5816 10.9712 15.7688 10.8838 15.9676 10.875C16.1664 10.8662 16.3605 10.9367 16.5073 11.071C16.6541 11.2053 16.7415 11.3925 16.7503 11.5913C16.7591 11.7901 16.6886 11.9842 16.5543 12.131L12.5533 16.506Z" fill="#262F32"/>
  <path d="M3.75 15C3.75 14.8011 3.67098 14.6103 3.53033 14.4697C3.38968 14.329 3.19891 14.25 3 14.25C2.80109 14.25 2.61032 14.329 2.46967 14.4697C2.32902 14.6103 2.25 14.8011 2.25 15V15.055C2.25 16.422 2.25 17.525 2.367 18.392C2.487 19.292 2.747 20.05 3.348 20.652C3.95 21.254 4.708 21.512 5.608 21.634C6.475 21.75 7.578 21.75 8.945 21.75H15.055C16.422 21.75 17.525 21.75 18.392 21.634C19.292 21.512 20.05 21.254 20.652 20.652C21.254 20.05 21.512 19.292 21.634 18.392C21.75 17.525 21.75 16.422 21.75 15.055V15C21.75 14.8011 21.671 14.6103 21.5303 14.4697C21.3897 14.329 21.1989 14.25 21 14.25C20.8011 14.25 20.6103 14.329 20.4697 14.4697C20.329 14.6103 20.25 14.8011 20.25 15C20.25 16.435 20.248 17.436 20.147 18.192C20.048 18.926 19.867 19.314 19.591 19.591C19.314 19.868 18.926 20.048 18.191 20.147C17.436 20.248 16.435 20.25 15 20.25H9C7.565 20.25 6.563 20.248 5.808 20.147C5.074 20.048 4.686 19.867 4.409 19.591C4.132 19.314 3.952 18.926 3.853 18.191C3.752 17.436 3.75 16.435 3.75 15Z" fill="#262F32"/>
                                        </svg>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div onClick={toggleFormVisibility} className="editVisa">
                                    <div className="py-3 px-4 flex items-center justify-center hover:bg-[#0c8b3f2a] transition-all cursor-pointer border text-[#0C8B3F] border-[#0C8B3F] w-full rounded-lg">
                                        <span>Extend</span>
                                    </div>
                                    </div>
                                    <Modal modalAction={handleVisaDelete} showModal={showModal} toggleModal={toggleModal}/>
                                    <div onClick={toggleModal} className="deleteVisa cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M9.17 4.5005C9.3766 3.91496 9.75974 3.40793 10.2666 3.04929C10.7735 2.69064 11.3791 2.49805 12 2.49805C12.6209 2.49805 13.2265 2.69064 13.7334 3.04929C14.2403 3.40793 14.6234 3.91496 14.83 4.5005M20.5 6.5005H3.5M18.833 9.0005L18.373 15.9005C18.196 18.5545 18.108 19.8815 17.243 20.6905C16.378 21.5005 15.047 21.5005 12.387 21.5005H11.613C8.953 21.5005 7.622 21.5005 6.757 20.6905C5.892 19.8815 5.803 18.5545 5.627 15.9005L5.167 9.0005M9.5 11.5005L10 16.5005M14.5 11.5005L14 16.5005" stroke="#CD2424" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                        </div>
                                    </div>
                        </div>
                <div className="block lg:flex lg:items-start gap-4 ">
                
                    <div className="profileLeftSide">
                        <div className="maidImage">
                        {visa.maidImage ? <img
                            className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                            src={`${import.meta.env.VITE_API_URL}${visa.maidImage}`}
                            /> : <div className="w-full sm:w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top bg-slate-300 animate-pulse"></div>}
                            
                        </div>
                    </div>
                    <div className="profileRightSide">

                        <div className="maidName text-lg font-bold">
                            {visa.maidName}
                        </div>
                        <div className="overflow-x-auto w-full">
                            <div className="maidDetails overflow-y-auto max-w-full">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                                    <div className="nationality ">
                                        <div className="text-xs">Entry To Oman</div>
                                        <div className="text-sm font-semibold">{formatDate(visa.dateEntry)}</div>
                                    </div>
                                    <div className="religion ">
                                        <div className="text-xs">Visa Time</div>
                                        <div className="text-sm font-semibold">{calculateVisaDuration(visa.dateEntry, visa.visaEndTime)}</div>
                                    </div>
                                    <div className="maritalStatus ">
                                        <div className="text-xs">Remaining Days</div>
                                        {visa.hiringStatus ? <div className="text-sm text font-semibold text-[#0C8B3F]">
                                            Pause (Hired)
                                        </div> : <div className="text-sm font-semibold" style={{ color: textColor }}>
                                            {remainingDays} <span className="text-black">({formatDate(visa.visaEndTime)})</span>
                                        </div>}
                                        
                                    </div>
                                    {visa.passportNo && <div className="passportNo">
                                        <div className="text-xs">Passport No</div>
                                        <div className="text-sm font-semibold">{visa.passportNo}</div>
                                    </div>}
                                    
                                    <div className="childrens ">
                                        <div className="text-xs">Extended</div>
                                        <div className="text-sm font-semibold flex items-center gap-1">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                <circle cx="4.25" cy="4" r="4" fill="#0C8B3F"/>
                                                </svg>
                                            </span>
                                            {visa.extendedTime} <span className="text-xs font-normal">(Times)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={toggleHistoryBox} className="extensionHistoryAction cursor-pointer flex items-center justify-between my-4">
                    <div className="inline-block">
                            <div className="ctaBtn flex items-center justify-center text-sm font-semibold cursor-pointer text-[#262F32]">
                                Extension History (extended) {visa.extendedTime}
                            </div>
                    </div>
                    <div className="mr-[20%]">
                        <span className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M17 10L12 15L7 10" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                    </div>
                </div>
                
                {historyOpen && <div className="extensionHistory  mt-6">
                    <div className="historyBoxes bg-[#F2F2F2] p-4 rounded-lg">
                        {extensionHistory.map(history => (
                            <ExtensionHistory key={history._id} history={history} calculateRemainingDays={calculateRemainingDays} formatDate={formatDate} calculateVisaDuration={calculateVisaDuration} />
                        ))}

                    </div>
                </div>}
            </div>
        </>
    )
}

export default VisaProfile;