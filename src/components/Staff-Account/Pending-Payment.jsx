import React, { useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
const PendingPaymentTable = ({pendingPaymentData}) => {
    const {verifyToken} = VerifyStaffToken();
    const [spinningLoader, setSpinningLoader] = useState(false)
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    };
    const handlePaymentAccept = async (requestId, approved) => {
        setSpinningLoader(true)
        try {
            const response = await axiosInstense.post(
                `api/v1/staffAccounts/process-payment-request`,
                {
                    requestId: requestId,
                    approved: approved
                },
                {
                    headers: {
                        Authorization: `Bearer ${verifyToken}`,
                    },
                }
            );
            if(response.status === 200){
                setSpinningLoader(false);
            }
        } catch (error) {
            setSpinningLoader(false)
            console.error("Error processing payment request:", error);
        }
    }
    const handlePaymentDecline = async (requestId) => {
        setSpinningLoader(true)
        try {
            const response = await axiosInstense.post(
                `api/v1/staffAccounts/decline-payment-request`,
                {
                    requestId: requestId
                },
                {
                    headers: {
                        Authorization: `Bearer ${verifyToken}`,
                    },
                }
            );
            if(response.status === 200){
                setSpinningLoader(false);
            }
        } catch (error) {
            setSpinningLoader(false)
            console.error("Error declining payment request:", error);
        }
    }
    

    return(
        <>
            <div className="requirementTable p-3 rounded-xl border border-[#C3D0D4] bg-[#FFFBFA]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 overflow-x-auto gap-y-4 gap-x-8">
                                    <div className="name">
                                        <div className="text-xs">Requested By</div>
                                        <div className="text-sm font-semibold">{pendingPaymentData.requestedBy}</div>
                                    </div>
                                    <div className="number">
                                        <div className="text-xs">Amount</div>
                                        <div className="text-sm font-semibold">{pendingPaymentData.amount}</div>
                                    </div>
                                    <div className="nationality">
                                        <div className="text-xs">{pendingPaymentData.type ==="Received" ? "Received By" : "Sended By"}</div>
                                        <div className="text-sm font-semibold">{ pendingPaymentData.type ==="Received" ? pendingPaymentData.receivedBy : pendingPaymentData.sendedFrom}</div>
                                    </div>
                                    <div className="Category">
                                        <div className="text-xs">{pendingPaymentData.type ==="Received" ? "Received From" : "Sended To"}</div>
                                        <div className="text-sm font-semibold">{ pendingPaymentData.type ==="Received" ? pendingPaymentData.receivedFrom : pendingPaymentData.sendedTo}</div>
                                    </div>
                                    <div className="religion">
                                        <div className="text-xs">Type</div>
                                        <div className="text-sm font-semibold">{pendingPaymentData.type}</div>
                                    </div>
                                    <div className="maritalStatus">
                                        <div className="text-xs">Payment Method</div>
                                        <div className="text-sm font-semibold">{pendingPaymentData.paymentMethod}</div>
                                    </div>
                                    <div className="maritalStatus">
                                        <div className="text-xs">Date</div>
                                        <div className="text-sm font-semibold">{formatDate(pendingPaymentData.date)}</div>
                                    </div>

                                    <div className="flex items-center gap-2 md:justify-self-end">
                                        {pendingPaymentData.proof && (
                                            <a
                                                href={`${import.meta.env.VITE_API_URL}${pendingPaymentData.proof}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const url = e.currentTarget.getAttribute('href');
                                                    if (!url) {
                                                    console.error('Image URL is undefined');
                                                    return;
                                                    }
                                                    const filename = url.substring(url.lastIndexOf('/') + 1);
                                                    fetch(url)
                                                    .then((response) => response.blob())
                                                    .then((blob) => {
                                                        const url = window.URL.createObjectURL(new Blob([blob]));
                                                        const link = document.createElement('a');
                                                        link.href = url;
                                                        link.setAttribute('download', filename);
                                                        document.body.appendChild(link);
                                                        link.click();
                                                    })
                                                    .catch((error) => console.error('Error fetching image:', error));
                                                }}
                                                >
                                            <div className="Entry w-fit h-fit cursor-pointer bg-[#E3E3E3] p-3 rounded-3xl">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                >
                                                <path
                                                    d="M12.5533 16.5053C12.483 16.5821 12.3975 16.6435 12.3022 16.6855C12.2069 16.7275 12.1039 16.7492 11.9998 16.7492C11.8957 16.7492 11.7927 16.7275 11.6974 16.6855C11.6021 16.6435 11.5166 16.5821 11.4463 16.5053L7.4463 12.1303C7.3121 11.9833 7.24177 11.7891 7.25077 11.5903C7.25977 11.3915 7.34737 11.2045 7.4943 11.0703C7.64123 10.9361 7.83545 10.8657 8.03424 10.8747C8.23303 10.8837 8.4201 10.9713 8.5543 11.1183L11.2503 14.0683V2.99927C11.2503 2.80036 11.3293 2.60959 11.47 2.46894C11.6106 2.32829 11.8014 2.24927 12.0003 2.24927C12.1992 2.24927 12.39 2.32829 12.5306 2.46894C12.6713 2.60959 12.7503 2.80036 12.7503 2.99927V14.0673L15.4473 11.1173C15.5816 10.9705 15.7688 10.883 15.9676 10.8742C16.1664 10.8654 16.3605 10.9359 16.5073 11.0703C16.6541 11.2046 16.7415 11.3917 16.7503 11.5905C16.7591 11.7893 16.6886 11.9835 16.5543 12.1303L12.5533 16.5053Z"
                                                    fill="#262F32"
                                                />
                                                <path
                                                    d="M3.75 14.9993C3.75 14.8004 3.67098 14.6096 3.53033 14.4689C3.38968 14.3283 3.19891 14.2493 3 14.2493C2.80109 14.2493 2.61032 14.3283 2.46967 14.4689C2.32902 14.6096 2.25 14.8004 2.25 14.9993V15.0543C2.25 16.4213 2.25 17.5243 2.367 18.3913C2.487 19.2913 2.747 20.0493 3.348 20.6513C3.95 21.2533 4.708 21.5113 5.608 21.6333C6.475 21.7493 7.578 21.7493 8.945 21.7493H15.055C16.422 21.7493 17.525 21.7493 18.392 21.6333C19.292 21.5113 20.05 21.2533 20.652 20.6513C21.254 20.0493 21.512 19.2913 21.634 18.3913C21.75 17.5243 21.75 16.4213 21.75 15.0543V14.9993C21.75 14.8004 21.671 14.6096 21.5303 14.4689C21.3897 14.3283 21.1989 14.2493 21 14.2493C20.8011 14.2493 20.6103 14.3283 20.4697 14.4689C20.329 14.6096 20.25 14.8004 20.25 14.9993C20.25 16.4343 20.248 17.4353 20.147 18.1913C20.048 18.9253 19.867 19.3133 19.591 19.5903C19.314 19.8673 18.926 20.0473 18.191 20.1463C17.436 20.2473 16.435 20.2493 15 20.2493H9C7.565 20.2493 6.563 20.2473 5.808 20.1463C5.074 20.0473 4.686 19.8663 4.409 19.5903C4.132 19.3133 3.952 18.9253 3.853 18.1903C3.752 17.4353 3.75 16.4343 3.75 14.9993Z"
                                                    fill="#262F32"
                                                />
                                                </svg>
                                            </div>
                                            </a>

                                        )}
                                        <div className="actionBtns lg:justify-self-end flex gap-2">
                                        <div onClick={!pendingPaymentData.approved && !spinningLoader ? () => handlePaymentAccept(pendingPaymentData._id, true) : null} className={`text-xs ${!pendingPaymentData.approved ? "cursor-pointer bg-[#0C8B3F]" : "cursor-not-allowed bg-[#575757]"} w-fit h-fit p-3  bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-all rounded-3xl`}>
                                            {!spinningLoader ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M2.75 8.75016L6.25014 12.2503L13.2504 4.75" stroke="#0C8B3F" stroke-width="1.50006" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg> : <img className="w-4" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                            </div>
                                        </div>
                                        <div className="actionBtns lg:justify-self-end flex gap-2">
                                        <div onClick={!pendingPaymentData.approved && !spinningLoader ? () => handlePaymentDecline(pendingPaymentData._id) : null} className={`text-xs ${!pendingPaymentData.approved ? "cursor-pointer bg-[#CD2424]" : "cursor-not-allowed bg-[#575757]"} w-fit h-fit p-3  bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-all rounded-3xl`}>
                                            {!spinningLoader ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M18 18L6 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6 18L18 6" stroke="#CD2424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg> : <img className="w-4" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"/>}
                                            </div>
                                        </div>
                                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingPaymentTable;