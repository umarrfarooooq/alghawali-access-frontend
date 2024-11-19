import React, { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import AllMaids from "../components/All-Maids/All-Maids";
import Search from "../components/Search/Search";
import { useSearchDebounce } from "../hooks/useSearchDebounce";
const OurMaids = () => {
  const { searchTerm, handleSearch } = useSearchDebounce((value) => {
    setDebouncedSearchTerm(value);
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  return (
    <>
      <div className="bg-[#F2F5FF]">
        <Sidebar />
        <div className="md:ml-[20rem] md:px-8 px-4 mt-4 md:mt-0">
          <Search onSearch={handleSearch} />
        </div>
        <AllMaids searchTerm={debouncedSearchTerm} />
      </div>
    </>
  );
};

export default OurMaids;
