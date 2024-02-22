import React, { useEffect, useState } from "react";
import RequirementsTable from "./Requirement-Table";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
  
const AllRequirementsTable = () => {
    const {verifyToken} = VerifyStaffToken();
    const [requirementsData, setRequirementsData]  = useState([])


    useEffect(() => {
        const fetchRequirementsData = async () => {
          try {
            const response = await axiosInstense.get("api/v1/customRequirements",
              {
                headers: {
                  Authorization:
                  `Bearer ${verifyToken}`,
                },
              }
            );
            setRequirementsData(response.data);
          } catch (error) {
            console.error("Error fetching maid data:", error);
          }
        };
    
        fetchRequirementsData();
      }, [requirementsData]);
    return (
        <>
            <div className="md:ml-[20rem] md:px-8 px-4">
            <div className="w-full border rounded-3xl border-solid p-6 flex flex-col gap-3">
                    {requirementsData.map((requirementsData) => (
                        <RequirementsTable key={requirementsData._id} requirementsData={requirementsData}/>
                    ))}
                
            </div>
            </div>
        </>
    )
}

export default AllRequirementsTable;