import React from "react";

const ProfileSkeletonCard = () => {
  return (
    <div className="rounded-lg relative border border-solid p-4 mb-4 block lg:flex lg:items-start gap-4 shadow-md animate-pulse">
      <div className="profileLeftSide">
        <div className="maidImage">
          <div className="w-[18rem] bg-gray-300 h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md"></div>
        </div>
      </div>
      <div className="profileRightSide">
        <div className="maidName bg-gray-300 text-lg font-bold h-6 w-40 mb-4"></div>
        <div className="overflow-x-auto w-full">
          <div className="maidDetails overflow-y-auto max-w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8 mt-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="nationality flex flex-col gap-3">
                  <div className="h-4 w-24 text-xs bg-gray-300 rounded-md"></div>
                  <div className="h-4 w-24 text-sm rounded-md font-semibold bg-gray-400"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeletonCard;
