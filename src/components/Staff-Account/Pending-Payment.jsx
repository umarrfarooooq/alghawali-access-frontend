import React, { useState } from "react";
import axios from "axios";
import { VerifyStaffToken } from "../Auth/VerifyToken";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import EditPaymentRequest from "./Edit-Payment-Request";
import Backdrop from "../UI/Backdrop";
const axiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
const PendingPaymentTable = ({pendingPaymentData, setUpdateFlag}) => {
    const {verifyToken} = VerifyStaffToken();
    const [spinningLoader, setSpinningLoader] = useState(false)
    const [showPaymentUpdateForm, setShowPaymentUpdateForm] = useState(false)
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    };
    const toggleFormVisibility = () => {
        setShowPaymentUpdateForm(prevState => !prevState);
      }
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
                setUpdateFlag(prevFlag => !prevFlag);
            }
        } catch (error) {
            setSpinningLoader(false)
            setUpdateFlag(prevFlag => !prevFlag);
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
                setUpdateFlag(prevFlag => !prevFlag);
            }
        } catch (error) {
            setSpinningLoader(false)
            setUpdateFlag(prevFlag => !prevFlag);
            console.error("Error declining payment request:", error);
        }
    }

    return(
        <>
        {showPaymentUpdateForm && <Backdrop showBackdrop={true}/>}
            <div className="requirementTable p-3 rounded-xl border border-[#C3D0D4] bg-[#FFFBFA]">
            {showPaymentUpdateForm && <aside className="absolute z-[20] right-0 w-screen sm:w-auto sm:mr-8 -mt-8">
                            <EditPaymentRequest onCloseForm={toggleFormVisibility} paymentData={pendingPaymentData}/>
                    </aside>}
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
                                        <div onClick={toggleFormVisibility} className="Entry w-fit h-fit cursor-pointer bg-[#E3E3E3] p-3 rounded-3xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 22" fill="none">
                                                <path d="M21 9.5V11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1H12.5" stroke="#262F32" stroke-width="1.5" stroke-linecap="round"/>
                                                <path d="M15.6527 2.45512L16.3017 1.80612C16.8181 1.28988 17.5184 0.999906 18.2485 1C18.9787 1.00009 19.6789 1.29024 20.1952 1.80662C20.7114 2.323 21.0014 3.0233 21.0013 3.75347C21.0012 4.48365 20.7111 5.18388 20.1947 5.70012L19.5447 6.34912C19.5447 6.34912 18.1667 6.26812 16.9507 5.05112C15.7337 3.83512 15.6527 2.45612 15.6527 2.45612L9.68767 8.42012C9.28367 8.82412 9.08167 9.02612 8.90767 9.24912C8.70267 9.51112 8.52767 9.79612 8.38367 10.0971C8.26267 10.3521 8.17267 10.6231 7.99167 11.1651L7.41267 12.9001M7.41267 12.9001L7.03867 14.0221C6.99469 14.153 6.98808 14.2935 7.01959 14.4279C7.0511 14.5623 7.11948 14.6853 7.21705 14.7829C7.31461 14.8806 7.43749 14.9491 7.57186 14.9808C7.70623 15.0124 7.84677 15.006 7.97767 14.9621L9.10067 14.5881M7.41267 12.9001L9.10067 14.5881M19.5457 6.34812L13.5807 12.3131C13.1767 12.7171 12.9747 12.9191 12.7517 13.0931C12.4889 13.2981 12.2045 13.4738 11.9037 13.6171C11.6487 13.7381 11.3777 13.8281 10.8357 14.0091L9.10067 14.5881" stroke="#262F32" stroke-width="1"/>
                                            </svg>
                                        </div>
                                        {pendingPaymentData.proof && (
                                            <PhotoProvider>
                                                <PhotoView src={`${import.meta.env.VITE_API_URL}${pendingPaymentData.proof}`}>
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
                                                </PhotoView>
                                            </PhotoProvider>
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