import { useState } from "react";
import CostumerPaymentHistory from "./Costumer-Payment-History";
import UpdateAccountPaymentForm from "./Update-Account-Payment-Form";
import Backdrop from "../UI/Backdrop";

const CostumerAccountDetails = ({ accountDetails }) => {

    const [historyOpen, setHistoryOpen] = useState(false)
    const [showPaymentUpdateForm, setShowPaymentUpdateForm] = useState(false)

    const toggleHistoryBox = () =>{
        setHistoryOpen(!historyOpen)
    }

    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString('en-US', options);
    };
    const paymentHistory = accountDetails.accountHistory || [];
    const sortedPaymentHistory = [...paymentHistory].sort((a, b) => {
        const dateComparison = new Date(b.date) - new Date(a.date);
        if (dateComparison === 0) {
          return b._id.localeCompare(a._id);
        }
        return dateComparison;
      }); 
      const toggleFormVisibility = () => {
        setShowPaymentUpdateForm(prevState => !prevState);
      }
    return (
        <div className="bg-[#FFFBFA] p-4 rounded-lg">
        {showPaymentUpdateForm && <Backdrop showBackdrop={true}/>}
                <div key={history._id} className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 historyRow p-3">
                    <div onClick={toggleFormVisibility} className="updatePaymentFromAccount absolute right-0">
                        <div className="py-3 px-4 flex items-center justify-center hover:bg-[#0c8b3f2a] transition-all cursor-pointer border text-[#0C8B3F] border-[#0C8B3F] w-full rounded-lg">
                            <span>Update</span>
                        </div>
                    </div>
                    {showPaymentUpdateForm && <aside className="absolute z-[20] -right-8 w-screen sm:w-auto sm:mr-8 -mt-8">
                            <UpdateAccountPaymentForm accountDetails={accountDetails} onCloseForm={toggleFormVisibility} />
                    </aside>}
                    
                    <div className="Entry">
                        <div className="text-xs">Code</div>
                        <div className="text-sm font-semibold">{accountDetails.uniqueCode}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Costumer Name</div>
                        <div className="text-sm font-semibold">{accountDetails.customerName}</div>
                    </div>
                    <div className="VisaTime">
                        <div className="text-xs">Phone #</div>
                        <div className="text-sm font-semibold">{accountDetails.phoneNo}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Date</div>
                        <div className="text-sm font-semibold">{formatDate(accountDetails.timestamp)}</div>
                    </div>

                    {accountDetails.profileHiringStatus === "Return" ? <div className="Entry">
                        <div className="text-xs">Return Amount</div>
                        <div className="text-sm font-semibold">{accountDetails.returnAmount}</div>
                    </div> : <div className="Entry">
                        <div className="text-xs">Total Amount</div>
                        <div className="text-sm font-semibold">{accountDetails.totalAmount}</div>
                    </div>}
                    
                    <div className="Entry">
                        <div className="text-xs">Received Amount</div>
                        <div className="text-sm font-semibold">{accountDetails.receivedAmount}</div>
                    </div>
                    {accountDetails.profileHiringStatus === "Return" ? <div className="Entry">
                        <div className="text-xs">Remaining Amount</div>
                        <div className="text-sm font-semibold">{accountDetails.receivedAmount - accountDetails.returnAmount}</div>
                    </div> : <div className="Entry">
                        <div className="text-xs">Remaining Amount</div>
                        <div className="text-sm font-semibold">{accountDetails.totalAmount - accountDetails.receivedAmount}</div>
                    </div>}
                    
                    <div className="Entry">
                        <div className="text-xs">Profile Name</div>
                        <div className="text-sm font-semibold">{accountDetails.profileName}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Profile Id</div>
                        <div className="text-sm font-semibold">{accountDetails.profileCode}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Profile Status</div>
                        <div className="text-sm font-semibold">{accountDetails.profileHiringStatus}</div>
                    </div>
                </div>
                <hr />
                {paymentHistory.length > 0 && 
                                <div onClick={toggleHistoryBox} className="extensionHistoryAction bg-[#F0F0F0] rounded p-4 cursor-pointer flex items-center justify-between my-4">
                                    <div className="inline-block">
                                            <div className="ctaBtn flex items-center justify-center text-sm font-semibold cursor-pointer text-[#262F32]">
                                                Payment History {paymentHistory.length}
                                            </div>
                                    </div>
                                    <div className="">
                                        <span className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M17 10L12 15L7 10" stroke="#434146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        </span>
                                    </div>
                                </div>
                            }

                            {historyOpen && <div className="extensionHistory">
                                    <div className="historyBoxes bg-[#F2F2F2] p-4 rounded-lg">
                                        {sortedPaymentHistory.map(history => (
                                            <CostumerPaymentHistory key={history._id} paymentHistory={history} formatDate={formatDate}/>
                                        ))}

                                    </div>
                                </div>}
        </div>
    );
};

export default CostumerAccountDetails;
