import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";

const HomePageCompo = () =>{


    const svg1 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.45 3H6.8C6.32261 3 5.86477 3.18964 5.52721 3.52721C5.18964 3.86477 5 4.32261 5 4.8V19.2C5 19.6774 5.18964 20.1352 5.52721 20.4728C5.86477 20.8104 6.32261 21 6.8 21H17.6C18.0774 21 18.5352 20.8104 18.8728 20.4728C19.2104 20.1352 19.4 19.6774 19.4 19.2V7.95L14.45 3Z" stroke="#262F32" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 3V8.4H19.4" stroke="#262F32" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.5 14.6984L11.3 16.4984L14.9 12.8984" stroke="#262F32" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
    const svg2 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.87671 9.87891C9.58196 10.1536 9.34555 10.4848 9.18158 10.8528C9.01762 11.2208 8.92945 11.618 8.92234 12.0208C8.91523 12.4236 8.98933 12.8237 9.14022 13.1973C9.2911 13.5708 9.51568 13.9102 9.80055 14.1951C10.0854 14.4799 10.4248 14.7045 10.7983 14.8554C11.1719 15.0063 11.572 15.0804 11.9748 15.0733C12.3776 15.0662 12.7749 14.978 13.1429 14.814C13.5109 14.6501 13.8421 14.4137 14.1167 14.1189" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.7266 5.08C11.1479 5.02751 11.572 5.00079 11.9966 5C18.9966 5 21.9966 12 21.9966 12C21.5495 12.9571 20.9888 13.8569 20.3266 14.68" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.61 6.60938C4.62125 7.964 3.02987 9.82463 2 11.9994C2 11.9994 5 18.9994 12 18.9994C13.9159 19.0045 15.7908 18.4445 17.39 17.3894" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 2L22 22" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

    const svg3 = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6L18 18" stroke="#262F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>



    return(
        <>
            <div className="md:ml-[20rem] md:px-8 px-4">
            <div className="relative">
                
                <div className="maidsProfiles mt-2">
                <div className="flex flex-col gap-y-8">
                    <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 flex items-center justify-between border border-solid p-6">
                        <HomeCard  count="00" total="00"/>
                        <HomeCard svg={svg1} cardTxt="Planned Interviews" count="00" total="00"/>
                        <HomeCard svg={svg2} cardTxt="Maids Hidden From Main Site" count="00" total="00"/>
                        <HomeCard svg={svg3} cardTxt="Total Number Of Non-Hire Maids" count="00" total="00"/>
                    </div>
                    <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 flex items-center justify-between border border-solid p-6">
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                    </div>
                    <div className="w-full rounded-xl bg-[#F2F2F2] overflow-auto gap-4 flex items-center justify-between border border-solid p-6">
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                        <HomeCard />
                    </div>
                </div>
                </div>
            </div>
            
            </div>
        </>
    )
}

export default HomePageCompo;