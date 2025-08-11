import { HomeNotificationItemProps } from "../home-model";
import OverviewHeader from "./overview-header";


export const HomeNotificationItem: React.FC<HomeNotificationItemProps> = (data: HomeNotificationItemProps) => {
    const handleViewDetailsAction = () => {
        console.log("View more details");
    };


    return (
        <div className="col-12 mt-3">
            <div className="col-12">
                <p className="body-regular secondary-text my-0">
                    {data.notificationTitle}
                </p>
            </div>
            <div className="col-12 my-1">
                <p className=" body-regular primary-text my-0">
                    {data.notificationDesc}
                </p>
            </div>
            <div className="col-12">
                <div className="row pe-2">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-2">
                                <img src="/assets/images/home/home_clock.svg" alt="time"
                                className=""
                                style={{width: "20px"}}
                                />
                            </div>
                            <div className="col-10">
                                <p className="small-regular secondary-text">
                                    {data.receivedAt}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="row justify-content-end pe-2">
                            <button
                            className="farmer-home-accept-button farmer-home-end-aligned-text"
                            style={{width: "max-content", borderRadius: "20px"}}
                            onClick={handleViewDetailsAction}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomeNotificationOverview: React.FC = () => {
    const notifications: HomeNotificationItemProps[] = [
        {
            notificationTitle: "AgriFamers",
            notificationDesc: "Wants to buy 500Kg of tomatoes at KES 150/Kg",
            receivedAt: "12 minutes ago"
        },
        {
            notificationTitle: "AgriBank",
            notificationDesc: "Offers Loan of KES 25000 at 4.5% for 36 months",
            receivedAt: "1 hour ago"
        },
        {
            notificationTitle: "AgriFamers",
            notificationDesc: "Wants to buy 500Kg of tomatoes at KES 150/Kg",
            receivedAt: "Yesterday"
        }
    ];

    return (<div className="col-12">
        <OverviewHeader overviewTitle="Notifications" viewMoreUrl="/farmer/home/notifications" />

        <div className="col-12">
            {
                notifications.map((notification, index: number) => <div key={index}><HomeNotificationItem 
                key={index}
                notificationTitle={notification.notificationTitle} 
                notificationDesc={notification.notificationDesc} 
                receivedAt={notification.receivedAt} 
                />

                {(index < (notifications.length - 1)) ? <hr/> : ""}
                </div>)
            }
        </div>
    </div>);
};

export default HomeNotificationOverview;