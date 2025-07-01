import { OnelineNotificationItemProps } from "../crops-models";
import OnelineNotificationItem from "./oneline-notification-item";
import "./oneline-notifications.css";

const OnelineNotifications: React.FC = () => {
    let onelineNotifications: OnelineNotificationItemProps[] = [
        {"notificationDescription": "Cold storage temperature is too high. Adjust immediately.",
          "urgency": 2
        },
        {"notificationDescription": "Nairobi wholesalers seeking 10,000 Kg of Grade 1 tomatoes.",
          "urgency": 1
        },
        {"notificationDescription": "Truck will arrive at your location on 2025/02/18",
          "urgency": 0
        }
    ];
    const render = () => {
        return (<>
        <div className="col-sm-12 oneline-notifications-container">
            <h3 className="col-sm-12 h3-semibold oneline-notifications-title" >
                Notifications
            </h3>
            <div className="col-sm-12">
                {
                    onelineNotifications.map( notification => <OnelineNotificationItem 
                        notificationDescription={notification.notificationDescription} 
                        urgency={notification.urgency}
                        />)
                }
            </div>
        </div>
        </>);
    };

    return render();
};

export default OnelineNotifications;