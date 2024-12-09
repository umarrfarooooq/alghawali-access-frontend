import React, { useEffect, useState } from "react";
import MedicalProfile from "./Medical-Profile";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import {
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  ArrowRight,
  Plus,
} from "lucide-react";
import AddMedical from "./Add-Medical";
import { Grow } from "@mui/material";
import Backdrop from "../UI/Backdrop";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AllMedicals = ({ searchTerm }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { verifyToken, roles: userRoles } = VerifyStaffToken();
  const [medicalData, setMedicalData] = useState([]);
  const [activeTab, setActiveTab] = useState("To be done");
  const [loading, setLoading] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchMedicalData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstense.get("api/v1/medical", {
          params: { search: searchTerm },
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        if (response.data && response.data.medicals) {
          setMedicalData(response.data.medicals);
        }
      } catch (error) {
        console.error("Error fetching medical data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalData();
  }, [searchTerm, refreshTrigger]);

  const medicalDataLength = medicalData.length;

  return (
    <>
      {showForm && <Backdrop showBackdrop={true} />}
      <div className="md:ml-[20rem] md:px-8 px-4">
        <div className="relative">
          {showForm && (
            <Grow in={showForm}>
              <aside className="absolute z-[20] right-0 -mt-8 w-full sm:w-auto">
                <AddMedical
                  onCloseForm={toggleFormVisibility}
                  onSuccess={() => {
                    toggleFormVisibility();
                  }}
                />
              </aside>
            </Grow>
          )}
          <div className="maidsCount flex items-center justify-between my-4">
            <span className="text-xl font-bold hidden sm:inline-block">
              All Medical {medicalDataLength}
            </span>
            <div>
              <div className="maidActions flex items-center gap-2">
                <div
                  className="p-4 text-[#fff] bg-[#107243] rounded-lg text-base"
                  onClick={toggleFormVisibility}
                >
                  <button className="flex items-center justify-center gap-1 outline-none border-none">
                    <Plus className="w-4 h-4" />
                    Add New Medical
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="maidsProfiles mt-2 min-h-screen max-h-full">
            <div>
              <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 grid grid-cols-2 md:grid-cols-5">
                <div
                  onClick={() => handleTabClick("To be done")}
                  className={`${
                    activeTab === "To be done" ? "bg-[#FFFBFA] , shadow-md" : ""
                  } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                >
                  <span>
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="text-sm md:text-base">To be done</span>
                </div>
                <div
                  onClick={() => handleTabClick("MOH")}
                  className={`${
                    activeTab === "MOH" ? "bg-[#FFFBFA] , shadow-md" : ""
                  } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                >
                  <span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-sm md:text-base">MOH</span>
                </div>
                <div
                  onClick={() => handleTabClick("In Process")}
                  className={`${
                    activeTab === "In Process" ? "bg-[#FFFBFA] , shadow-md" : ""
                  } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                >
                  <span>
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="text-sm md:text-base">In Process</span>
                </div>
                <div
                  onClick={() => handleTabClick("Done")}
                  className={`${
                    activeTab === "Done" ? "bg-[#FFFBFA] , shadow-md" : ""
                  } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                >
                  <span>
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="text-sm md:text-base">Done</span>
                </div>
                <div
                  onClick={() => handleTabClick("Unfit")}
                  className={`${
                    activeTab === "Unfit" ? "bg-[#FFFBFA]  shadow-md" : ""
                  } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                >
                  <span>
                    <XCircle className="w-4 h-4" />
                  </span>
                  <span className="text-sm md:text-base">Unfit</span>
                </div>
              </div>
            </div>
            <div>
              {loading ? (
                <div className="flex justify-center items-center h-[200px]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <>
                  {activeTab === "To be done" && (
                    <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                      {Array.isArray(medicalData) && medicalData.length > 0 ? (
                        medicalData.filter(
                          (medical) => medical.medicalStatus === "to be done"
                        ).length > 0 ? (
                          medicalData
                            .filter(
                              (medical) =>
                                medical.medicalStatus === "to be done"
                            )
                            .map((medical) => (
                              <MedicalProfile
                                onRefresh={refreshData}
                                key={medical._id}
                                medical={medical}
                              />
                            ))
                        ) : (
                          <p>No medical data available</p>
                        )
                      ) : (
                        <p>No medical data available</p>
                      )}
                    </div>
                  )}
                  {activeTab === "Done" && (
                    <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                      {Array.isArray(medicalData) && medicalData.length > 0 ? (
                        medicalData.filter(
                          (medical) => medical.medicalStatus === "done"
                        ).length > 0 ? (
                          medicalData
                            .filter(
                              (medical) => medical.medicalStatus === "done"
                            )
                            .map((medical) => (
                              <MedicalProfile
                                onRefresh={refreshData}
                                key={medical._id}
                                medical={medical}
                              />
                            ))
                        ) : (
                          <p>No medical data available</p>
                        )
                      ) : (
                        <p>No medical data available</p>
                      )}
                    </div>
                  )}
                  {activeTab === "MOH" && (
                    <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                      {Array.isArray(medicalData) && medicalData.length > 0 ? (
                        medicalData.filter(
                          (medical) =>
                            medical.medicalStatus === "proceed to moh"
                        ).length > 0 ? (
                          medicalData
                            .filter(
                              (medical) =>
                                medical.medicalStatus === "proceed to moh"
                            )
                            .map((medical) => (
                              <MedicalProfile
                                onRefresh={refreshData}
                                key={medical._id}
                                medical={medical}
                              />
                            ))
                        ) : (
                          <p>No medical data available</p>
                        )
                      ) : (
                        <p>No medical data available</p>
                      )}
                    </div>
                  )}
                  {activeTab === "Unfit" && (
                    <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                      {Array.isArray(medicalData) && medicalData.length > 0 ? (
                        medicalData.filter(
                          (medical) => medical.medicalStatus === "unfit"
                        ).length > 0 ? (
                          medicalData
                            .filter(
                              (medical) => medical.medicalStatus === "unfit"
                            )
                            .map((medical) => (
                              <MedicalProfile
                                onRefresh={refreshData}
                                key={medical._id}
                                medical={medical}
                              />
                            ))
                        ) : (
                          <p>No medical data available</p>
                        )
                      ) : (
                        <p>No medical data available</p>
                      )}
                    </div>
                  )}
                  {activeTab === "In Process" && (
                    <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                      {Array.isArray(medicalData) && medicalData.length > 0 ? (
                        medicalData.filter(
                          (medical) => medical.medicalStatus === "in process"
                        ).length > 0 ? (
                          medicalData
                            .filter(
                              (medical) =>
                                medical.medicalStatus === "in process"
                            )
                            .map((medical) => (
                              <MedicalProfile
                                onRefresh={refreshData}
                                key={medical._id}
                                medical={medical}
                              />
                            ))
                        ) : (
                          <p>No medical data available</p>
                        )
                      ) : (
                        <p>No medical data available</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMedicals;
