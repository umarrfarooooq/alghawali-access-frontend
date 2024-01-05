import { Link } from "react-router-dom";

const AccountsPaymentHistory = ({ accountDetails }) => {
    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString('en-US', options);
    };
    return (
        <>
                <div key={history._id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:grid-cols-6 historyRow p-3">
                    <div className="Entry">
                        <div className="text-xs">Costumer Name</div>
                        <div className="text-sm font-semibold">{accountDetails.fullName}</div>
                    </div>
                    <div className="VisaTime">
                        <div className="text-xs">Payment Method</div>
                        <div className="text-sm font-semibold">{accountDetails.paymentMethod}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Date</div>
                        <div className="text-sm font-semibold">{formatDate(accountDetails.hiringDate)}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Received Amount</div>
                        <div className="text-sm font-semibold">{accountDetails.advanceAmount}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Received By</div>
                        <div className="text-sm font-semibold">{accountDetails.receivedBy}</div>
                    </div>
                    <div className="Entry justify-self-end">
                    <Link to={`/details/${accountDetails.maidId}`}>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4.99927L19 11.9993L12 18.9993" stroke="#031D92" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 11.9993L19 11.9993" stroke="#031D92" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                    </div>
                </div>
                <hr />
        </>
    );
};

export default AccountsPaymentHistory;
