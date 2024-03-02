const ExtensionHistory = ({ history, formatDate,calculateVisaDuration }) => {
    return (
        <>
                <div key={history._id} className="historyRow p-3 flex items-center justify-between flex-wrap gap-2">
                    
                    <div className="VisaTime">
                        <div className="text-xs">Visa Duration</div>
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
