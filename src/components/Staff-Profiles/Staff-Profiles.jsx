import React, { useState } from "react";
import Modal from "../UI/Modal";
import EditStaffForm from "../Add-Staff/Edit-Staff";
import Backdrop from "../UI/Backdrop";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import Avatar from "../../assets/avatarStaff.jpg"
const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

  

const StaffProfile = ({staff}) =>{
    const {verifyToken} = VerifyStaffToken();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
    }

    const handleStaffDelete = async () =>{
        try {
            const response = await axiosInstense.delete(`api/v1/staff/${staff._id}`,
            {
                headers: {
                Authorization:
                `Bearer ${verifyToken}`,
                },
            }
            );
            window.location.href = "/staff"
    
        } catch (error) {
            console.error("Error deleting maid:", error);
        }
    }

    const toggleModal = () => {
      setShowModal(prevState => !prevState);
    };
    const truncatedPassword = staff.password && staff.password.length > 10 ? `${staff.password.slice(0, 10)}...` : staff.password;

    return(
        <>
            {isFormVisible && <Backdrop showBackdrop={true} />}
            <div className="StaffCard bg-[#FFFBFA] rounded-xl border border-solid p-4 mb-4 block lg:flex lg:items-start gap-4 shadow-md">
            {isFormVisible && (
                    <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
                    <EditStaffForm staffValueData={staff} onCloseForm={toggleFormVisibility} />
                    </aside>
            )}
                <div className="staffLeftSide">
                    <div className="maidImage">
                        <img className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top" src={Avatar}/>
                    </div>
                </div>
                <div className="staffRightSide w-full">
                    <div className="staffName text-lg font-bold">
                        {staff.fullName}
                    </div>
                    <div className="overflow-x-auto w-full">
                        <div className="staffDetails overflow-y-auto max-w-full">
                            <div className="flex flex-col md:flex-row items-center justify-between overflow-x-auto gap-y-4 gap-x-8 mt-4">
                                <div className="dashboardId w-full">
                                    <div className="text-xs">Dashboard Id</div>
                                    <div className="text-sm font-semibold">{staff.email || staff.phoneNumber}</div>
                                </div>
                                <div className="password w-full">
                                    <div className="text-xs">Password</div>
                                    <div className="text-sm font-semibold">{truncatedPassword}</div>
                                </div>
                                <div className="editAndDelSvg flex items-center gap-4">
                                <Modal modalAction={handleStaffDelete} name={staff.fullName} showModal={showModal} toggleModal={toggleModal}/>
                                    <div onClick={toggleFormVisibility} className="editStaffDetails cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
    <path d="M21 10V11.5C21 16.214 21 18.571 19.535 20.035C18.072 21.5 15.714 21.5 11 21.5C6.286 21.5 3.929 21.5 2.464 20.035C1 18.572 1 16.214 1 11.5C1 6.786 1 4.429 2.464 2.964C3.93 1.5 6.286 1.5 11 1.5H12.5" stroke="#031D92" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M15.6527 2.95512L16.3017 2.30612C16.8181 1.78988 17.5184 1.49991 18.2485 1.5C18.9787 1.50009 19.6789 1.79024 20.1952 2.30662C20.7114 2.823 21.0014 3.5233 21.0013 4.25347C21.0012 4.98365 20.7111 5.68388 20.1947 6.20012L19.5447 6.84912C19.5447 6.84912 18.1667 6.76812 16.9507 5.55112C15.7337 4.33512 15.6527 2.95612 15.6527 2.95612L9.68767 8.92012C9.28367 9.32412 9.08167 9.52612 8.90767 9.74912C8.70267 10.0111 8.52767 10.2961 8.38367 10.5971C8.26267 10.8521 8.17267 11.1231 7.99167 11.6651L7.41267 13.4001M7.41267 13.4001L7.03867 14.5221C6.99469 14.653 6.98808 14.7935 7.01959 14.9279C7.0511 15.0623 7.11948 15.1853 7.21705 15.2829C7.31461 15.3806 7.43749 15.4491 7.57186 15.4808C7.70623 15.5124 7.84677 15.506 7.97767 15.4621L9.10067 15.0881M7.41267 13.4001L9.10067 15.0881M19.5457 6.84812L13.5807 12.8131C13.1767 13.2171 12.9747 13.4191 12.7517 13.5931C12.4889 13.7981 12.2045 13.9738 11.9037 14.1171C11.6487 14.2381 11.3777 14.3281 10.8357 14.5091L9.10067 15.0881" stroke="#031D92" stroke-width="1.5"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div onClick={toggleModal} className="deleteStaff cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M9.17 4.5005C9.3766 3.91496 9.75974 3.40793 10.2666 3.04929C10.7735 2.69064 11.3791 2.49805 12 2.49805C12.6209 2.49805 13.2265 2.69064 13.7334 3.04929C14.2403 3.40793 14.6234 3.91496 14.83 4.5005M20.5 6.5005H3.5M18.833 9.0005L18.373 15.9005C18.196 18.5545 18.108 19.8815 17.243 20.6905C16.378 21.5005 15.047 21.5005 12.387 21.5005H11.613C8.953 21.5005 7.622 21.5005 6.757 20.6905C5.892 19.8815 5.803 18.5545 5.627 15.9005L5.167 9.0005M9.5 11.5005L10 16.5005M14.5 11.5005L14 16.5005" stroke="#CD2424" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffProfile;