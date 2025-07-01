import { CropsNotificationProps } from "../crops-models";
import "./crops-notification.css";

export default function CropsNotification(data: CropsNotificationProps){
    const render = ()=>{

        return (<>
        <div className="notification-container col-sm-12">
            <img src={data.iconUrl} />
            <p>
                {data.message}
            </p>
        </div>
        </>);
    };
    return render();
};