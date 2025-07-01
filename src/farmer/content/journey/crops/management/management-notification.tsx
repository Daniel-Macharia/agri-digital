import { ManagementNotificationProps } from "../crops-models";
import "./management-notification.css";

export default function ManagementNotification( data: ManagementNotificationProps)
{
    const render = () => {
        return (<>
        <div id="management-notificationmmm"
        className="card col-sm-8 col-sm-12"
        >
            <h3 id="management-notification-name"
            className="management-notification-item body-regular"
            >
                {data.name}
            </h3>

            <h3 id="management-notification-description"
            className="management-notification-item h3-semibold"
            >
                {data.description}
            </h3>

            <p id="management-notification-details"
            className="management-notification-item small-regular"
            >
                {data.details}
            </p>
        </div>
        </>);
    };

    return render();
};