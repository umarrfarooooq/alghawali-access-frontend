import React, { useEffect, useState } from "react";
import MaidProfile from "../Maid-Profile/Maid-Profile";
import AddMaidForm from "../Add-Maid/Add-Maid";
import Backdrop from "../UI/Backdrop";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import roles from "../roles/roles";
import ProfileSkeletonCard from "../Maid-Profile/Maid-Profile-Skeleton";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const AllMaids = ({ searchTerm }) => {
  const { verifyToken, roles: userRoles, staffId } = VerifyStaffToken();
  const [maidData, setMaidData] = useState({
    all: [], hired: [], monthlyHired: [], my: [], myNonHired: [], myMonthlyHired: []
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All Maids");
  const [itemsToLoad, setItemsToLoad] = useState({
    all: 6,
    hired: 6,
    monthlyHired: 6,
    onTrial: 6,
    my: 6,
    myNonHired: 6,
    myMonthlyHired: 6,
    myOnTrial: 6
  });

  const fetchMaids = async (endpoint, key) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(endpoint, {
        params: { search: searchTerm },
        headers: { Authorization: `Bearer ${verifyToken}` },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${key} maid data:`, error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllMaidData = async () => {
      const [all, hired, monthlyHired, onTrial, my, myNonHired, myMonthlyHired, myOnTrial] = await Promise.all([
        fetchMaids("api/v1/maids", "all"),
        fetchMaids("api/v1/maids/withHired", "hired"),
        fetchMaids("api/v1/maids/withMonthlyHired", "monthlyHired"),
        fetchMaids("api/v1/maids/onTrial", "onTrial"),
        fetchMaids(`api/v1/maids/byStaff/hired/${staffId}`, "my"),
        fetchMaids(`api/v1/maids/byStaff/non-hired/${staffId}`, "myNonHired"),
        fetchMaids(`api/v1/maids/withMonthlyHired/${staffId}`, "myMonthlyHired"),
        fetchMaids(`api/v1/maids/byStaff/onTrial/${staffId}`, "myOnTrial")
      ]);

      setMaidData({ all, hired, monthlyHired, onTrial, my, myNonHired, myMonthlyHired, myOnTrial });
    };

    fetchAllMaidData();
  }, [isFormVisible, searchTerm, staffId, verifyToken]);

  const sortedMaidData = (key) => {
    const data = maidData[key] || [];
    return [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const getCurrentItems = () => {
    let key;
    const canSeeAllMaids = userRoles.includes(roles.ShowOurMaid);
    switch (activeTab) {
      case "All Maids":
        key = "all";
        break;
      case "Hired Maids":
        key = canSeeAllMaids ? "hired" : "my";
        break;
      case "Monthly Hired":
        key = canSeeAllMaids ? "monthlyHired" : "myMonthlyHired";
        break;
      case "On Trial":
        key = canSeeAllMaids ? "onTrial" : "myOnTrial";
        break;
      case "My Maids":
        key = "myNonHired";
        break;
      default:
        key = "all";
    }
    const items = sortedMaidData(key).slice(0, itemsToLoad[key]);
    return { items, key };
  };

  const handleLoadMore = (key) => {
    setItemsToLoad(prev => ({
      ...prev,
      [key]: prev[key] + 6
    }));
  };

  const renderMaidProfiles = () => {
    const { items: currentItems, key } = getCurrentItems();
    const totalItems = maidData[key]?.length || 0;
    return (
      <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
        {loading ? (
          Array.from({ length: itemsToLoad[key] }, (_, index) => <ProfileSkeletonCard key={index} />)
        ) : currentItems.length > 0 ? (
          currentItems.map(maid => <MaidProfile key={maid._id} maid={maid} />)
        ) : (
          <p>No maids available for this category.</p>
        )}
        {!loading && itemsToLoad[key] < totalItems && (
          <button
            className="border bg-[#107243] border-[#29a167] px-6 py-3 text-sm mt-4 font-semibold cursor-pointer rounded-2xl text-[#fff]"
            onClick={() => handleLoadMore(key)}
          >
            Load More
          </button>
        )}
      </div>
    );
  };
  
  return (
    <>
      {isFormVisible && <Backdrop showBackdrop={true} />}
      <div className="md:ml-[20rem] md:px-8 px-4">
        <div className="relative">
          {isFormVisible && (
            <aside className="absolute z-[20] right-0 -mt-8">
              <AddMaidForm onCloseForm={() => setIsFormVisible(false)} />
            </aside>
          )}
          <div className="maidsCount flex items-center justify-between my-4">
            <span className="text-xl font-bold hidden sm:inline-block">
              All Maids {maidData.all.length}
            </span>
            {userRoles.includes(roles.CanAddMaid) && (
              <button
                className="p-4 text-[#fff] bg-[#107243] rounded-lg text-base flex items-center gap-1"
                onClick={() => setIsFormVisible(true)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 5V19" stroke="#FFFBFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add New Maid
              </button>
            )}
          </div>
          <div className="maidsProfiles mt-2 min-h-screen max-h-full">
            <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 md:flex grid grid-cols-2 md:flex-row md:items-center md:justify-between">
              {["All Maids", "Hired Maids", "Monthly Hired", "On Trial", "My Maids"].map(tab => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab ? "bg-[#FFFBFA] shadow-md" : ""} transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
                >
                  <span className="text-sm md:text-base">{tab}</span>
                </div>
              ))}
            </div>
            {renderMaidProfiles()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMaids;
