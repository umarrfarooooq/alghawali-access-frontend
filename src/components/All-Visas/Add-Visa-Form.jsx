import React, { useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AddVisaForm = ({ onCloseForm }) => {
  const { verifyToken } = VerifyStaffToken();
  const [errorMessage, setErrorMessage] = useState(false);
  const [registrationFrom, setRegistrationFrom] = useState("");
  const [otherRegistration, setOtherRegistration] = useState("");
  const [showOtherRegistration, setShowOtherRegistration] = useState(false);
  const [spinningLoader, setSpinningLoader] = useState(false);

  const handleOtherRegistration = (e) => {
    const value = e.target.value;
    setRegistrationFrom(value);
    if (value === 'Other') {
      setShowOtherRegistration(true);
    } else {
      setShowOtherRegistration(false);
      setOtherRegistration('');
    }
  };

  const handleOtherRegistrationInput = (e) => {
    setOtherRegistration(e.target.value);
  };

  const handleMaidFormSubmit = async (event) => {
    event.preventDefault();
    setSpinningLoader(true);
    const formData = new FormData(event.currentTarget);
    let isValid = true;

    const fieldsToValidate = ["maidName", "dateEntry", "visaEndTime"];

    const validatedData = {};

    fieldsToValidate.forEach((field) => {
      const fieldValue = formData.get(field)?.trim();
      if (!fieldValue) {
        isValid = false;
        setErrorMessage(true);
      }
      validatedData[field] = fieldValue;
    });

    if (!isValid) {
      setSpinningLoader(false);
      return;
    }
    if (registrationFrom === 'Other') {
      formData.set('registrationFrom', otherRegistration);
      formData.delete('otherRegistrationFrom');
    }

    try {
      const response = await axiosInstense.post("api/v1/visa", formData, {
        headers: {
          Authorization: `Bearer ${verifyToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSpinningLoader(false);
      onCloseForm();
    } catch (error) {
      setSpinningLoader(false);
      onCloseForm();
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="bg-[#F2F5FF] h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-semibold">Add New Visa</div>
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
                <span className="font-medium">Error!</span> All Fields Required
              </div>
            )}

            <form onSubmit={handleMaidFormSubmit}>
              <div className="mb-4">
                <label class="form-label block text-xl">Full Name</label>
                <input
                  placeholder="Full Name"
                  type="text"
                  class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="maidName"
                />
              </div>
              <div className="mb-4">
                <label className="form-label block text-xl">
                  Registration From
                </label>
                <select
                  type="text"
                  className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="registrationFrom"
                  onChange={handleOtherRegistration}
                >
                  <option value="Al Maktam">Al Maktam</option>
                  <option value="Al Burimi">Al Burimi</option>
                  <option value="Other">Other</option>
                </select>
                {showOtherRegistration && (
                  <div className="my-4">
                    <input
                      type="text"
                      id="otherRegistration"
                      className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                      name="otherRegistrationFrom"
                      placeholder="Enter Registration From"
                      onChange={handleOtherRegistrationInput}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label block text-xl">Nationality</label>
                <select
                  type="text"
                  className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="nationality"
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="India">India</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Madagascar">Madagascar</option>
                </select>
              </div>
              <div className="mb-4">
                <label class="form-label block text-xl">Passport No</label>
                <input
                  placeholder="Passport No"
                  type="text"
                  class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="passportNo"
                />
              </div>

              <div class="mb-4">
                <label class="form-label block text-xl">Entry To Oman</label>
                <input
                  type="date"
                  class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="dateEntry"
                />
              </div>

              <div class="mb-4">
                <label class="form-label block text-xl">Visa End Date</label>
                <input
                  type="date"
                  class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="visaEndTime"
                />
              </div>

              <label class="block text-xl">Maid Image</label>
              <div className="flex items-center mb-4 justify-center w-full">
                <label
                  htmlFor="primary-file"
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
                    id="primary-file"
                    type="file"
                    name="maidImage"
                    hidden
                  />
                </label>
              </div>

              <label class="block text-xl">Visa Documents</label>
              <div className="flex items-center mb-4 justify-center w-full">
                <label
                  htmlFor="visa-file"
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
                  <input id="visa-file" type="file" name="visaFile" hidden />
                </label>
              </div>

              <div>
                <div class="mb-4">
                  <button className="w-full flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                    {spinningLoader && (
                      <img
                        className="w-8"
                        src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
                      />
                    )}
                    {!spinningLoader && "Add to System"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVisaForm;
