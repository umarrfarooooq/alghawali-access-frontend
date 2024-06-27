import axios from "axios";
import React, { useState, useEffect } from "react";
import { VerifyStaffToken } from "../Auth/VerifyToken";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const EditPaymentRequest = ({ onCloseForm, paymentData }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { verifyToken } = VerifyStaffToken();
  const [errorMessage, setErrorMessage] = useState(false);
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [staffNames, setStaffNames] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const [selectedSender, setSelectedSender] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");

  useEffect(() => {
    if (paymentData.paymentMethod.startsWith("Bank Transfer")) {
      setSelectedPaymentMethod("Bank Transfer");
      const bankName = paymentData.paymentMethod.match(/\((.*?)\)/)?.[1] || "";
      setSelectedBank(bankName);
    } else {
      setSelectedPaymentMethod(paymentData.paymentMethod);
    }
  }, [paymentData]);
  useEffect(() => {
    if (paymentData && paymentData.proof) {
      setPreview(paymentData.proof);
    }
  }, [paymentData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (paymentData.type === "Received") {
      setSelectedReceiver(paymentData.receivedBy || "");
    } else {
      setSelectedSender(paymentData.sendedBy || "");
    }
  }, [paymentData]);

  const handleReceiverChange = (e) => setSelectedReceiver(e.target.value);
  const handleSenderChange = (e) => setSelectedSender(e.target.value);
  useEffect(() => {
    const fetchAccountNames = async () => {
      try {
        const response = await axiosInstense.get(
          "api/v1/staffAccounts/all-account-names",
          {
            headers: {
              Authorization: `Bearer ${verifyToken}`,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setStaffNames(response.data);
        } else {
          console.error("Unexpected data format in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching staff names:", error);
      }
    };

    fetchAccountNames();
  }, [verifyToken]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSpinningLoader(true);
  
    const formData = new FormData();
    formData.append("pendingApprovalId", paymentData._id);
  
    const fields = ["amount", "receivedBy", "sendedBy"];
    let hasChanges = false;
  
    fields.forEach((field) => {
      const value = e.target[field]?.value;
      if (value && value !== paymentData[field]) {
        formData.append(field, value);
        hasChanges = true;
      }
    });
  
    let paymentMethod = selectedPaymentMethod;
    if (selectedPaymentMethod === "Bank Transfer" && selectedBank) {
      paymentMethod = `Bank Transfer (${selectedBank})`;
    }
    if (paymentMethod !== paymentData.paymentMethod) {
      formData.append("paymentMethod", paymentMethod);
      hasChanges = true;
    }
  
    const proofFile = e.target.paymentProof.files[0];
    if (proofFile) {
      formData.append("paymentProof", proofFile);
      hasChanges = true;
    }
  
    if (!hasChanges) {
      setErrorMessage("No changes were made.");
      setSpinningLoader(false);
      return;
    }
  
    try {
      const response = await axiosInstense.put(
        `api/v1/staffAccounts/edit-pending-payment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        setSpinningLoader(false);
        onCloseForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 || status === 404) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else if (error.request) {
        setErrorMessage("No response received from the server. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSpinningLoader(false);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    if (e.target.value !== "Bank Transfer") {
      setSelectedBank("");
    }
  };
  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  return (
    <>
      <div className="bg-[#F2F5FF] max-h-screen min-h-full overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-semibold">Edit Payment Request</div>
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
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="form-label block text-xl">Amount</label>
                <input
                  defaultValue={paymentData.amount}
                  type="number"
                  className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="amount"
                />
              </div>
              <div className="mb-4">
                <label className="form-label block text-xl">
                  Payment Method
                </label>
                <select
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                  name="paymentMethod"
                  className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              {selectedPaymentMethod === "Bank Transfer" && (
                <div className="mb-4">
                  <label className="form-label block text-xl">
                    Select Bank
                  </label>
                  <select
                    name="selectedBank"
                    value={selectedBank}
                    onChange={handleBankChange}
                    className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  >
                    <option value="" disabled>
                      Select Bank
                    </option>
                    <option value="Central Bank">Central Bank</option>
                    <option value="Central Bank of Oman">
                      Central Bank of Oman
                    </option>
                    <option value="Bank Muscat">Bank Muscat</option>
                    <option value="Bank Dhofar">Bank Dhofar</option>
                    <option value="National Bank of Oman">
                      National Bank of Oman
                    </option>
                    <option value="Sohar International">
                      Sohar International
                    </option>
                    <option value="Oman Arab Bank">Oman Arab Bank</option>
                    <option value="HSBC Oman">HSBC Oman</option>
                    <option value="Ahli Bank">Ahli Bank</option>
                    <option value="Bank Nizwa">Bank Nizwa</option>
                    <option value="Alizz Islamic Bank">
                      Alizz Islamic Bank
                    </option>
                    <option value="First Abu Dhabi Bank Oman">
                      First Abu Dhabi Bank Oman
                    </option>
                    <option value="Standard and Charter Bank Oman">
                      Standard and Charter Bank Oman
                    </option>
                    <option value="Beirut Oman Bank">Beirut Oman Bank</option>
                  </select>
                </div>
              )}
              {paymentData.type === "Received" ? (
                <div className="mb-4">
                  <label className="form-label block text-xl">
                    Received By
                  </label>
                  <select
                    name="receivedBy"
                    value={selectedReceiver}
                    onChange={handleReceiverChange}
                    className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  >
                    <option value="">Select a receiver</option>
                    {staffNames.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="form-label block text-xl">Sent By</label>
                  <select
                    name="sentBy"
                    value={selectedSender}
                    onChange={handleSenderChange}
                    className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  >
                    <option value="">Select a sender</option>
                    {staffNames.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <label className="block text-xl">Payment Slip</label>
              <div className="flex items-center mb-4 justify-center w-full">
                <label
                  htmlFor="paymentProof"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {preview ? (
                      <img
                        src={
                          preview.startsWith("data:")
                            ? preview
                            : `${import.meta.env.VITE_API_URL}${preview}`
                        }
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mb-2"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    )}
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        {preview ? "Click to change" : "Click to upload"}
                      </span>
                    </p>
                    {file && (
                      <p className="text-xs text-gray-500 truncate max-w-full">
                        {file.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="paymentProof"
                    type="file"
                    name="paymentProof"
                    onChange={handleFileChange}
                    hidden
                    accept="image/*,.pdf"
                  />
                </label>
              </div>
              <div>
                <div class="mb-4">
                  <button
                    disabled={spinningLoader}
                    type="submit"
                    className="w-full disabled:cursor-not-allowed disabled:bg-[#b9b9b9] flex items-center justify-center text-sm font-semibold bg-[#107243] text-white md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  >
                    {spinningLoader && (
                      <img
                        className="w-8"
                        src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
                      />
                    )}
                    {!spinningLoader && "Update"}
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

export default EditPaymentRequest;
