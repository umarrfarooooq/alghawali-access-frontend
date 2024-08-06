import axios from "axios";
import React, { useState } from "react";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import { Loader2 } from "lucide-react";

const axiosInstense = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const InviteAgentForm = ({ onCloseForm }) => {
  const { verifyToken } = VerifyStaffToken();
  const [invitationLink, setInvitationLink] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
    } catch (error) {
      console.error("Error copying link to clipboard:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!formData.email) {
      setErrorMessage("Email is required.");
      return;
    }
    setSpinningLoader(true);
    try {
      const response = await axiosInstense.post(
        "api/v1/agents/invite-agent",
        formData,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSpinningLoader(false);
      if (response.status === 200) {
        setInvitationLink(response.data.inviteUrl);
      }
    } catch (error) {
      setSpinningLoader(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.error === "Agent already exists") {
          setErrorMessage("Agent already exists.");
        } else if (status === 400) {
          setErrorMessage(data.error || "Invalid input. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage("No response from the server. Please try again.");
      } else {
        console.error("Error submitting form:", error.message);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="bg-[#F2F5FF] max-h-screen overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-semibold">Invite Agent</div>
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
                <label className="form-label block text-xl">Email</label>
                <input
                  onChange={handleInputChange}
                  type="email"
                  class="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  name="email"
                />
              </div>
              {invitationLink && (
                <div className="mb-4">
                  <label className="form-label block text-xl">Link</label>
                  <input
                    readOnly
                    value={invitationLink}
                    type="text"
                    className="w-full overflow-auto bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
                  />
                </div>
              )}
              {invitationLink ? (
                <div>
                  <div onClick={handleCopyLink} className="mb-4">
                    <button
                      type="button"
                      className="border justify-center w-full flex items-center disabled:bg-opacity-75 disabled:cursor-not-allowed gap-2 bg-[#107243] border-[#29a167] px-6 py-3 text-sm mt-4 font-semibold cursor-pointer rounded-lg text-[#fff]"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div class="mb-4">
                    <button
                      disabled={spinningLoader}
                      className="border justify-center w-full flex items-center disabled:bg-opacity-75 disabled:cursor-not-allowed gap-2 bg-[#107243] border-[#29a167] px-6 py-3 text-sm mt-4 font-semibold cursor-pointer rounded-lg text-[#fff]"
                    >
                      {spinningLoader && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Get Invite Link
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteAgentForm;
