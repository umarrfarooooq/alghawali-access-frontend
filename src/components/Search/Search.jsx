import React from "react";


const Search = ({ onSearch }) => {

    return (
        <div>
            <div className="">
                <div className="flex w-full md:w-[420px] lg:w-[520px] bg-[#EBEBEB] items-center rounded-lg border border-[#C3D0D4] py-4 px-2 gap-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#8C979C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.0031 20.9992L16.7031 16.6992" stroke="#8C979C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <input
                        
                        className="outline-none w-full searchInput bg-transparent"
                        type="text"
                        placeholder="Search"

                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Search;
