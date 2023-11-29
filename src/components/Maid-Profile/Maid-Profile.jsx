import React from "react";
import { Link } from "react-router-dom";

const MaidProfile = ({maid}) =>{
    return(
        <>
            <div className="profileCard bg-[#FFFBFA] rounded-lg relative border border-solid p-4 mb-4 block lg:flex lg:items-start gap-4 shadow-md">
            {maid.isHired ? <span>
                    <span class="bg-yellow-100 absolute right-0 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">Hired</span>
                </span> : ''
            }
                
                <div className="profileLeftSide">
                    <div className="maidImage">
                        <img className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top" src={`${import.meta.env.VITE_API_URL}${maid.maidImg}`}/>
                    </div>
                    <Link to={`/details/${maid._id}`} className="hidden lg:inline-block">
                        <div className="ctaBtn border flex items-center justify-center border-[#107243] p-3 text-sm mt-4 font-semibold cursor-pointer rounded-2xl text-[#107243]">
                            See Profile
                        </div>
                    </Link>
                </div>
                <div className="profileRightSide">
                
                    <div className="maidName text-lg font-bold">
                        {maid.name}
                    </div>
                    <div className="overflow-x-auto w-full">
                        <div className="maidDetails overflow-y-auto max-w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                                <div className="nationality">
                                    <div className="text-xs">Nationality</div>
                                    <div className="text-sm font-semibold">{maid.nationality}</div>
                                </div>
                                <div className="religion">
                                    <div className="text-xs">Religion</div>
                                    <div className="text-sm font-semibold">{maid.religion}</div>
                                </div>
                                <div className="maritalStatus">
                                    <div className="text-xs">Marital Status</div>
                                    <div className="text-sm font-semibold">{maid.maritalStatus}</div>
                                </div>
                                <div className="childrens">
                                    <div className="text-xs">Childrens</div>
                                    <div className="text-sm font-semibold">{maid.childrens}</div>
                                </div>
                                <div className="age">
                                    <div className="text-xs" >Age</div>
                                    <div className="text-sm font-semibold">{maid.age} Years Old</div>
                                </div>
                                <div className="Languages">
                                    <div className="text-xs">Languages</div>
                                    <div className="text-sm font-semibold">{maid.languages}</div>
                                </div>
                                <div className="Salary">
                                    <div className="text-xs">Salary</div>
                                    <div className="text-sm font-semibold">{maid.salery}</div>
                                </div>
                                <div className="MaidCode">
                                    <div className="text-xs">Maid Tracking Code</div>
                                    <div className="text-sm font-semibold">{maid.code}</div>
                                </div>
                                <div className="whoAdd">
                                    <div className="text-xs">Added to System By</div>
                                    <div className="text-sm font-semibold">Zeeshan Khan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/details/${maid._id}`} className="lg:hidden block">
                        <div className="ctaBtn border flex items-center justify-center border-[#107243] p-3 text-sm mt-4 font-semibold cursor-pointer rounded-2xl text-[#107243]">
                            See Profile
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MaidProfile;