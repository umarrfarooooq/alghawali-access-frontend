import React, { useEffect, useState } from "react";
import VisaProfile from "./Visa-Profile";
import Backdrop from "../UI/Backdrop";
import axios from "axios";
import AddVisaForm from "./Add-Visa-Form";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import VisaSkeletonCard from "./Visa-Profile-Skeleton";
import Grow from "@mui/material/Grow";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AllVisas = ({ searchTerm }) => {
  const { verifyToken, roles: userRoles } = VerifyStaffToken();
  const [visaData, setVisaData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("AllProfiles");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const calculateRemainingDays = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();

    const diffInMs = end - today;
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days < 0) {
      const lateDays = Math.abs(days);
      return `${lateDays} Days Over Stay`;
    } else if (days === 0) {
      return "Last Day";
    }

    return `${days} Days`;
  };
  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const response = await axiosInstense.get("api/v1/visa", {
          params: { search: searchTerm },
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        if (response.data && response.data.visas) {
          setVisaData(response.data.visas);
        }
      } catch (error) {
        console.error("Error fetching visa data:", error);
      }
    };

    fetchVisaData();
  }, [isFormVisible, searchTerm]);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  const visaDataLength = visaData.length;

  const totalOverstayedNonHiredProfiles = visaData.filter((visa) => {
    if (visa.hiringStatus) {
      return false;
    }
    const today = new Date();
    const visaEnd = new Date(visa.visaEndTime);
    return today > visaEnd;
  }).length;
  return (
    <>
      {isFormVisible && <Backdrop showBackdrop={true} />}
      <div className="md:ml-[20rem] md:px-8 px-4">
        <div className="relative">
          {isFormVisible && (
            <Grow in={isFormVisible}>
              <aside className="absolute z-[20] right-0 -mt-8 w-full sm:w-auto">
                <AddVisaForm onCloseForm={toggleFormVisibility} />
              </aside>
            </Grow>
          )}
          <div className="maidsCount flex items-center justify-between my-4">
            <span className="text-xl font-bold hidden sm:inline-block">
              All Visa {visaDataLength}
            </span>
            <div>
              <div className="maidActions flex items-center gap-2">
                <div
                  className="addMaidBtn p-4 text-[#fff] bg-[#107243] rounded-lg text-base"
                  onClick={toggleFormVisibility}
                >
                  <button className="flex items-center justify-center gap-1 outline-none border-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 12H5"
                        stroke="#FFFBFA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 5V19"
                        stroke="#FFFBFA"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Add New Visa
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="maidsProfiles mt-2 min-h-screen max-h-full">
            <div>
              <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
                <div
                  onClick={() => handleTabClick("AllProfiles")}
                  className={`${
                    activeTab === "AllProfiles"
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
                  <span className="text-sm md:text-base hidden sm:inline-block">
                    All Profiles
                  </span>
                </div>
                <div
                  onClick={() => handleTabClick("Over Stay")}
                  className={`${
                    activeTab === "Over Stay" ? "bg-[#FFFBFA] , shadow-md" : ""
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
                  <span className="text-sm md:text-base relative">
                    Over Stay
                    <div className="bg-[#107243] w-5 h-5 flex items-center justify-center absolute -top-3 -right-6 rounded-full text-white">
                      <span className="text-xs">
                        {totalOverstayedNonHiredProfiles}
                      </span>
                    </div>
                  </span>
                </div>
                <div
                  onClick={() => handleTabClick("HiredProfiles")}
                  className={`${
                    activeTab === "HiredProfiles"
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
                  <span className="text-sm md:text-base hidden sm:inline-block">
                    Hired Profiles
                  </span>
                </div>
              </div>
            </div>
            {activeTab === "AllProfiles" && (
              <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                {Array.isArray(visaData) && visaData.length > 0
                  ? visaData
                      .map((visa) => ({
                        ...visa,
                        remainingDays: calculateRemainingDays(visa.visaEndTime),
                      }))
                      .filter(
                        (visa) => !visa.remainingDays.includes("Days Over Stay")
                      )
                      .filter((visa) => !visa.hiringStatus)
                      .sort((a, b) => {
                        if (
                          a.remainingDays === "Last Day" &&
                          b.remainingDays !== "Last Day"
                        ) {
                          return -1;
                        } else if (
                          a.remainingDays !== "Last Day" &&
                          b.remainingDays === "Last Day"
                        ) {
                          return 1;
                        }
                        const remainingDaysA = parseInt(a.remainingDays);
                        const remainingDaysB = parseInt(b.remainingDays);
                        return remainingDaysA - remainingDaysB;
                      })
                      .map((visa) => <VisaProfile key={visa._id} visa={visa} />)
                  : Array.from({ length: 6 }, (_, index) => (
                      <VisaSkeletonCard key={index} />
                    ))}
              </div>
            )}
            {activeTab === "HiredProfiles" && (
              <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                {Array.isArray(visaData) && visaData.length > 0 ? (
                  visaData
                    .filter((visa) => visa.hiringStatus)
                    .map((visa) => ({
                      ...visa,
                      remainingDays: calculateRemainingDays(visa.visaEndTime),
                    }))
                    .sort((a, b) => {
                      const remainingDaysA = parseInt(a.remainingDays);
                      const remainingDaysB = parseInt(b.remainingDays);

                      if (
                        a.remainingDays.includes("Days Over Stay") &&
                        !b.remainingDays.includes("Days Over Stay")
                      ) {
                        return -1;
                      } else if (
                        !a.remainingDays.includes("Days Over Stay") &&
                        b.remainingDays.includes("Days Over Stay")
                      ) {
                        return 1;
                      } else if (
                        a.remainingDays.includes("Days Over Stay") &&
                        b.remainingDays.includes("Days Over Stay")
                      ) {
                        return (
                          parseInt(b.remainingDays) - parseInt(a.remainingDays)
                        );
                      } else {
                        return remainingDaysA - remainingDaysB;
                      }
                    })
                    .map((visa) => <VisaProfile key={visa._id} visa={visa} />)
                ) : (
                  <p>No hired visa profiles available</p>
                )}
              </div>
            )}
            {activeTab === "Over Stay" && (
              <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
                {Array.isArray(visaData) && visaData.length > 0 ? (
                  visaData
                    .filter((visa) => {
                      if (visa.hiringStatus) {
                        return false;
                      }
                      const today = new Date();
                      const visaEnd = new Date(visa.visaEndTime);
                      return today > visaEnd;
                    })
                    .sort((a, b) => {
                      const today = new Date();
                      const visaEndA = new Date(a.visaEndTime);
                      const lastExtensionA =
                        a.extensionHistory && a.extensionHistory.length > 0
                          ? a.extensionHistory[a.extensionHistory.length - 1]
                          : null;
                      const lastExtensionEndA = lastExtensionA
                        ? new Date(lastExtensionA.newVisaEndDate)
                        : visaEndA;
                      const overstayDaysA =
                        today > lastExtensionEndA
                          ? Math.floor(
                              (today - lastExtensionEndA) /
                                (1000 * 60 * 60 * 24)
                            )
                          : 0;

                      const visaEndB = new Date(b.visaEndTime);
                      const lastExtensionB =
                        b.extensionHistory && b.extensionHistory.length > 0
                          ? b.extensionHistory[b.extensionHistory.length - 1]
                          : null;
                      const lastExtensionEndB = lastExtensionB
                        ? new Date(lastExtensionB.newVisaEndDate)
                        : visaEndB;
                      const overstayDaysB =
                        today > lastExtensionEndB
                          ? Math.floor(
                              (today - lastExtensionEndB) /
                                (1000 * 60 * 60 * 24)
                            )
                          : 0;
                      return overstayDaysB - overstayDaysA;
                    })
                    .map((visa) => <VisaProfile key={visa._id} visa={visa} />)
                ) : (
                  <p>No visa data available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllVisas;
