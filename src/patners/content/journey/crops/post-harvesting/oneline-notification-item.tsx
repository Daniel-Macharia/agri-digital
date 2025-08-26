import { OnelineNotificationItemProps } from "../crops-models";

const OnelineNotificationItem: React.FC<OnelineNotificationItemProps> = (item: OnelineNotificationItemProps) => {
    
    
    return (<>
    <div className="col-12"
    >
        <div className="row my-1">
            <div className="col-2 align-items-center justify-content-center my-0">
                <input
                className="col-12"
                type="radio"
                readOnly={true}
                checked={true}
                />
            </div>

            <div className="col-10 align-items-center my-0">
                <p className="body-regular primary-text col-12 my-1 crops-start-aligned-text"
                >
                    {item.notificationDescription}
                </p>
            </div>
        </div>
    </div>
    </>);
};

export default OnelineNotificationItem;