import React from "react";

const HomeCard = ({cardTxt, count, total, svg, detailsPopUp, cursor}) =>{
    return(
        <>
            <div className="w-full sm:w-auto">
                <div className={`w-full ${cursor && 'cursor-pointer'} sm:w-[15rem] md:w-[19rem] xl:w-[22rem] p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4`}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[#EBEBEB]">
                            {svg ? svg : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.125 13.125L9.375 18.375L19.875 7.125" stroke="#262F32" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>}
                        </div>
                        <div className="text-sm font-bold">
                            {cardTxt ? cardTxt : "Hired By Client"}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="text-[2rem] text-[#262F32] font-bold">{count ? count : "00"} </span>
                            {/* <span>Today</span> */}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <span>Total till now <span className="text-sm font-medium">{total ? total : "00"}</span></span>
                            
                            <span className="cursor-pointer" onClick={detailsPopUp ? detailsPopUp : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5L19 12L12 19" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5 12L19 12" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeCard;