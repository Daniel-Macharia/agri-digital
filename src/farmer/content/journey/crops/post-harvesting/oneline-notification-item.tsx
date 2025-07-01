import { OnelineNotificationItemProps } from "../crops-models";
import "./oneline-notification-item.css";

const OnelineNotificationItem: React.FC<OnelineNotificationItemProps> = (item: OnelineNotificationItemProps) => {
    const render = () => {
        return (<>
        <div className="row oneline-notification-item-container">
            <input
            className="col-sm-1 oneline-notification-item-urgency"
            type="radio"
            readOnly={true}
            checked={true}
            />

            <p className="small-regular col-sm-10 oneline-notification-item-description">
                {item.notificationDescription}
            </p>
        </div>
        </>);
    };

    return render();
};

export default OnelineNotificationItem;