import React from "react";

const MaidHistoryCard = ({maidHistoryDetails, onClick}) =>{
    return(
        <>
            <div className="maidsHistory mt-2">
                        <div>
                            <div className="w-full border border-solid bg-white rounded-lg p-6">
                                <div className="profileCard relative border border-solid rounded-lg p-4 mb-4 block lg:flex lg:items-start gap-4">
                                    <div className="absolute right-4 bottom-4 flex items-center justify-center gap-2">
                                    {maidHistoryDetails.hiringSlip && <div className="downloadImg cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                                        <a download href={`${import.meta.env.VITE_API_URL}${maidHistoryDetails.hiringSlip}`}>
                                                        
                                                            <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M12.5533 16.505C12.483 16.5819 12.3975 16.6433 12.3022 16.6852C12.2069 16.7272 12.1039 16.7489 11.9998 16.7489C11.8957 16.7489 11.7927 16.7272 11.6974 16.6852C11.6021 16.6433 11.5166 16.5819 11.4463 16.505L7.4463 12.13C7.3121 11.9831 7.24177 11.7889 7.25077 11.5901C7.25977 11.3913 7.34737 11.2042 7.4943 11.07C7.64123 10.9358 7.83545 10.8655 8.03424 10.8745C8.23303 10.8835 8.4201 10.9711 8.5543 11.118L11.2503 14.068V2.99902C11.2503 2.80011 11.3293 2.60935 11.47 2.46869C11.6106 2.32804 11.8014 2.24902 12.0003 2.24902C12.1992 2.24902 12.39 2.32804 12.5306 2.46869C12.6713 2.60935 12.7503 2.80011 12.7503 2.99902V14.067L15.4473 11.117C15.5816 10.9702 15.7688 10.8828 15.9676 10.874C16.1664 10.8652 16.3605 10.9357 16.5073 11.07C16.6541 11.2044 16.7415 11.3915 16.7503 11.5903C16.7591 11.7891 16.6886 11.9832 16.5543 12.13L12.5533 16.505Z" fill="#262F32"/>
                                                                <path d="M3.75 14.999C3.75 14.8001 3.67098 14.6093 3.53033 14.4687C3.38968 14.328 3.19891 14.249 3 14.249C2.80109 14.249 2.61032 14.328 2.46967 14.4687C2.32902 14.6093 2.25 14.8001 2.25 14.999V15.054C2.25 16.421 2.25 17.524 2.367 18.391C2.487 19.291 2.747 20.049 3.348 20.651C3.95 21.253 4.708 21.511 5.608 21.633C6.475 21.749 7.578 21.749 8.945 21.749H15.055C16.422 21.749 17.525 21.749 18.392 21.633C19.292 21.511 20.05 21.253 20.652 20.651C21.254 20.049 21.512 19.291 21.634 18.391C21.75 17.524 21.75 16.421 21.75 15.054V14.999C21.75 14.8001 21.671 14.6093 21.5303 14.4687C21.3897 14.328 21.1989 14.249 21 14.249C20.8011 14.249 20.6103 14.328 20.4697 14.4687C20.329 14.6093 20.25 14.8001 20.25 14.999C20.25 16.434 20.248 17.435 20.147 18.191C20.048 18.925 19.867 19.313 19.591 19.59C19.314 19.867 18.926 20.047 18.191 20.146C17.436 20.247 16.435 20.249 15 20.249H9C7.565 20.249 6.563 20.247 5.808 20.146C5.074 20.047 4.686 19.866 4.409 19.59C4.132 19.313 3.952 18.925 3.853 18.19C3.752 17.435 3.75 16.434 3.75 14.999Z" fill="#262F32"/>
                                                            </svg>
                                                            </div>
                                                            </a>
                                                        </div>}
                                                        
                                                        <div onClick={onClick} className="editCosDetails cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl">
                                                            <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                <path d="M21 9.49805V10.998C21 15.712 21 18.069 19.535 19.533C18.072 20.998 15.714 20.998 11 20.998C6.286 20.998 3.929 20.998 2.464 19.533C1 18.07 1 15.712 1 10.998C1 6.28405 1 3.92705 2.464 2.46205C3.93 0.998047 6.286 0.998047 11 0.998047H12.5" stroke="#262F32" stroke-width="1.5" stroke-linecap="round"/>
                                                                <path d="M15.6527 2.45317L16.3017 1.80417C16.8181 1.28792 17.5184 0.997953 18.2485 0.998047C18.9787 0.998141 19.6789 1.28829 20.1952 1.80467C20.7114 2.32104 21.0014 3.02135 21.0013 3.75152C21.0012 4.48169 20.7111 5.18192 20.1947 5.69817L19.5447 6.34717C19.5447 6.34717 18.1667 6.26617 16.9507 5.04917C15.7337 3.83317 15.6527 2.45417 15.6527 2.45417L9.68767 8.41817C9.28367 8.82217 9.08167 9.02417 8.90767 9.24717C8.70267 9.50917 8.52767 9.79417 8.38367 10.0952C8.26267 10.3502 8.17267 10.6212 7.99167 11.1632L7.41267 12.8982M7.41267 12.8982L7.03867 14.0202C6.99469 14.151 6.98808 14.2916 7.01959 14.426C7.0511 14.5604 7.11948 14.6833 7.21705 14.781C7.31461 14.8787 7.43749 14.9472 7.57186 14.9788C7.70623 15.0105 7.84677 15.004 7.97767 14.9602L9.10067 14.5862M7.41267 12.8982L9.10067 14.5862M19.5457 6.34617L13.5807 12.3112C13.1767 12.7152 12.9747 12.9172 12.7517 13.0912C12.4889 13.2961 12.2045 13.4718 11.9037 13.6152C11.6487 13.7362 11.3777 13.8262 10.8357 14.0072L9.10067 14.5862" stroke="#262F32" stroke-width="1.5"/>
                                                            </svg>
                                                            </div>
                                                        </div>
                                    </div>
                                    <div className="profileRightSide">
                                        <div className="overflow-x-auto w-full">
                                            <div className="maidDetails overflow-y-auto max-w-full">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                                                    <div className="nationality">
                                                        <div className="text-xs">Costumer Name</div>
                                                        <div className="text-sm font-semibold">{maidHistoryDetails.fullName}</div>
                                                    </div>
                                                    <div className="religion">
                                                        <div className="text-xs">Total Amount</div>
                                                        <div className="text-sm font-semibold">{maidHistoryDetails.totalAmount} OMR</div>
                                                    </div>
                                                    <div className="maritalStatus">
                                                        <div className="text-xs">Advance</div>
                                                        <div className="text-sm font-semibold">{maidHistoryDetails.advanceAmount} OMR</div>
                                                    </div>
                                                    <div className="childrens">
                                                        <div className="text-xs">Remaining Amount</div>
                                                        <div className="text-sm font-semibold">{maidHistoryDetails.totalAmount - maidHistoryDetails.advanceAmount} OMR</div>
                                                    </div>
                                                    {!maidHistoryDetails.hiringStatus && maidHistoryDetails.returnAmount > 0 &&
                                                        <div className="age">
                                                            <div className="text-xs" >Return Amount</div>
                                                            <div className="text-sm font-semibold">{maidHistoryDetails.returnAmount} OMR</div>
                                                        </div>
                                                    }
                                                    
                                                    <div className="Languages">
                                                        <div className="text-xs">Costumer Ph#</div>
                                                        <div className="text-sm font-semibold">{maidHistoryDetails.cosPhone}</div>
                                                    </div>
                                                    <div className="Salary">
                                                        <div className="text-xs">Hired By</div>
                                                        <div className="text-sm font-semibold">{maidHistoryDetails.hiringBy}</div>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {maidHistoryDetails.unHiringReason && 
                                <div className="remarks bg-[#F2F2F2] rounded-lg p-2">
                                    <div className="flex sm:flex-row flex-col items-center gap-4">
                                        <div className="remarksHeading text-center w-full sm:w-auto p-2 rounded-lg bg-[#FFFBFA]">
                                            <p>Un Hiring Reason</p>
                                        </div>
                                        <div className="actualRemarks">
                                            <p>
                                                {maidHistoryDetails.unHiringReason}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                }
                                
                            </div>
                        </div>
            </div>
        </>
    )
}
export default MaidHistoryCard;