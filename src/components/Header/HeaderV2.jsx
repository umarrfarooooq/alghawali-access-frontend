import React from "react";
import Logo from "../sidebar/logo.svg";
import Avatar from "../../assets/avatar.png";

const HeaderV2 = () => {
  return (
    <>
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-between p-4 md:p-6 gap-4 bg-[#253061] rounded-xl text-[#FFFBFA]">
          <div>
            <img
              src={Logo}
              alt="company logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="text-lg md:text-3xl font-bold text-center">Al Ghawali Admin Panel</div>
          <div>
            <img
              src={Avatar}
              alt="company logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderV2;
