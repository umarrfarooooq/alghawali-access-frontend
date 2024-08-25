import React from "react";
import { Link } from "react-router-dom";

const NavCard = ({ icon, itemName, cardBg, iconBg, link }) => {
  return (
    <Link to={link ? link : ""}>
      <div
        className={`relative p-4 md:p-6 w-full h-full ${
          cardBg ? cardBg : "bg-[#FFF2F2]"
        } rounded-lg flex flex-col items-center md:items-start gap-4 transition-transform transform`}
      >
        <div
          className={`absolute inset-0 ${
            iconBg ? iconBg : "bg-black"
          } opacity-0 hover:opacity-20 rounded-lg transition-opacity`}
        ></div>

        <div
          className={`p-3 rounded-2xl ${
            iconBg ? iconBg : "bg-[#FF4646]"
          } w-max`}
        >
          {icon && icon}
        </div>
        <div className="text-sm font-bold md:text-2xl text-center md:text-justify">
          {itemName}
        </div>
      </div>
    </Link>
  );
};

export default NavCard;
