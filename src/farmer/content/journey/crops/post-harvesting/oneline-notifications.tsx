import { OnelineNotificationItemProps } from "../crops-models";
import OnelineNotificationItem from "./oneline-notification-item";

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
        <div className="col-12 pb-0" >
            <h3 className="col-12 h3-bold primary-text crops-start-aligned-text my-0 pb-0" >
                Notifications
            </h3>
            <div className="col-12 mb-0" >
                {
                    onelineNotifications.map( notification => <div className="col-12">
                        <OnelineNotificationItem 
                        notificationDescription={notification.notificationDescription} 
                        urgency={notification.urgency}
                        />
                        </div>)
                }
            </div>
        </div>
        </>);
    };

    return render();
};

export default OnelineNotifications;