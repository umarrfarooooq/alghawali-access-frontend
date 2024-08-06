import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestProfile from "./Request-Profile";
import { Loader2 } from "lucide-react";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const AllAgentRequests = ({ searchTerm }) => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [total, setTotal] = useState(0);
  const [maids, setMaids] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(8);

  const fetchMaids = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/v1/agentMaids/all-requests`,
        {
          params: {
            offset,
            limit,
            search: searchTerm,
            status: activeTab.toLowerCase(),
          },
        }
      );

      if (offset === 0) {
        setMaids(response.data.data);
      } else {
        setMaids((prevMaids) => [...prevMaids, ...response.data.data]);
      }
      setTotal(response.data.total);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Error fetching maids:", error);
    } finally {
      setLoading(false);
      setTabLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
  }, [searchTerm]);

  useEffect(() => {
    setOffset(0);
    fetchMaids();
  }, [activeTab, searchTerm]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTabLoading(true);
  };

  useEffect(() => {
    fetchMaids();
  }, [offset]);


  return (
    <div className="md:ml-[20rem] md:px-8 px-4">
      <div className="relative">
        <div className="maidsCount flex items-center justify-between my-4">
          <span className="text-xl font-bold hidden sm:inline-block">
            All Requests {total ? total : 0}
          </span>
        </div>
        <div className="maidsProfiles mt-2 min-h-screen max-h-full">
          <div className="bg-[#E3E3E3] my-4 rounded-xl md:px-4 px-2 py-2 w-full gap-2 flex items-center justify-between">
            {["Pending", "Approved", "Rejected"].map((tab) => (
              <div
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`${
                  activeTab === tab ? "bg-[#FFFBFA] shadow-md" : ""
                } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full flex items-center justify-center cursor-pointer`}
              >
                <span className="flex items-center">
                  {tab === "Pending" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.431 21.8544C10.5934 21.8552 8.79173 21.346 7.22648 20.3833C5.66124 19.4206 4.39391 18.0423 3.56562 16.4019C2.73734 14.7615 2.38062 12.9233 2.53518 11.0922C2.68975 9.26098 3.34953 7.50864 4.44106 6.03029C5.53258 4.55195 7.01301 3.40563 8.71746 2.71899C10.4219 2.03235 12.2835 1.83235 14.0949 2.14126C15.9063 2.45016 17.5964 3.25585 18.977 4.4686C20.3576 5.68135 21.3745 7.25355 21.9144 9.01012M22.3573 11.9272V12.6908"
                        stroke="#262F32"
                        stroke-width="1.52719"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21.7607 15.332C20.9737 17.4822 19.4687 19.2948 17.5 20.4636"
                        stroke="#262F32"
                        stroke-width="1.52719"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-dasharray="1.36 2.72"
                      />
                      <path
                        d="M15.8271 21.7227L15.1094 21.9976"
                        stroke="#262F32"
                        stroke-width="1.52719"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                  {tab === "Approved" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4.125 13.125L9.375 18.375L19.875 7.125"
                        stroke="#434146"
                        stroke-width="2.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                  {tab === "Rejected" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 6L6 18"
                        stroke="#434146"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 6L18 18"
                        stroke="#434146"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm md:text-base md:inline-block hidden">
                  {tab}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full border rounded-2xl border-solid p-6 2xl:grid grid-cols-2 gap-2">
            {tabLoading ? (
              <div className="text-center mt-4 flex items-center justify-center">
                <Loader2 className="mr-2 h-16 w-16 animate-spin" />
              </div>
            ) : (
              <>
                {maids.map((maid) => (
                  <RequestProfile key={maid._id} maid={maid} />
                ))}
                {hasMore && (
                  <div className="text-center mt-4">
                    <button
                      disabled={loading}
                      className="border flex items-center disabled:bg-opacity-75 disabled:cursor-not-allowed gap-2 bg-[#107243] border-[#29a167] px-6 py-3 text-sm mt-4 font-semibold cursor-pointer rounded-lg text-[#fff]"
                      onClick={handleLoadMore}
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAgentRequests;
