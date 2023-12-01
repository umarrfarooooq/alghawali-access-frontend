import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import EditMaidForm from "../Add-Maid/Edit-Maid";
import Backdrop from "../UI/Backdrop";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  

const MaidDetailComponent = () =>{
    const {verifyToken} = VerifyStaffToken();
    const {maidID} = useParams();
    const [maidDetails, setMaidDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchMaidData = async () => {
          try {
            const response = await axiosInstense.get(
              "api/v1/maids/" + maidID,
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            setMaidDetails(response.data);
          } catch (error) {
            console.error("Error fetching maids:", error);
          }
        };
    
        fetchMaidData();
      }, [maidID, isFormVisible]);

    const handleMarkAsHired = async () =>{
        try {
            const response = await axiosInstense.put(`api/v1/maids/availablity/${maidDetails._id}`,
              null,
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            window.location.href = "/maids"
      
          } catch (error) {
            console.error("Error marking maid as hired:", error);
          }
    }

   const handleDeleteMaid = async () =>{
        try {
            const response = await axiosInstense.delete(`api/v1/maids/delete/${maidDetails._id}`,
            {
                headers: {
                Authorization:
                `Bearer ${verifyToken}`,
                },
            }
            );
            window.location.href = "/maids"
    
        } catch (error) {
            console.error("Error deleting maid:", error);
        }
   }

    const toggleFormVisibility = () => {
      setIsFormVisible(prevState => !prevState);
    }

    const toggleModal = () => {
      setShowModal(prevState => !prevState);
    };
    return(
        <>
            {isFormVisible && <Backdrop showBackdrop={true} />}


            {maidDetails && 
            
                <div className="md:ml-[20rem] md:px-8 px-4 relative">
                <Modal name={maidDetails.name} modalAction={handleDeleteMaid} showModal={showModal} toggleModal={toggleModal}/>
                {isFormVisible && (
                        <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
                            <EditMaidForm maidDetails={maidDetails} onCloseForm={toggleFormVisibility} />
                        </aside>
                    )}
                <div>
                <div className="maidsCount flex items-center justify-between my-4">
                    <span className="text-xl font-bold hidden md:inline-block">
                        {maidDetails.name}
                    </span>
                    <div>
                        <div className="maidActions flex items-center gap-2">
                            {maidDetails.isHired ? <div onClick={handleMarkAsHired} className="cursor-pointer listHired p-4 text-[#262F32] bg-[#EBEBEB] border border-solid rounded-2xl text-xs">
                                <button>List Again</button>
                            </div> : 
                            <div onClick={handleMarkAsHired} className="cursor-pointer markHired p-4 text-[#0C8B3F] bg-[#28BB761A] rounded-2xl text-xs">
                                <button>Mark as Hired</button>
                            </div>
                            }
                            
                            <a href={`${import.meta.env.VITE_API_URL}cv/pdf/${maidDetails._id}`}>
                                <div className="cursor-pointer cvDownload p-3 bg-[#EBEBEB] rounded-2xl">
                                    <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12.5533 16.506C12.483 16.5829 12.3975 16.6442 12.3022 16.6862C12.2069 16.7282 12.1039 16.7499 11.9998 16.7499C11.8957 16.7499 11.7927 16.7282 11.6974 16.6862C11.6021 16.6442 11.5166 16.5829 11.4463 16.506L7.4463 12.131C7.3121 11.9841 7.24177 11.7898 7.25077 11.5911C7.25977 11.3923 7.34737 11.2052 7.4943 11.071C7.64123 10.9368 7.83545 10.8665 8.03424 10.8755C8.23303 10.8845 8.4201 10.9721 8.5543 11.119L11.2503 14.069V3C11.2503 2.80109 11.3293 2.61032 11.47 2.46967C11.6106 2.32902 11.8014 2.25 12.0003 2.25C12.1992 2.25 12.39 2.32902 12.5306 2.46967C12.6713 2.61032 12.7503 2.80109 12.7503 3V14.068L15.4473 11.118C15.5816 10.9712 15.7688 10.8838 15.9676 10.875C16.1664 10.8662 16.3605 10.9367 16.5073 11.071C16.6541 11.2053 16.7415 11.3925 16.7503 11.5913C16.7591 11.7901 16.6886 11.9842 16.5543 12.131L12.5533 16.506Z" fill="#262F32"/>
                                        <path d="M3.75 15C3.75 14.8011 3.67098 14.6103 3.53033 14.4697C3.38968 14.329 3.19891 14.25 3 14.25C2.80109 14.25 2.61032 14.329 2.46967 14.4697C2.32902 14.6103 2.25 14.8011 2.25 15V15.055C2.25 16.422 2.25 17.525 2.367 18.392C2.487 19.292 2.747 20.05 3.348 20.652C3.95 21.254 4.708 21.512 5.608 21.634C6.475 21.75 7.578 21.75 8.945 21.75H15.055C16.422 21.75 17.525 21.75 18.392 21.634C19.292 21.512 20.05 21.254 20.652 20.652C21.254 20.05 21.512 19.292 21.634 18.392C21.75 17.525 21.75 16.422 21.75 15.055V15C21.75 14.8011 21.671 14.6103 21.5303 14.4697C21.3897 14.329 21.1989 14.25 21 14.25C20.8011 14.25 20.6103 14.329 20.4697 14.4697C20.329 14.6103 20.25 14.8011 20.25 15C20.25 16.435 20.248 17.436 20.147 18.192C20.048 18.926 19.867 19.314 19.591 19.591C19.314 19.868 18.926 20.048 18.191 20.147C17.436 20.248 16.435 20.25 15 20.25H9C7.565 20.25 6.563 20.248 5.808 20.147C5.074 20.048 4.686 19.867 4.409 19.591C4.132 19.314 3.952 18.926 3.853 18.191C3.752 17.436 3.75 16.435 3.75 15Z" fill="#262F32"/>
                                    </svg>
                                    </div>
                                </div>
                            </a>
                            
                            <div className="editMaid cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl"  onClick={toggleFormVisibility}>
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M21 9.5V11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1H12.5" stroke="#262F32" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M15.6527 2.45512L16.3017 1.80612C16.8181 1.28988 17.5184 0.999906 18.2485 1C18.9787 1.00009 19.6789 1.29024 20.1952 1.80662C20.7114 2.323 21.0014 3.0233 21.0013 3.75347C21.0012 4.48365 20.7111 5.18388 20.1947 5.70012L19.5447 6.34912C19.5447 6.34912 18.1667 6.26812 16.9507 5.05112C15.7337 3.83512 15.6527 2.45612 15.6527 2.45612L9.68767 8.42012C9.28367 8.82412 9.08167 9.02612 8.90767 9.24912C8.70267 9.51112 8.52767 9.79612 8.38367 10.0971C8.26267 10.3521 8.17267 10.6231 7.99167 11.1651L7.41267 12.9001M7.41267 12.9001L7.03867 14.0221C6.99469 14.153 6.98808 14.2935 7.01959 14.4279C7.0511 14.5623 7.11948 14.6853 7.21705 14.7829C7.31461 14.8806 7.43749 14.9491 7.57186 14.9808C7.70623 15.0124 7.84677 15.006 7.97767 14.9621L9.10067 14.5881M7.41267 12.9001L9.10067 14.5881M19.5457 6.34812L13.5807 12.3131C13.1767 12.7171 12.9747 12.9191 12.7517 13.0931C12.4889 13.2981 12.2045 13.4738 11.9037 13.6171C11.6487 13.7381 11.3777 13.8281 10.8357 14.0091L9.10067 14.5881" stroke="#262F32" stroke-width="1.5"/>
                                </svg>
                                </div>
                            </div>
                            <div onClick={toggleModal} className="deleteMaid cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.17 4.0005C9.3766 3.41496 9.75974 2.90793 10.2666 2.54929C10.7735 2.19064 11.3791 1.99805 12 1.99805C12.6209 1.99805 13.2265 2.19064 13.7334 2.54929C14.2403 2.90793 14.6234 3.41496 14.83 4.0005M20.5 6.0005H3.5M18.833 8.5005L18.373 15.4005C18.196 18.0545 18.108 19.3815 17.243 20.1905C16.378 21.0005 15.047 21.0005 12.387 21.0005H11.613C8.953 21.0005 7.622 21.0005 6.757 20.1905C5.892 19.3815 5.803 18.0545 5.627 15.4005L5.167 8.5005M9.5 11.0005L10 16.0005M14.5 11.0005L14 16.0005" stroke="#CD2424" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="maidsProfiles mt-2">
                <div>
                    <div className="w-full border border-solid bg-white rounded-lg p-6">
                        <div className="profileCard border border-solid rounded-lg p-4 mb-4 block lg:flex lg:items-start gap-4">
                            <div className="profileLeftSide">
                                <div className="maidImage">
                                {maidDetails.maidImg && maidDetails.maidImg.includes("uploads/") ? (
                                    <img
                                    className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                                    src={`${import.meta.env.VITE_API_URL}${maidDetails.maidImg}`}
                                    />
                                ) : (
                                    <img
                                    className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                                    src={`https://res.cloudinary.com/dtcz2zuev/image/upload/${maidDetails.maidImg}`}
                                    />
                                )}                                </div>
                            </div>
                            <div className="profileRightSide">
                                <div className="maidName text-lg font-bold">
                                    {maidDetails.name}
                                </div>
                                <div className="overflow-x-auto w-full">
                                    <div className="maidDetails overflow-y-auto max-w-full">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                                            <div className="nationality">
                                                <div className="text-xs">Nationality</div>
                                                <div className="text-sm font-semibold">{maidDetails.nationality}</div>
                                            </div>
                                            <div className="religion">
                                                <div className="text-xs">Religion</div>
                                                <div className="text-sm font-semibold">{maidDetails.religion}</div>
                                            </div>
                                            <div className="maritalStatus">
                                                <div className="text-xs">Marital Status</div>
                                                <div className="text-sm font-semibold">{maidDetails.maritalStatus}</div>
                                            </div>
                                            <div className="childrens">
                                                <div className="text-xs">Childrens</div>
                                                <div className="text-sm font-semibold">{maidDetails.childrens}</div>
                                            </div>
                                            <div className="age">
                                                <div className="text-xs" >Age</div>
                                                <div className="text-sm font-semibold">{maidDetails.age} Years Old</div>
                                            </div>
                                            <div className="Languages">
                                                <div className="text-xs">Languages</div>
                                                <div className="text-sm font-semibold">{maidDetails.languages}</div>
                                            </div>
                                            <div className="Salary">
                                                <div className="text-xs">Salary</div>
                                                <div className="text-sm font-semibold">{maidDetails.salery}</div>
                                            </div>
                                            <div className="MaidCode">
                                                <div className="text-xs">Maid Tracking Code</div>
                                                <div className="text-sm font-semibold">{maidDetails.code}</div>
                                            </div>
                                            <div className="whoAdd">
                                                <div className="text-xs">Added to System By</div>
                                                <div className="text-sm font-semibold">{maidDetails.addedBy? maidDetails.addedBy : 'Admin'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-8">
                            <div className="maidImages overflow-x-auto">
                                <div className="flex items-center gap-8 flex-shrink-0 justify-between">
                                {maidDetails.maidImg2 && <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                        <img className="w-full rounded-lg h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top" src={`${import.meta.env.VITE_API_URL}${maidDetails.maidImg2}`}/>
                                    </div>
                                }
                                {maidDetails.maidImg3 && <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                        <img className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top" src={`${import.meta.env.VITE_API_URL}${maidDetails.maidImg3}`}/>
                                    </div>
                                }
                                {maidDetails.maidImg4 && <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                        <img className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top" src={`${import.meta.env.VITE_API_URL}${maidDetails.maidImg4}`}/>
                                    </div>
                                }
                                {maidDetails.videoLink && <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                        <video
                                            controls
                                            className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                        >
                                            <source src={`${import.meta.env.VITE_API_URL}${maidDetails.videoLink}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                }
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div className="remarks bg-[#F2F2F2] rounded-lg p-2">
                            <div className="flex sm:flex-row flex-col items-center gap-4">
                                <div className="remarksHeading text-center w-full sm:w-auto p-2 rounded-lg bg-[#FFFBFA]">
                                    <p>Admin Remarks</p>
                                </div>
                                <div className="actualRemarks">
                                    <p>
                                        {maidDetails.remarks}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
            </div>
            }
            
        </>
    )
}

export default MaidDetailComponent;