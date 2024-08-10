import { VerifyStaffToken } from "../Auth/VerifyToken";
import Modal from "../UI/Modal";
import { Grow } from "@mui/material";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const AgentRequestProfile = ({ profile, updateAgentRequestData }) => {
  const { verifyToken } = VerifyStaffToken();
  const [openActions, setOpenActions] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const toggleApproveModal = () => {
    setApproveModal((prevState) => !prevState);
  };
  const toggleDeclineModal = () => {
    setDeclineModal((prevState) => !prevState);
  };
  const myActionRef = useRef(null);
  const toggleActionBox = () => {
    setOpenActions(!openActions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myActionRef.current && !myActionRef.current.contains(event.target)) {
        setOpenActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myActionRef]);

  const handleApprove = async () => {
    try {
      const response = await axiosInstance.put(
        `api/v1/agentRegister/approve/${profile._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Approved successfully:", response.data.message);
        updateAgentRequestData({ ...profile, status: "approved" });
        toggleApproveModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axiosInstance.put(
        `api/v1/agentRegister/decline/${profile._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Declined successfully:", response.data.message);
        updateAgentRequestData({ ...profile, status: "declined" });
        toggleDeclineModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profileCard bg-[#FFFBFA] rounded-lg relative border border-solid p-4 mb-4 shadow-md">
      <Modal
        noIcon={true}
        name={profile.name}
        modalTxt={`Are you sure you want to Accept ${profile.name}`}
        modalAction={handleApprove}
        showModal={approveModal}
        toggleModal={toggleApproveModal}
      />
      <Modal
        noIcon={true}
        name={profile.name}
        modalTxt={`Are you sure you want to Decline ${profile.name}`}
        modalAction={handleDecline}
        showModal={declineModal}
        toggleModal={toggleDeclineModal}
      />
      {profile.status === "pending" && (
        <div
          onClick={toggleActionBox}
          className="absolute right-4 flex flex-col items-end gap-3 hover:bg-[#F2F2F2] active:bg-[#d3d3d3] transition-all cursor-pointer p-2 rounded-full"
        >
          <EllipsisVertical />
        </div>
      )}

      <Grow in={openActions}>
        <div
          ref={myActionRef}
          className={`${
            openActions ? "flex" : "hidden"
          } transition-all border-solid border shadow-lg editAndDelSvg absolute right-8 top-12  flex-col items-end gap-3 bg-[#FFFBFA] z-10 p-3 rounded-xl`}
        >
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={toggleApproveModal}
              className="hiringBtn block w-full"
            >
              <div className="py-1 px-2 flex items-center justify-center bg-[#28bb760c] hover:bg-[#28bb7611] transition-all cursor-pointer border text-[#0C8B3F] border-[#0C8B3F] w-full rounded-md">
                <span>Approve</span>
              </div>
            </button>
            <button
              onClick={toggleDeclineModal}
              className="hiringBtn block w-full"
            >
              <div className="py-1 px-2 flex items-center justify-center bg-[#cd24240c] hover:bg-[#cd242411] transition-all cursor-pointer border text-[#CD2424] border-[#CD2424] w-full rounded-md">
                <span>Decline</span>
              </div>
            </button>
          </div>
        </div>
      </Grow>

      <div className="maidName text-lg font-bold">{profile.name}</div>
      <div className="overflow-x-auto w-full">
        <div className="maidDetails overflow-y-auto max-w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 overflow-x-auto gap-y-4 gap-x-8 mt-4">
            <div className="nationality ">
              <div className="text-xs">Email</div>
              <div className="text-sm font-semibold">{profile.email}</div>
            </div>
            <div className="religion ">
              <div className="text-xs">Nationality</div>
              <div className="text-sm font-semibold">{profile.nationality}</div>
            </div>
            <div className="religion ">
              <div className="text-xs">Phone Number</div>
              <div className="text-sm font-semibold">{profile.number}</div>
            </div>
            <div className="religion ">
              <div className="text-xs">ID Front</div>
              <div className="text-sm font-semibold underline cursor-pointer">
                <a
                  target="_blank"
                  href={`${import.meta.env.VITE_API_URL}${profile.idCardFront}`}
                >
                  view id front copy
                </a>
              </div>
            </div>
            <div className="religion ">
              <div className="text-xs">ID Back</div>
              <div className="text-sm font-semibold underline cursor-pointer">
                <a
                  target="_blank"
                  href={`${import.meta.env.VITE_API_URL}${profile.idCardFront}`}
                >
                  view id back copy
                </a>
              </div>
            </div>
            <div className="religion ">
              <div className="text-xs">Status</div>
              <div
                className={`text-sm font-semibold ${
                  profile.status === "pending"
                    ? "text-[#031D92]"
                    : profile.status === "approved"
                    ? "text-[#0C8B3F]"
                    : "text-[#CD2424]"
                }`}
              >
                {profile.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRequestProfile;
