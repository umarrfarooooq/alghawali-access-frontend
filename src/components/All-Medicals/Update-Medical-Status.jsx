import React, { useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import { Loader2 } from "lucide-react";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const UpdateMedicalStatus = ({
  onCloseForm,
  updatedStatus,
  medicalValueData,
  onSuccess,
}) => {
  const [medicalDate, setMedicalDate] = useState("");
  const [medicalFile, setMedicalFile] = useState(null);
  const [mohFile, setMohFile] = useState(null);
  const { verifyToken } = VerifyStaffToken();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("medicalStatus", updatedStatus);
    formData.append("medicalDate", medicalDate);
    if (medicalFile) {
      formData.append("medicalFile", medicalFile);
    }
    if (mohFile) {
      formData.append("mohFile", mohFile);
    }


    try {
      setLoading(true);
      const response = await axiosInstense.put(
        `api/v1/medical/${medicalValueData.passportNo}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Medical status updated:", response.data);
      if (onSuccess) {
        onSuccess();
      } else {
        onCloseForm();
      }
    } catch (error) {
      setErrorMessage(true);
      console.error("Error updating medical status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F2F5FF] w-full max-h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex w-full items-center justify-between mb-8">
        <div className="text-base md:text-2xl font-semibold">
          Update Medical Status
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 18L18 6"
              stroke="#CD2424"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
              <label class="form-label block text-xl">Updated Status</label>
              <input
                value={updatedStatus}
                type="text"
                readOnly
                class="w-full bg-[#E3E3E3] text-gray-500 md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                name="medicalStatus"
              />
            </div>
            <div className="mb-4">
              <label class="form-label block text-xl">Medical Date</label>
              <input
                placeholder="Medical Date"
                type="date"
                class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                name="medicalDate"
                value={medicalDate}
                onChange={(e) => setMedicalDate(e.target.value)}
              />
            </div>
            <label class="block text-xl">Medical File</label>
            <div className="flex items-center mb-4 justify-center w-full">
              <label
                htmlFor="medical-file"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span>
                  </p>
                </div>
                <input
                  id="medical-file"
                  type="file"
                  name="medicalFile"
                  hidden
                  onChange={(e) => setMedicalFile(e.target.files[0])}
                />
              </label>
            </div>
            <label class="block text-xl">MOH File</label>
            <div className="flex items-center mb-4 justify-center w-full">
              <label
                htmlFor="moh-file"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:hover:bg-bray-800 dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span>
                  </p>
                </div>
                <input
                  id="moh-file"
                  type="file"
                  name="mohFile"
                  hidden
                  onChange={(e) => setMohFile(e.target.files[0])}
                />
              </label>
            </div>

            <div>
              <div class="mb-4">
                <button
                  disabled={loading}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin text-white w-4 h-4" />
                  ) : (
                    "Update"
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

export default UpdateMedicalStatus;
