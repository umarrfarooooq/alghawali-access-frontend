import React, { useEffect, useState } from "react";
import StaffProfile from "../Staff-Profiles/Staff-Profiles";
import AddStaffForm from "../Add-Staff/Add-Staff";
import Backdrop from "../UI/Backdrop";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  
const AllStaff = () =>{
    const {verifyToken} = VerifyStaffToken();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [staffData, setStaffData] = useState([])

    useEffect(() => {
        const fetchStaffData = async () => {
          try {
            const response = await axiosInstense.get("api/v1/staff",
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            setStaffData(response.data);
          } catch (error) {
            console.error("Error fetching maid data:", error);
          }
        };
    
        fetchStaffData();
      }, [isFormVisible, staffData]);

    const toggleFormVisibility = () => {
      setIsFormVisible(prevState => !prevState);
    };

    const filteredStaffData = staffData.filter((staff) => staff.email !== 'jitan@alghawalimanpower.com');
    const staffCount = filteredStaffData.length;

    return(
        <>
        {isFormVisible && <Backdrop showBackdrop={true} />}
            <div className="md:ml-[20rem] md:px-8 px-4">
            <div className="relative">
                {isFormVisible && (
                        <aside className="absolute z-[20] right-0 -mt-8">
                        <AddStaffForm onCloseForm={toggleFormVisibility} />
                        </aside>
                )}
            <div className="maidsCount flex items-center justify-between my-4">
                    <span className="text-xl font-bold hidden sm:inline-block">
                        All Staff {staffCount}
                    </span>
                    <div>
                        <div className="maidActions flex items-center gap-2">
                            <div className="markHired p-4 text-[#fff] bg-[#107243] rounded-lg text-base">
                                <button className="flex items-center justify-center gap-1 outline-none border-none" onClick={toggleFormVisibility}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 12H5" stroke="#FFFBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 5V19" stroke="#FFFBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                    Add New Staff
                                </button>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="staffProfiles mt-2">
                <div>
                    <div className="w-full border border-solid p-6">
                    {filteredStaffData.map((staff) => (
                        <StaffProfile key={staff._id} staff={staff} />
                    ))}
                    </div>
                </div>
                </div>
            </div>
            
            </div>
        </>
    )
}

export default AllStaff;