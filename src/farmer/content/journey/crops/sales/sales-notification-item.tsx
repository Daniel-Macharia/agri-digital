import { SalesNotificationItemProps } from "../crops-models";


const SalesNotificationItem: React.FC<SalesNotificationItemProps> = (salesNotification: SalesNotificationItemProps ) => {

    const render = () => {
        return (
            <>
            <div className="row mb-2"
            >
                <div className="col-2">
                    <img src={salesNotification.iconUrl} 
                    style={{width: "24px", height: "24px"}}
                    />
                </div>

                <div className="col-7">
                    <p
                    className="body-medium primary-text crops-start-aligned-text col-12 my-0"
                    >
                        {salesNotification.itemName}
                    </p>

                    <p className="body-regular secondary-text crops-start-aligned-text col-12 my-0"
                    style={{marginTop: '0px'}}
                    >
                        {salesNotification.itemDescription}
                    </p>
                </div>

                <div className="col-3">
                    <p className="body-regular secondary-text crops-start-aligned-text col-12 my-0"
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