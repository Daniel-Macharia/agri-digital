import { CropsNotificationProps } from "../crops-models";
import "./crops-notification.css";

export default function CropsNotification(data: CropsNotificationProps){
    return (<>
    <div className="notification-container col-12">
        <img src={data.iconUrl} />
        <p>
            {data.message}
        </p>
    </div>
    </>);
};