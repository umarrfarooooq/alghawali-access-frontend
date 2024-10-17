import React, { useEffect, useState } from "react";
import HomeCard2 from "./HomeCard2";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import Skeleton from "@mui/material/Skeleton";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import roles from "../roles/roles";
const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const HomePageCompo = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [allAccountData, setAllAccountData] = useState([]);
  const [maidsInfo, setMaidsInfo] = useState([]);
  const [staffAccountDetails, setStaffAccountDetails] = useState([]);
  const { verifyToken, roles: userRoles } = VerifyStaffToken();
  const showAccountDetails = false;
  useEffect(() => {
    const fetchAccountHistory = async () => {
      try {
        const response = await axiosInstense.get("api/v1/maids/hirings/all/", {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching maids:", error);
      }
    };

    fetchAccountHistory();
  }, []);

  useEffect(() => {
    const fetchMaidsInfo = async () => {
      try {
        const response = await axiosInstense.get("api/v1/maids/maidsInfo", {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        });
        setMaidsInfo(response.data);
      } catch (error) {
        console.error("Error fetching maids:", error);
      }
    };

    fetchMaidsInfo();
  }, []);

  useEffect(() => {
    const fetchStaffAccountSummary = async () => {
      try {
        const response = await axiosInstense.get(
          "api/v1/staffAccounts/all-accounts-summary",
          {
            headers: {
              Authorization: `Bearer ${verifyToken}`,
            },
          }
        );
        setStaffAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching maids:", error);
      }
    };

    fetchStaffAccountSummary();
  }, []);

  useEffect(() => {
    const fetchAllAccountData = async () => {
      try {
        const response = await axiosInstense.get(
          `api/v1/staffAccounts/all-accounts`,
          {
            headers: {
              Authorization: `Bearer ${verifyToken}`,
            },
          }
        );
        setAllAccountData(response.data);
      } catch (error) {
        console.error("Error fetching maid data:", error);
      }
    };

    fetchAllAccountData();
  }, []);


  return (
    <>
      <div className="md:ml-[20rem] md:px-8 px-4 min-h-screen max-h-full">
        <div className="relative">
          {userRoles.includes(roles.fullAccessOnAccounts) &&
            showAccountDetails && (
              <div className="accountCards mt-2">
                <div className="flex flex-col gap-y-4">
                  <p className="font-semibold text-lg md:text-lg lg:text-2xl">
                    Accounts
                  </p>
                  {accountDetails && maidsInfo ? (
                    <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 grid grid-cols-1 sm:flex items-start justify-start border border-solid p-6">
                      <HomeCard2
                        action={"balance"}
                        staffDetails={allAccountData}
                        cardTxt="Total Available Amount"
                        count={`${staffAccountDetails.totalBalance} OMR`}
                        total={maidsInfo.totalMaids}
                      />
                      <HomeCard2
                        action={"received"}
                        staffDetails={allAccountData}
                        cardTxt="Total Received Amount"
                        count={`${staffAccountDetails.totalReceived} OMR`}
                        total={maidsInfo.hiredMaids}
                      />
                      <HomeCard2
                        action={"sent"}
                        staffDetails={allAccountData}
                        svg={svg3}
                        cardTxt="Total Sended Amount"
                        count={`${staffAccountDetails.totalSent} OMR`}
                        total={maidsInfo.remainingMaids}
                      />
                    </div>
                  ) : (
                    <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 grid grid-cols-1 sm:flex items-center justify-start border border-solid p-6">
                      <Skeleton
                        variant="rounded"
                        height={184}
                        className="sm:w-[15rem] md:w-[19rem] xl:w-[22rem] w-full"
                      />
                      <Skeleton
                        variant="rounded"
                        height={184}
                        className="sm:w-[15rem] md:w-[19rem] xl:w-[22rem] w-full"
                      />
                      <Skeleton
                        variant="rounded"
                        height={184}
                        className="sm:w-[15rem] md:w-[19rem] xl:w-[22rem] w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

          {userRoles.includes(roles.ShowOurMaid) && (
            <div className="maidsProfiles mt-2">
              <div className="flex flex-col gap-y-4">
                <p className="font-semibold text-lg md:text-lg lg:text-2xl">
                  Profiles
                </p>
                {maidsInfo ? (
                  <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 grid grid-cols-1 sm:flex items-start justify-start border border-solid p-6">
                    <HomeCard2
                      details={maidsInfo.unHiredNationalityCount}
                      svg={<PeopleOutlineIcon />}
                      cardTxt="Available Maids"
                      count={maidsInfo.unhiredMaids}
                      total={maidsInfo.unhiredMaids}
                    />
                    <HomeCard2
                      details={maidsInfo.hiredNationalityCount}
                      svg={<WorkOutlineIcon />}
                      cardTxt="Hired Maids"
                      count={maidsInfo.hiredMaids}
                      total={maidsInfo.hiredMaids}
                    />
                    <HomeCard2
                      details={maidsInfo.onTrialNationalityCount}
                      cardTxt="On Trial Maids"
                      svg={<HourglassEmptyIcon />}
                      count={maidsInfo.onTrialMaids}
                      total={maidsInfo.onTrialMaids}
                    />
                    <HomeCard2
                      details={maidsInfo.monthlyHiredNationalityCount}
                      cardTxt="Monthly Hired Maids"
                      svg={<WorkOutlineIcon />}
                      count={maidsInfo.monthlyHiredMaids}
                      total={maidsInfo.monthlyHiredMaids}
                    />
                    <HomeCard2
                      details={maidsInfo.allNationalityCount}
                      cardTxt="Total Maids"
                      svg={<PeopleOutlineIcon />}
                      count={maidsInfo.totalMaids}
                      total={maidsInfo.totalMaids}
                    />
                  </div>
                ) : (
                  <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 grid grid-cols-1 sm:flex items-center justify-start border border-solid p-6">
                    <Skeleton
                      variant="rounded"
                      height={184}
                      className="sm:w-[15rem] md:w-[19rem] xl:w-[22rem] w-full"
                    />
                    <Skeleton
                      variant="rounded"
                      height={184}
                      className="sm:w-[15rem] md:w-[19rem] xl:w-[22rem] w-full"
                    />
                    <Skeleton
                      variant="rounded"
                      height={184}
                      className="sm:w-[15rem] md:w-[19rem] xl:w-[22rem] w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePageCompo;
