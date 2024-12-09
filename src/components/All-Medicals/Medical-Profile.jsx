import { Grow } from "@mui/material";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  XCircle,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import UpdateMedicalStatus from "./Update-Medical-Status";
import Backdrop from "../UI/Backdrop";

const MedicalProfile = ({ medical, onRefresh }) => {
  const [openMedicalStatusDropdown, setOpenMedicalStatusDropdown] =
    useState(false);
  const [openUpdateMedicalStatusForm, setOpenUpdateMedicalStatusForm] =
    useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const myActionRef = useRef(null);
  const toggleMedicalStatusDropdown = () => {
    setOpenMedicalStatusDropdown(!openMedicalStatusDropdown);
  };

  const toggleUpdateMedicalStatusForm = () => {
    setOpenUpdateMedicalStatusForm(!openUpdateMedicalStatusForm);
  };

  const handleStatusUpdate = (status) => {
    setUpdatedStatus(status);
    setOpenMedicalStatusDropdown(false);
    setOpenUpdateMedicalStatusForm(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myActionRef.current && !myActionRef.current.contains(event.target)) {
        setOpenMedicalStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myActionRef]);

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(inputDate).toLocaleDateString("en-US", options);
  };

  return (
    <>
      {openUpdateMedicalStatusForm && <Backdrop showBackdrop={true} />}
      <div className="profileCard bg-[#FFFBFA] w-full rounded-lg relative border border-solid p-4 mb-4 shadow-md">
        {openUpdateMedicalStatusForm && (
          <Grow in={openUpdateMedicalStatusForm}>
            <aside className="absolute z-[20] w-full md:w-auto right-0">
              <UpdateMedicalStatus
                medicalValueData={medical}
                updatedStatus={updatedStatus}
                onCloseForm={toggleUpdateMedicalStatusForm}
                onSuccess={() => {
                  toggleUpdateMedicalStatusForm();
                  onRefresh();
                }}
              />
            </aside>
          </Grow>
        )}
        <div className="profileRightSide">
          <div className="maidName text-lg font-bold">{medical.maidName}</div>
          <div className="w-full">
            <div className="maidDetails max-w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-8 mt-4">
                <div className="nationality ">
                  <div className="text-xs">Entry Date</div>
                  <div className="text-sm font-semibold">
                    {formatDate(medical.entryDate)}
                  </div>
                </div>
                {medical.passportNo && (
                  <div className="passportNo">
                    <div className="text-xs">Passport No</div>
                    <div className="text-sm font-semibold">
                      {medical.passportNo}
                    </div>
                  </div>
                )}
                <div
                  onClick={toggleMedicalStatusDropdown}
                  className="medicalStatus relative"
                >
                  <div className="text-xs">Medical Status</div>
                  <div className="text-sm font-semibold flex items-center gap-1 cursor-pointer">
                    {medical.medicalStatus === "in process" ? (
                      <span className="text-blue-600">In Process</span>
                    ) : medical.medicalStatus === "done" ? (
                      <span className="text-green-600">Done</span>
                    ) : medical.medicalStatus === "unfit" ? (
                      <span className="text-red-600">Unfit</span>
                    ) : medical.medicalStatus === "proceed to moh" ? (
                      <span className="text-yellow-600">Proceed to MOH</span>
                    ) : (
                      <span className="text-gray-600">To Be Done</span>
                    )}
                    <span className="text-xs">
                      <ChevronDown size={16} />
                    </span>
                  </div>
                  {openMedicalStatusDropdown && (
                    <Grow in={openMedicalStatusDropdown}>
                      <div
                        ref={myActionRef}
                        className="medicalStatusDropdown z-20 absolute border border-solid top-5 left-0 w-full bg-[#F2F5FF] shadow-md p-2 rounded-md"
                      >
                        <div className="medicalStatusDropdownItem flex flex-col gap-2">
                          <div
                            onClick={() => handleStatusUpdate("in process")}
                            className="text-sm font-semibold cursor-pointer hover:bg-blue-100 p-2 rounded flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-blue-600">In Process</span>
                          </div>
                          <div
                            onClick={() => handleStatusUpdate("proceed to moh")}
                            className="text-sm font-semibold cursor-pointer hover:bg-yellow-100 p-2 rounded flex items-center gap-2"
                          >
                            <ArrowRight className="w-4 h-4 text-yellow-500" />
                            <span className="text-yellow-600">MOH</span>
                          </div>
                          <div
                            onClick={() => handleStatusUpdate("done")}
                            className="text-sm font-semibold cursor-pointer hover:bg-green-100 p-2 rounded flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-600">Done</span>
                          </div>
                          <div
                            onClick={() => handleStatusUpdate("unfit")}
                            className="text-sm font-semibold cursor-pointer hover:bg-red-100 p-2 rounded flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-600">Unfit</span>
                          </div>
                        </div>
                      </div>
                    </Grow>
                  )}
                </div>

                {medical.medicalDate && (
                  <div className="medicalDate">
                    <div className="text-xs">Medical Date</div>
                    <div className="text-sm font-semibold">
                      {formatDate(medical.medicalDate)}
                    </div>
                  </div>
                )}
                {medical.medicalFile && (
                  <div className="medicalFile">
                    <div className="text-xs">Medical File</div>
                    <div className="text-sm font-semibold">
                      <a
                        href={`${import.meta.env.VITE_API_URL}${
                          medical.medicalFile
                        }`}
                        target="_blank"
                      >
                        View File
                      </a>
                    </div>
                  </div>
                )}
                {medical.mohFile && (
                  <div className="mohFile">
                    <div className="text-xs">MOH File</div>
                    <div className="text-sm font-semibold">
                      <a
                        href={`${import.meta.env.VITE_API_URL}${
                          medical.mohFile
                        }`}
                        target="_blank"
                      >
                        View File
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalProfile;
