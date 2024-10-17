import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import EditMaidForm from "../Add-Maid/Edit-Maid";
import ListAgainForm from "../Hirings/List-Again-form";
import MaidHistoryCard from "./Maid-History";
import MarkHiredForm from "../Hirings/Mark-as-hired-form";
import Backdrop from "../UI/Backdrop";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import roles from "../roles/roles";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import UpdateCostumerForm from "../Hirings/Update-Costumer-form";
import UpdatePaymentForm from "../Hirings/Update-Payment-form";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const MaidDetailComponent = () => {
  const { roles: userRoles, verifyToken } = VerifyStaffToken();
  const { maidID } = useParams();
  const [maidDetails, setMaidDetails] = useState(null);
  const [maidHistory, setMaidHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isHiredFormVisible, setIsHiredFormVisible] = useState(false);
  const [isListAgainFormVisible, setIsListAgainFormVisible] = useState(false);
  const [isUpdateCostumerFormVisible, setIsUpdateCostumerFormVisible] =
    useState(false);
  const [isUpdatePaymentFormVisible, setIsUpdatePaymentFormVisible] =
    useState(false);
  const [activeTab, setActiveTab] = useState("profileInfo");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const hiringAllowed = false;
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMaidData = async () => {
      try {
        const response = await axiosInstense.get("api/v1/maids/" + maidID, {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        setMaidDetails(response.data);
      } catch (error) {
        console.error("Error fetching maids:", error);
      }
    };

    fetchMaidData();
  }, [maidID, isFormVisible, isHiredFormVisible, isListAgainFormVisible]);

  useEffect(() => {
    const fetchMaidHistory = async () => {
      try {
        const response = await axiosInstense.get(
          "api/v1/maids/maid-history/" + maidID,
          {
            headers: {
              Authorization: `Bearer ${verifyToken}`,
            },
          }
        );
        setMaidHistory(response.data);
      } catch (error) {
        console.error("Error fetching maids:", error);
      }
    };

    fetchMaidHistory();
  }, [
    maidID,
    activeTab,
    isUpdateCostumerFormVisible,
    isUpdatePaymentFormVisible,
  ]);

  const handleDeleteMaid = async () => {
    try {
      const response = await axiosInstense.delete(
        `api/v1/maids/delete/${maidDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );
      window.location.href = "/maids";
    } catch (error) {
      console.error("Error deleting maid:", error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };
  const toggleHiredFormVisibility = () => {
    setIsHiredFormVisible((prevState) => !prevState);
  };
  const toggleListAgainFormVisibility = () => {
    setIsListAgainFormVisible((prevState) => !prevState);
  };
  const toggleUpdateCostumerFormVisibility = (customerId) => {
    setSelectedCustomerId(customerId);
    setIsUpdateCostumerFormVisible((prevState) => !prevState);
  };
  const toggleUpdatePaymentFormVisibility = (customerId) => {
    setSelectedCustomerId(customerId);
    setIsUpdatePaymentFormVisible((prevState) => !prevState);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      {isFormVisible && <Backdrop showBackdrop={true} />}
      {isHiredFormVisible && <Backdrop showBackdrop={true} />}
      {isListAgainFormVisible && <Backdrop showBackdrop={true} />}
      {isUpdateCostumerFormVisible && <Backdrop showBackdrop={true} />}
      {isUpdatePaymentFormVisible && <Backdrop showBackdrop={true} />}

      {maidDetails && (
        <div className="md:ml-[20rem] md:px-8 px-4 relative">
          <Modal
            name={maidDetails.name}
            modalAction={handleDeleteMaid}
            showModal={showModal}
            toggleModal={toggleModal}
          />
          {isFormVisible && (
            <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
              <EditMaidForm
                maidDetails={maidDetails}
                onCloseForm={toggleFormVisibility}
              />
            </aside>
          )}
          {isHiredFormVisible && hiringAllowed && (
            <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
              <MarkHiredForm onCloseForm={toggleHiredFormVisibility} />
            </aside>
          )}
          {isListAgainFormVisible && hiringAllowed && (
            <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
              <ListAgainForm
                costumerDetails={maidHistory}
                onCloseForm={toggleListAgainFormVisibility}
              />
            </aside>
          )}
          {isUpdateCostumerFormVisible && (
            <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
              {maidHistory.map((customer) => {
                if (customer._id === selectedCustomerId) {
                  return (
                    <UpdateCostumerForm
                      key={customer._id}
                      costumerDetails={customer}
                      onCloseForm={toggleUpdateCostumerFormVisibility}
                    />
                  );
                }
                return null;
              })}
            </aside>
          )}
          {isUpdatePaymentFormVisible && (
            <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
              {maidHistory.map((customer) => {
                if (customer._id === selectedCustomerId) {
                  return (
                    <UpdatePaymentForm
                      key={customer._id}
                      costumerDetails={customer}
                      onCloseForm={toggleUpdatePaymentFormVisibility}
                    />
                  );
                }
                return null;
              })}
            </aside>
          )}

          <div className="bg-[#F2F5FF] overflow-auto min-h-screen max-h-full">
            {userRoles.includes(roles.canAccessOnAccounts) && (
              <div>
                <div className="bg-[#E3E3E3] rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                  <div
                    onClick={() => handleTabClick("profileInfo")}
                    className={`${
                      activeTab === "profileInfo"
                        ? "bg-[#FFFBFA] , shadow-md"
                        : ""
                    } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 17.7497C12.1989 17.7497 12.3896 17.6707 12.5303 17.53C12.6709 17.3894 12.7499 17.1986 12.7499 16.9997V10.9999C12.7499 10.801 12.6709 10.6102 12.5303 10.4696C12.3896 10.3289 12.1989 10.2499 12 10.2499C11.8011 10.2499 11.6103 10.3289 11.4697 10.4696C11.329 10.6102 11.25 10.801 11.25 10.9999V16.9997C11.25 17.4137 11.586 17.7497 12 17.7497ZM12 7C12.2652 7 12.5195 7.10535 12.7071 7.29288C12.8946 7.48042 12.9999 7.73476 12.9999 7.99997C12.9999 8.26518 12.8946 8.51952 12.7071 8.70705C12.5195 8.89459 12.2652 8.99994 12 8.99994C11.7348 8.99994 11.4804 8.89459 11.2929 8.70705C11.1054 8.51952 11 8.26518 11 7.99997C11 7.73476 11.1054 7.48042 11.2929 7.29288C11.4804 7.10535 11.7348 7 12 7Z"
                          fill="#434146"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.25 11.9997C1.25 6.06285 6.06285 1.25 11.9997 1.25C17.9365 1.25 22.7493 6.06285 22.7493 11.9997C22.7493 17.9365 17.9365 22.7493 11.9997 22.7493C6.06285 22.7493 1.25 17.9365 1.25 11.9997ZM11.9997 2.74995C9.54649 2.74995 7.19379 3.72448 5.45913 5.45913C3.72448 7.19379 2.74995 9.54649 2.74995 11.9997C2.74995 14.4529 3.72448 16.8056 5.45913 18.5402C7.19379 20.2749 9.54649 21.2494 11.9997 21.2494C14.4529 21.2494 16.8056 20.2749 18.5402 18.5402C20.2749 16.8056 21.2494 14.4529 21.2494 11.9997C21.2494 9.54649 20.2749 7.19379 18.5402 5.45913C16.8056 3.72448 14.4529 2.74995 11.9997 2.74995Z"
                          fill="#434146"
                        />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">Profile Info</span>
                  </div>
                  <div
                    onClick={() => handleTabClick("profileHistory")}
                    className={`${
                      activeTab === "profileHistory"
                        ? "bg-[#FFFBFA]  shadow-md"
                        : ""
                    } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.07914 5.06894C8.87402 1.27905 15.0438 1.31905 18.8617 5.13793C22.6816 8.95782 22.7216 15.1306 18.9257 18.9255C15.1308 22.7204 8.95802 22.6814 5.13814 18.8615C4.06367 17.7915 3.25184 16.487 2.76638 15.0504C2.28093 13.6138 2.13506 12.0842 2.34022 10.5818C2.36714 10.3846 2.47129 10.2062 2.62975 10.0858C2.78821 9.96538 2.98801 9.91287 3.18519 9.93979C3.38238 9.9667 3.56079 10.0709 3.68118 10.2293C3.80158 10.3878 3.85409 10.5876 3.82718 10.7848C3.65302 12.058 3.77649 13.3543 4.18787 14.5718C4.59926 15.7893 5.28735 16.8949 6.1981 17.8015C9.443 21.0454 14.6658 21.0644 17.8657 17.8655C21.0646 14.6656 21.0457 9.4428 17.8017 6.1979C14.5588 2.956 9.33901 2.935 6.1391 6.1299L6.88708 6.1329C6.98557 6.13336 7.083 6.15322 7.17382 6.19133C7.26463 6.22945 7.34705 6.28507 7.41637 6.35504C7.48569 6.42501 7.54054 6.50794 7.57781 6.59911C7.61508 6.69028 7.63402 6.78789 7.63356 6.88638C7.6331 6.98487 7.61325 7.0823 7.57513 7.17312C7.53702 7.26393 7.48139 7.34635 7.41142 7.41567C7.34145 7.48499 7.25852 7.53984 7.16735 7.57711C7.07618 7.61437 6.97857 7.63332 6.88008 7.63286L4.33416 7.62086C4.13647 7.6198 3.94718 7.54074 3.80748 7.40085C3.66779 7.26096 3.58897 7.07158 3.58818 6.87388L3.57518 4.32996C3.57466 4.23147 3.59354 4.13384 3.63074 4.04265C3.66795 3.95146 3.72275 3.86849 3.79202 3.79847C3.86129 3.72846 3.94367 3.67278 4.03446 3.6346C4.12525 3.59643 4.22267 3.57651 4.32116 3.57598C4.41965 3.57546 4.51728 3.59433 4.60847 3.63154C4.69966 3.66874 4.78263 3.72355 4.85265 3.79282C4.92266 3.86209 4.97834 3.94447 5.01652 4.03526C5.05469 4.12605 5.07461 4.22347 5.07514 4.32196L5.07914 5.06994V5.06894ZM11.9989 7.24887C12.1978 7.24887 12.3886 7.32788 12.5292 7.46853C12.6699 7.60918 12.7489 7.79994 12.7489 7.99885V11.6887L15.0298 13.9687C15.1015 14.0378 15.1587 14.1205 15.198 14.212C15.2374 14.3035 15.2581 14.4019 15.259 14.5015C15.2599 14.6011 15.241 14.6998 15.2033 14.792C15.1657 14.8842 15.11 14.968 15.0396 15.0384C14.9692 15.1089 14.8855 15.1646 14.7934 15.2024C14.7012 15.2401 14.6025 15.2591 14.5029 15.2583C14.4033 15.2575 14.3049 15.2368 14.2134 15.1976C14.1219 15.1583 14.0391 15.1012 13.9699 15.0296L11.2499 12.3097V7.99985C11.2499 7.80094 11.329 7.61018 11.4696 7.46953C11.6103 7.32888 11.801 7.24987 11.9999 7.24987L11.9989 7.24887Z"
                          fill="#434146"
                        />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base">
                      Profile History
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profileInfo" && (
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
                    {maidDetails.name}
                  </span>
                  <div>
                    <div className="maidActions flex items-center gap-2">
                      {userRoles.includes(roles.canAccessOnAccounts) &&
                        hiringAllowed && (
                          <div>
                            {maidDetails.isHired ||
                            maidDetails.isMonthlyHired ? (
                              <div
                                onClick={toggleListAgainFormVisibility}
                                className="cursor-pointer listHired p-4 text-[#262F32] bg-[#EBEBEB] border border-solid rounded-2xl text-xs"
                              >
                                <button>List Again</button>
                              </div>
                            ) : (
                              <div
                                onClick={toggleHiredFormVisibility}
                                className="cursor-pointer markHired p-4 text-[#0C8B3F] bg-[#28BB761A] rounded-2xl text-xs"
                              >
                                <button>Mark as Hired</button>
                              </div>
                            )}
                          </div>
                        )}

                      <a
                        href={`${import.meta.env.VITE_API_URL}cv/pdf/${
                          maidDetails._id
                        }`}
                      >
                        <div className="cursor-pointer cvDownload p-3 bg-[#EBEBEB] rounded-2xl">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12.5533 16.506C12.483 16.5829 12.3975 16.6442 12.3022 16.6862C12.2069 16.7282 12.1039 16.7499 11.9998 16.7499C11.8957 16.7499 11.7927 16.7282 11.6974 16.6862C11.6021 16.6442 11.5166 16.5829 11.4463 16.506L7.4463 12.131C7.3121 11.9841 7.24177 11.7898 7.25077 11.5911C7.25977 11.3923 7.34737 11.2052 7.4943 11.071C7.64123 10.9368 7.83545 10.8665 8.03424 10.8755C8.23303 10.8845 8.4201 10.9721 8.5543 11.119L11.2503 14.069V3C11.2503 2.80109 11.3293 2.61032 11.47 2.46967C11.6106 2.32902 11.8014 2.25 12.0003 2.25C12.1992 2.25 12.39 2.32902 12.5306 2.46967C12.6713 2.61032 12.7503 2.80109 12.7503 3V14.068L15.4473 11.118C15.5816 10.9712 15.7688 10.8838 15.9676 10.875C16.1664 10.8662 16.3605 10.9367 16.5073 11.071C16.6541 11.2053 16.7415 11.3925 16.7503 11.5913C16.7591 11.7901 16.6886 11.9842 16.5543 12.131L12.5533 16.506Z"
                                fill="#262F32"
                              />
                              <path
                                d="M3.75 15C3.75 14.8011 3.67098 14.6103 3.53033 14.4697C3.38968 14.329 3.19891 14.25 3 14.25C2.80109 14.25 2.61032 14.329 2.46967 14.4697C2.32902 14.6103 2.25 14.8011 2.25 15V15.055C2.25 16.422 2.25 17.525 2.367 18.392C2.487 19.292 2.747 20.05 3.348 20.652C3.95 21.254 4.708 21.512 5.608 21.634C6.475 21.75 7.578 21.75 8.945 21.75H15.055C16.422 21.75 17.525 21.75 18.392 21.634C19.292 21.512 20.05 21.254 20.652 20.652C21.254 20.05 21.512 19.292 21.634 18.392C21.75 17.525 21.75 16.422 21.75 15.055V15C21.75 14.8011 21.671 14.6103 21.5303 14.4697C21.3897 14.329 21.1989 14.25 21 14.25C20.8011 14.25 20.6103 14.329 20.4697 14.4697C20.329 14.6103 20.25 14.8011 20.25 15C20.25 16.435 20.248 17.436 20.147 18.192C20.048 18.926 19.867 19.314 19.591 19.591C19.314 19.868 18.926 20.048 18.191 20.147C17.436 20.248 16.435 20.25 15 20.25H9C7.565 20.25 6.563 20.248 5.808 20.147C5.074 20.048 4.686 19.867 4.409 19.591C4.132 19.314 3.952 18.926 3.853 18.191C3.752 17.436 3.75 16.435 3.75 15Z"
                                fill="#262F32"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      {userRoles.includes(roles.CanEditMaid) && (
                        <div
                          className="editMaid cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl"
                          onClick={toggleFormVisibility}
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                            >
                              <path
                                d="M21 9.5V11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1H12.5"
                                stroke="#262F32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M15.6527 2.45512L16.3017 1.80612C16.8181 1.28988 17.5184 0.999906 18.2485 1C18.9787 1.00009 19.6789 1.29024 20.1952 1.80662C20.7114 2.323 21.0014 3.0233 21.0013 3.75347C21.0012 4.48365 20.7111 5.18388 20.1947 5.70012L19.5447 6.34912C19.5447 6.34912 18.1667 6.26812 16.9507 5.05112C15.7337 3.83512 15.6527 2.45612 15.6527 2.45612L9.68767 8.42012C9.28367 8.82412 9.08167 9.02612 8.90767 9.24912C8.70267 9.51112 8.52767 9.79612 8.38367 10.0971C8.26267 10.3521 8.17267 10.6231 7.99167 11.1651L7.41267 12.9001M7.41267 12.9001L7.03867 14.0221C6.99469 14.153 6.98808 14.2935 7.01959 14.4279C7.0511 14.5623 7.11948 14.6853 7.21705 14.7829C7.31461 14.8806 7.43749 14.9491 7.57186 14.9808C7.70623 15.0124 7.84677 15.006 7.97767 14.9621L9.10067 14.5881M7.41267 12.9001L9.10067 14.5881M19.5457 6.34812L13.5807 12.3131C13.1767 12.7171 12.9747 12.9191 12.7517 13.0931C12.4889 13.2981 12.2045 13.4738 11.9037 13.6171C11.6487 13.7381 11.3777 13.8281 10.8357 14.0091L9.10067 14.5881"
                                stroke="#262F32"
                                stroke-width="1.5"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                      {userRoles.includes(roles.ShowOurMaid) && (
                        <div
                          onClick={toggleModal}
                          className="deleteMaid cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9.17 4.0005C9.3766 3.41496 9.75974 2.90793 10.2666 2.54929C10.7735 2.19064 11.3791 1.99805 12 1.99805C12.6209 1.99805 13.2265 2.19064 13.7334 2.54929C14.2403 2.90793 14.6234 3.41496 14.83 4.0005M20.5 6.0005H3.5M18.833 8.5005L18.373 15.4005C18.196 18.0545 18.108 19.3815 17.243 20.1905C16.378 21.0005 15.047 21.0005 12.387 21.0005H11.613C8.953 21.0005 7.622 21.0005 6.757 20.1905C5.892 19.3815 5.803 18.0545 5.627 15.4005L5.167 8.5005M9.5 11.0005L10 16.0005M14.5 11.0005L14 16.0005"
                                stroke="#CD2424"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="maidsProfiles mt-2">
                  <div>
                    <div className="w-full border border-solid bg-white rounded-lg p-6">
                      <div className="profileCard border border-solid rounded-lg p-4 mb-4 block lg:flex lg:items-start gap-4">
                        <div className="profileLeftSide">
                          <div className="maidImage">
                            {maidDetails.maidImg &&
                            maidDetails.maidImg.includes("uploads/") ? (
                              <img
                                className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                                src={`${import.meta.env.VITE_API_URL}${
                                  maidDetails.maidImg
                                }`}
                              />
                            ) : (
                              <img
                                className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                                src={`https://res.cloudinary.com/dtcz2zuev/image/upload/${maidDetails.maidImg}`}
                              />
                            )}{" "}
                          </div>
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
                                  <div className="text-sm font-semibold">
                                    {maidDetails.nationality}
                                  </div>
                                </div>
                                <div className="religion">
                                  <div className="text-xs">Religion</div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.religion}
                                  </div>
                                </div>
                                <div className="maritalStatus">
                                  <div className="text-xs">Marital Status</div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.maritalStatus}
                                  </div>
                                </div>
                                <div className="childrens">
                                  <div className="text-xs">Childrens</div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.childrens}
                                  </div>
                                </div>
                                <div className="age">
                                  <div className="text-xs">Age</div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.age} Years Old
                                  </div>
                                </div>
                                <div className="Languages">
                                  <div className="text-xs">Languages</div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.languages.join(", ")}
                                  </div>
                                </div>
                                <div className="Salary">
                                  <div className="text-xs">Salary</div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.salery}
                                  </div>
                                </div>
                                <div className="MaidCode">
                                  <div className="text-xs">
                                    Maid Tracking Code
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.code}
                                  </div>
                                </div>
                                <div className="whoAdd">
                                  <div className="text-xs">
                                    Added to System By
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {maidDetails.addedBy
                                      ? maidDetails.addedBy
                                      : "Admin"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-8">
                        <div className="maidImages overflow-x-auto">
                          <div className="flex items-center gap-8 flex-shrink-0 justify-between">
                            {maidDetails.maidImg2 && (
                              <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                <img
                                  className="w-full rounded-lg h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                  src={`${import.meta.env.VITE_API_URL}${
                                    maidDetails.maidImg2
                                  }`}
                                />
                              </div>
                            )}
                            {maidDetails.maidImg3 && (
                              <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                <img
                                  className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                  src={`${import.meta.env.VITE_API_URL}${
                                    maidDetails.maidImg3
                                  }`}
                                />
                              </div>
                            )}
                            {maidDetails.maidImg4 && (
                              <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                <img
                                  className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                  src={`${import.meta.env.VITE_API_URL}${
                                    maidDetails.maidImg4
                                  }`}
                                />
                              </div>
                            )}
                            {maidDetails.videoLink && (
                              <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                                <video
                                  controls
                                  className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                >
                                  <source
                                    src={`${import.meta.env.VITE_API_URL}${
                                      maidDetails.videoLink
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
                      <div className="remarks bg-[#F2F2F2] rounded-lg p-2">
                        <div className="flex sm:flex-row flex-col items-center gap-4">
                          <div className="remarksHeading text-center w-full sm:w-auto p-2 rounded-lg bg-[#FFFBFA]">
                            <p>Admin Remarks</p>
                          </div>
                          <div className="actualRemarks">
                            <p>{maidDetails.remarks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {maidHistory &&
              maidHistory.length > 0 &&
              activeTab === "profileHistory" && (
                <div>
                  {maidHistory
                    .slice()
                    .reverse()
                    .map((maidHistoryDetails) => (
                      <div key={maidHistoryDetails._id}>
                        <MaidHistoryCard
                          onClick={() =>
                            toggleUpdateCostumerFormVisibility(
                              maidHistoryDetails._id
                            )
                          }
                          paymentForm={() =>
                            toggleUpdatePaymentFormVisibility(
                              maidHistoryDetails._id
                            )
                          }
                          maidHistoryDetails={maidHistoryDetails}
                        />
                      </div>
                    ))}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default MaidDetailComponent;
