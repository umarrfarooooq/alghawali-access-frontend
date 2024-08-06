import React from "react";
import { Link } from "react-router-dom";

const RequestProfile = ({ maid }) => {
  return (
    <>
      <div className="profileCard bg-[#FFFBFA] rounded-lg border border-solid p-4 mb-4 block lg:flex lg:items-start gap-4 shadow-md">
        <div className="profileLeftSide md:min-w-[8rem]">
          <div className="maidImage">
            <img
              className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
              src={`${import.meta.env.VITE_API_URL}${maid.maidImage}`}
            />
          </div>
          <Link
            to={`/maid-request-detais/${maid._id}`}
            className="hidden lg:inline-block"
          >
            <div className="ctaBtn border flex items-center justify-center border-[#107243] p-3 text-sm mt-4 font-semibold cursor-pointer rounded-2xl text-[#107243]">
              See Profile
            </div>
          </Link>
        </div>
        <div className="profileRightSide w-full">
          <div className="maidName text-lg font-bold">{maid.maidName}</div>
          <div className="overflow-x-auto w-full">
            <div className="maidDetails flex flex-col gap-3 overflow-y-auto max-w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                <div className="religion">
                  <div className="text-xs">Religion</div>
                  <div className="text-sm font-semibold">{maid.religion}</div>
                </div>
                <div className="maritalStatus">
                  <div className="text-xs">Marital Status</div>
                  <div className="text-sm font-semibold">
                    {maid.maritalStatus}
                  </div>
                </div>
                {maid.maritalStatus !== "Single" && (
                  <div className="childrens">
                    <div className="text-xs">Childrens</div>
                    <div className="text-sm font-semibold">
                      {maid.numberOfChildren}
                    </div>
                  </div>
                )}

                <div className="Languages">
                  <div className="text-xs">Education</div>
                  <div className="text-sm font-semibold">{maid.education}</div>
                </div>
                <div className="Languages">
                  <div className="text-xs">Languages</div>
                  <div className="text-sm font-semibold">
                    {maid.languages.join(", ")}
                  </div>
                </div>
                <div className="status">
                  <div className="text-xs">Status</div>
                  <div
                    className={`text-sm font-semibold ${
                      maid.status === "pending"
                        ? "text-[#031D92]"
                        : maid.status === "approved"
                        ? "text-[#0C8B3F]"
                        : "text-[#CD2424]"
                    }`}
                  >
                    {maid.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={`/maid-request-detais/${maid._id}`}
            className="lg:hidden block"
          >
            <div className="ctaBtn border flex items-center justify-center border-[#107243] p-3 text-sm mt-4 font-semibold cursor-pointer rounded-2xl text-[#107243]">
              See Profile
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RequestProfile;
