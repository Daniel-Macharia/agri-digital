import { SalesNotificationItemProps } from "../crops-models";


const SalesNotificationItem: React.FC<SalesNotificationItemProps> = (salesNotification: SalesNotificationItemProps ) => {

    const render = () => {
        return (
            <>
            <div className="row col-sm-12"
            >
                <div className="col-sm-2">
                    <img src={salesNotification.iconUrl} 
                    />

                </div>

                <div className="col-sm-6">
                    <p
                    className="small-semibold left-aligned-text"
                    >
                        {salesNotification.itemName}
                    </p>

                    <p className="small-regular left-aligned-text"
                    style={{marginTop: '0px'}}
                    >
                        {salesNotification.itemDescription}
                    </p>
                </div>

                <div className="col-sm-4">
                    <p className="col-sm-12 small-regular left-aligned-text"
                    >
                        {salesNotification.timeReceived} ago
                    </p>
                </div>
            </div>
            </>
        );
    };

    return render();
};

export default SalesNotificationItem;