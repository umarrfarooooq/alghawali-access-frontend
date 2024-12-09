import React, { useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import { Loader2 } from "lucide-react";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AddMedical = ({ onCloseForm, onSuccess }) => {
  const [formData, setFormData] = useState({
    maidName: "",
    passportNo: "",
    entryDate: "",
  });
  const { verifyToken } = VerifyStaffToken();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstense.post(
        "api/v1/medical/add-medical-manually",
        formData,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );
      console.log("Medical created:", response.data);
      if (onSuccess) {
        onSuccess();
      } else {
        onCloseForm();
      }
    } catch (error) {
      setErrorMessage(true);
      console.error("Error creating medical record:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F2F5FF] w-full max-h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex w-full items-center justify-between mb-8">
        <div className="text-base md:text-2xl font-semibold">
          Add New Medical
        </div>
        <div
          className="p-3 rounded-md bg-[#EBEBEB] cursor-pointer"
          onClick={onCloseForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 18L6 6"
              stroke="#CD2424"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 18L18 6"
              stroke="#CD2424"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="bg-[#EBEBEB] p-3 sm:p-8 rounded-xl shadow-lg">
        <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
          {errorMessage && (
            <div
              className="p-4 mb-4 w-full md:w-[26rem] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Something went wrong!</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label block text-xl">Maid Name</label>
              <input
                placeholder="Enter maid name"
                type="text"
                className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                name="maidName"
                value={formData.maidName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label block text-xl">
                Passport Number
              </label>
              <input
                placeholder="Enter passport number"
                type="text"
                className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                name="passportNo"
                value={formData.passportNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label block text-xl">Entry Date</label>
              <input
                type="date"
                className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="mb-4">
                <button
                  disabled={loading}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin text-white w-4 h-4" />
                  ) : (
                    "Add Medical"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedical;
