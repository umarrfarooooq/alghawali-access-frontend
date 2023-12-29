import React, { useEffect, useState } from "react";
import MaidProfile from "../Maid-Profile/Maid-Profile";
import AddMaidForm from "../Add-Maid/Add-Maid";
import Backdrop from "../UI/Backdrop";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import roles from "../roles/roles";

const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  
  
const AllMaids = ({searchTerm}) =>{
    const {verifyToken , roles: userRoles} = VerifyStaffToken();
    const [maidData, setMaidData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [itemsToLoad, setItemsToLoad] = useState(6);
    const [totalItemsLoaded, setTotalItemsLoaded] = useState(6);

    const sortedMaidData = [...maidData].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    const currentItems = sortedMaidData.slice(0, totalItemsLoaded);

    const handleLoadMore = () => {
      setItemsToLoad(itemsToLoad + 6);
      setTotalItemsLoaded(totalItemsLoaded + 6);
    };

    useEffect(() => {
      const fetchMaidData = async () => {
        try {
          const response = await axiosInstense.get("api/v1/maids/withHired",
            {
              params: { search: searchTerm },
              headers: {
                Authorization:
                `Bearer ${verifyToken}`,
              },
            }
          );
          setMaidData(response.data);
        } catch (error) {
          console.error("Error fetching maid data:", error);
        }
      };
  
      fetchMaidData();
    }, [isFormVisible, searchTerm]);


    const toggleFormVisibility = () => {
      setIsFormVisible(prevState => !prevState);
    };

    const maidDataLength = maidData.length;
    return(
        <>
        {isFormVisible && <Backdrop showBackdrop={true} />}
            <div className="md:ml-[20rem] md:px-8 px-4">
            <div className="relative">
                {isFormVisible && (
                    <aside className="absolute z-[20] right-0 -mt-8">
                    <AddMaidForm onCloseForm={toggleFormVisibility} />
                    </aside>
                )}
                <div className="maidsCount flex items-center justify-between my-4">
                    <span className="text-xl font-bold hidden sm:inline-block">
                        All Maids {maidDataLength}
                    </span>
                    <div>
                    {userRoles.includes(roles.CanAddMaid) && 
                    <div className="maidActions flex items-center gap-2">
                            <div className="addMaidBtn p-4 text-[#fff] bg-[#107243] rounded-lg text-base" onClick={toggleFormVisibility}>
                                <button className="flex items-center justify-center gap-1 outline-none border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 12H5" stroke="#FFFBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 5V19" stroke="#FFFBFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                    Add New Maid
                                </button>
                            </div> 
                    </div>}
                        
                    </div>
                </div>
                <div className="maidsProfiles mt-2 min-h-screen max-h-full">
                <div>
                    <div className="w-full border rounded-2xl border-solid p-6">
                        {currentItems.map((maid) => (
                        <MaidProfile key={maid._id} maid={maid} />
                      ))}
                      <div className="flex items-center justify-center">
                        {totalItemsLoaded < sortedMaidData.length && (
                          <button className="border bg-[#107243] border-[#29a167] px-6 py-3 text-sm mt-4 font-semibold cursor-pointer rounded-2xl text-[#fff]" onClick={handleLoadMore}>Load More</button>
                        )}
                      </div>
                      
                    </div>
                    
                </div>
                </div>
            </div>
            
            </div>
        </>
    )
}

export default AllMaids;