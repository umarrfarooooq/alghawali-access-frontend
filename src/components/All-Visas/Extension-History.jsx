const ExtensionHistory = ({ history, formatDate,calculateVisaDuration }) => {
    return (
        <>
                <div key={history._id} className="historyRow p-3 flex items-center justify-between flex-wrap">
                    <div className="Entry">
                        <div className="text-xs">Date Entry To Oman</div>
                        <div className="text-sm font-semibold">{formatDate(history.newVisaEntryDate)}</div>
                    </div>
                    <div className="VisaTime">
                        <div className="text-xs">Visa Time</div>
                        <div className="text-sm font-semibold">{calculateVisaDuration(history.newVisaEntryDate, history.newVisaEndDate)}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Extended For</div>
                        <div className="text-sm font-semibold">{formatDate(history.newVisaEndDate)}</div>
                    </div>
                    <div className="Entry">
                        <div className="text-xs">Extension Date</div>
                        <div className="text-sm font-semibold">{formatDate(history.timestamp)}</div>
                    </div>
                </div>
                <hr />
        </>
    );
};

export default ExtensionHistory;
