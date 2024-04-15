import React from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";
import StaffAccountRow from "./Account-Staff";

const HomeCard2 = ({cardTxt, count, svg, cursor, details, staffDetails, action}) =>{
    const renderCountryCounts = () => {
        if (!details) {
            return <div>Loading...</div>;
        } else if (Object.keys(details).length === 0) {
            return <div>No data available</div>;
        } else if (Array.isArray(details)) {
            return details.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md bg-[#EBEBEB]">
                    <div className="text-sm font-bold">{country}</div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">No specific details available</div>
                        <NavigateNextIcon />
                    </div>
                </div>
            ));
        } else {
            return Object.keys(details).map(country => (
                <Link to={`/maids?nationality=${country}`}>
                    <div key={country} className="flex items-center justify-between p-3 rounded-md bg-[#EBEBEB]">
                        <div className="text-sm font-bold">{country}</div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold">{details[country]}</div>
                            <NavigateNextIcon />
                        </div>
                    </div>
                </Link>
                
            ));
        }
    };
    
    

    const renderStaffDetails = () => {
        if (staffDetails) {
            return staffDetails.map(data => (
                <StaffAccountRow accountData={data} action={action} key={data._id}/>
            ));
        }
        return null;
    };

    return(
        <>
            {<div className="w-full sm:w-auto">
                <div className={`w-full ${cursor && 'cursor-pointer'} sm:w-[15rem] md:w-[19rem] xl:w-[22rem] p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4`}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[#EBEBEB]">
                            {svg ? svg : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.125 13.125L9.375 18.375L19.875 7.125" stroke="#262F32" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>}
                        </div>
                        <div className="text-sm font-bold">
                            {cardTxt ? cardTxt : "Hired By Client"}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="text-[2rem] text-[#262F32] font-bold">{count ? count : "00"} </span>
                        </div>
                    </div>
                    <div>
                        <div>
                        <div className="flex flex-col gap-2">
                            {details ? renderCountryCounts() : renderStaffDetails()}
                        </div>
                        </div>
                    </div>
                </div>
            </div>}
            
        </>
    )
}

export default HomeCard2;
