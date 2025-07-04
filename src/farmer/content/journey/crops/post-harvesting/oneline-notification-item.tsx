import { OnelineNotificationItemProps } from "../crops-models";
import "./oneline-notification-item.css";

const OnelineNotificationItem: React.FC<OnelineNotificationItemProps> = (item: OnelineNotificationItemProps) => {
    const render = () => {
        return (<>
        <div className="row col-sm-12 oneline-notification-item-container"
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}
        >
            <input
            className="col-sm-1 oneline-notification-item-urgency"
            
            type="radio"
            readOnly={true}
            checked={true}
            />

            <p className="small-regular col-sm-11 oneline-notification-item-description"
            
            >
                {item.notificationDescription}
            </p>
        </div>
        </>);
    };

    return render();
};

export default OnelineNotificationItem;