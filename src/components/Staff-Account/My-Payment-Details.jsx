import React, { useState } from "react";

const MyPaymentDetailsPopup = ({ onCloseForm, userDetails }) => {
    const [bankDetailsOpen, setBankDetailsOpen] = useState(false);

    const toggleBankDetailsBox = () => {
        setBankDetailsOpen(!bankDetailsOpen);
    };

    const renderBankDetails = () => {
        return Object.entries(userDetails?.remaining?.Bank?.details ?? {}).map(([bankName, amount]) => (
            <div key={bankName} className="mb-4 w-full text-base font-medium flex items-center justify-start bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                {bankName}: {amount} OMR
            </div>
        ));
    };
    

    return (
        <>
            <div className="bg-[#F2F5FF] max-h-screen min-h-full overflow-auto p-3 sm:p-8 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <div className="text-2xl font-semibold">Account Details</div>
                    <div className="p-3 rounded-md bg-[#EBEBEB] cursor-pointer" onClick={onCloseForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 18L6 6" stroke="#CD2424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 18L18 6" stroke="#CD2424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="bg-[#EBEBEB] p-3 sm:p-8 rounded-xl shadow-lg">
                    <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
                        
                    <div className="mb-4 w-full text-base font-medium flex items-center justify-start bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                        Cash: {userDetails?.remaining?.Cash ?? 'N/A'} OMR
                    </div>

                        <div className="mb-4 w-full text-base font-medium flex items-center justify-start bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                            Cheque: {userDetails?.remaining?.Cheque ?? 'N/A'} OMR
                        </div>
                        <div className="mb-4 w-full text-base font-medium flex items-center justify-start bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2">
                            Bank: {userDetails?.remaining?.Bank?.totalAmount ?? 'N/A'} OMR
                        </div>
                        <hr />
                        <div>
                            <div onClick={toggleBankDetailsBox} className="my-4 cursor-pointer flex items-center justify-between">
                                <h3>Bank Details</h3>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M17 10L12 15L7 10" stroke="#434146" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                            {bankDetailsOpen && <div className="allBanks">
                                {renderBankDetails()}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPaymentDetailsPopup;
