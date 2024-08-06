import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const RequestDetails = () => {
  const { maidID } = useParams();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [maid, setMaid] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMaidDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/agentMaids/request/${maidID}`
        );

        setMaid(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMaidDetails();
  }, [maidID, showAcceptModal, showRejectModal]);

  const toggleRejectModal = () => {
    setShowRejectModal((prevState) => !prevState);
  };
  const toggleAcceptModal = () => {
    setShowAcceptModal((prevState) => !prevState);
  };
  const handleAcceptMaid = async () => {
    try {
      const response = await axiosInstance.put(
        `api/v1/agentMaids/update-request-status/${maid._id}`,
        { status: "approved" }
      );
      console.log("Accept Response:", response.data);
      toggleAcceptModal();
    } catch (error) {
      console.error("Error accepting maid request:", error);
    }
  };

  const handleRejectMaid = async () => {
    try {
      const response = await axiosInstance.put(
        `api/v1/agentMaids/update-request-status/${maid._id}`,
        { status: "rejected" }
      );
      console.log("Reject Response:", response.data);
      toggleRejectModal();
    } catch (error) {
      console.error("Error rejecting maid request:", error);
    }
  };

  return (
    <>
      {maid && (
        <div className="md:ml-[20rem] md:px-8 px-4 relative overflow-auto">
          <Modal
            noIcon={true}
            name={maid.maidName}
            modalTxt={`Are you sure you want to Reject ${maid.maidName}`}
            modalAction={handleRejectMaid}
            showModal={showRejectModal}
            toggleModal={toggleRejectModal}
          />
          <Modal
            name={maid.maidName}
            noIcon={true}
            modalTxt={`Are you sure you want to Accept ${maid.maidName}`}
            modalAction={handleAcceptMaid}
            showModal={showAcceptModal}
            toggleModal={toggleAcceptModal}
          />
          <div>
            <div className="maidsCount flex md:items-center md:justify-between flex-col md:flex-row my-4">
              <span className="text-xl font-bold md:flex items-center justify-start gap-3">
                <div
                  onClick={() => navigate(-1)}
                  className="bg-[#fff] w-fit cursor-pointer p-3 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 5L5 12L12 19"
                      stroke="#262F32"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 12L5 12"
                      stroke="#262F32"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                {maid.maidName}
              </span>
              <div>
                {maid.status !== "pending" && (
                  <div className="border border-[#434146] flex items-center gap-2 markHired py-3 px-4 text-[#434146] rounded-lg text-xs">
                    <span>
                      {maid.status === "approved" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.75 8.75003L6.25002 12.25L13.2501 4.75"
                            stroke="#434146"
                            stroke-width="1.50001"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M12.0003 4L4 12.0003"
                            stroke="#434146"
                            stroke-width="1.33339"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4 4L12.0003 12.0003"
                            stroke="#434146"
                            stroke-width="1.33339"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <button className="sm:inline-block hidden cursor-default">
                      {maid.status.toUpperCase()}
                    </button>
                  </div>
                )}
                {maid.status === "pending" && (
                  <div className="flex items-center gap-4">
                    <div
                      className="actionRejected w-max"
                      onClick={toggleRejectModal}
                    >
                      <div className="cursor-pointer border border-[#434146] flex items-center gap-2 markHired py-3 px-4 text-[#434146] rounded-lg text-xs">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12.0003 4L4 12.0003"
                              stroke="#434146"
                              stroke-width="1.33339"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4 4L12.0003 12.0003"
                              stroke="#434146"
                              stroke-width="1.33339"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        <button className="sm:inline-block hidden">
                          Reject Request
                        </button>
                      </div>
                    </div>
                    <div
                      className="actionAccept w-max"
                      onClick={toggleAcceptModal}
                    >
                      <div className="cursor-pointer border border-[#0C8B3F] flex items-center gap-2 markHired py-3 px-4 text-[#0C8B3F] bg-[#28BB761A] rounded-lg text-xs">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M2.75 8.75003L6.25002 12.25L13.2501 4.75"
                              stroke="#0C8B3F"
                              stroke-width="1.50001"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        <button className="sm:inline-block hidden">
                          Accept Request
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="maidsProfiles mt-2">
              <div>
                <div className="w-full border border-solid bg-white rounded-lg p-6">
                  <div className="profileCard border border-solid rounded-lg p-4 mb-4 block lg:flex lg:items-start gap-4">
                    <div className="profileLeftSide">
                      <div className="maidImage">
                        <div className="maidImage">
                          <img
                            className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                            src={`${import.meta.env.VITE_API_URL}${
                              maid.maidImage
                            }`}
                            alt="Maid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profileRightSide">
                      <div className="maidName text-lg font-bold">
                        {maid.maidName}
                      </div>
                      <div className="overflow-x-auto w-full">
                        <div className="maidDetails overflow-y-auto max-w-full">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                            <div className="religion">
                              <div className="text-xs">Religion</div>
                              <div className="text-sm font-semibold">
                                {maid.religion}
                              </div>
                            </div>
                            <div className="maritalStatus">
                              <div className="text-xs">Marital Status</div>
                              <div className="text-sm font-semibold">
                                {maid.maritalStatus}
                              </div>
                            </div>
                            <div className="childrens">
                              <div className="text-xs">Childrens</div>
                              <div className="text-sm font-semibold">
                                {maid.numberOfChildren}
                              </div>
                            </div>
                            <div className="education">
                              <div className="text-xs">Education</div>
                              <div className="text-sm font-semibold">
                                {maid.education}
                              </div>
                            </div>
                            <div className="experience">
                              <div className="text-xs">Experience</div>
                              <div className="text-sm font-semibold">
                                {maid.experience
                                  ? `${maid.experience.years} Years from ${maid.experience.country}`
                                  : "New"}
                              </div>
                            </div>
                            <div className="Languages">
                              <div className="text-xs">Languages</div>
                              <div className="text-sm font-semibold">
                                {maid.languages.join(", ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-8">
                    <div className="maidImages overflow-x-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start overflow-x-auto">
                        {maid.maidPassportFront && (
                          <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                            <img
                              className="w-full rounded-lg min-h-[13rem] md:min-h-[21rem] md:w-full p-2 object-cover object-top"
                              src={`${import.meta.env.VITE_API_URL}${
                                maid.maidPassportFront
                              }`}
                            />
                          </div>
                        )}
                        {maid.maidPassportBack && (
                          <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                            <img
                              className="w-full min-h-[13rem] md:min-h-[21rem] md:w-full p-2 object-cover object-top"
                              src={`${import.meta.env.VITE_API_URL}${
                                maid.maidPassportBack
                              }`}
                            />
                          </div>
                        )}
                        {maid.maidVideo && (
                          <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                            <video
                              controls
                              className="w-full min-h-[13rem] md:min-h-[21rem] md:w-full p-2 object-contain"
                            >
                              <source
                                src={`${import.meta.env.VITE_API_URL}${
                                  maid.maidVideo
                                }`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestDetails;
