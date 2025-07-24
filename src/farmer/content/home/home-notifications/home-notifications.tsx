import { useNavigate } from "react-router-dom";
import CropsNotification from "../../journey/crops/crops-notification/crops-notification";
import { OrdertNotificationItemProps, SponsorshipNotificationItemProps } from "./home-notifications-models";
import SponsorshipNotificationItem from "./sponsorship-notification";
import OrderNotificationItem from "./order-notification";


const HomeNotifications: React.FC = () => {
    const navigate = useNavigate();

    // let notifications: HomeNotificationItemProps[] = [
    // {
    //     receivedAt: "3",
    //     notificationTitle: "Looking for organic tomatoes 10Kg",
    //     notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
    // },
    // {
    //     notificationTitle: "Inrtervention Name",
    //     notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
    //     receivedAt: "3"
    // },
    // {
    //     receivedAt: "3",
    //     notificationTitle: "Looking for organic tomatoes 10Kg",
    //     notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
    // },
    // {
    //     notificationTitle: "Inrtervention Name",
    //     notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
    //     receivedAt: "3",
    // },
    // {
    //     receivedAt: "3",
    //     notificationTitle: "Looking for organic tomatoes 10Kg",
    //     notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
    // },
    // {
    //     notificationTitle: "Inrtervention Name",
    //     notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
    //     receivedAt: "3",
    // }
    // ];

    type NotificationItem = SponsorshipNotificationItemProps | OrdertNotificationItemProps;

    let notifications: NotificationItem[] = [];
    let o1: OrdertNotificationItemProps = {
        username: "Millicent",
        receivedAt: "3",
        orderItemName: "organic tomatoes",
        notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
        orderBudget: 300,
        orderUnitCount: 10,
        orderUnitName: "Kg",
        orderStatus: "new",
        notificationType: "order",
    };
    let s1: SponsorshipNotificationItemProps ={
        bankName: "AgriGrow Foundation",
        notificationTitle: "Inrtervention Name",
        notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
        sponsorshipAmount: 25000,
        receivedAt: "3",
        sponsorshipStatus: "accepted",
        notificationType: "sponsorship",
        sponsorshipType: "voucher"
    };
    let o2: OrdertNotificationItemProps ={
        username: "Millicent 2",
        receivedAt: "3",
        orderItemName: "organic tomatoes",
        notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
        orderBudget: 300,
        orderUnitCount: 10,
        orderUnitName: "Kg",
        orderStatus: "negotiating",
        notificationType: "order",
    };
    let s2: SponsorshipNotificationItemProps = {
        bankName: "AgriGrow Foundation 2",
        notificationTitle: "Inrtervention Name",
        notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
        sponsorshipAmount: 25000,
        receivedAt: "3",
        sponsorshipStatus: "accepted",
        notificationType: "sponsorship",
        sponsorshipType: "other"
    };
    let o3: OrdertNotificationItemProps = {
        username: "Millicent 3",
        receivedAt: "3",
        orderItemName: "organic tomatoes",
        notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
        orderBudget: 300,
        orderUnitCount: 10,
        orderUnitName: "Kg",
        orderStatus: "rejected",
        notificationType: "order",
    };
    let s3: SponsorshipNotificationItemProps = {
        bankName: "AgriGrow Foundation 3",
        notificationTitle: "Inrtervention Name",
        notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
        sponsorshipAmount: 25000,
        receivedAt: "3",
        sponsorshipStatus: "accepted",
        notificationType: "sponsorship",
        sponsorshipType: "voucher"
    };

    notifications.push(o1);
    notifications.push(s1);
    notifications.push(o2);
    notifications.push(s2);
    notifications.push(o3);
    notifications.push(s3);

    const handleGoBackHome = () => {
        alert("going back Home");
        navigate("/farmer/home");
    };

    return (<>
    <div className="col-12">
        <div className="col-12 d-flex justify-content-start">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="col-12 my-3" >
            <CropsNotification iconUrl="/assets/images/warning.svg"
            message={"Use ventilated plastic crates for tomatoes to reduce spoilage"}/>
        </div>

        <div className="col-12">
            <div className="col-12">
                <p className="col-12">
                    Notifications
                </p>
            </div>

            <div className="col-12">
                {
                    // notifications.map( (notification, index: number) => <><HomeNotificationItem 
                    // notificationTitle={notification.notificationTitle} 
                    // notificationDesc={notification.notificationDesc} 
                    // receivedAt={notification.receivedAt} /></> (index < (notifications.length - 1)) ? <hr/> : "")
                
                
                    notifications.map((notification) => 
                        {
                            if( notification.notificationType === "sponsorship" )
                            {
                                
                                return (<SponsorshipNotificationItem 
                                data={notification}
                                /> );
                            }
                            else if(notification.notificationType == "order")
                            {
                                return (<OrderNotificationItem 
                                data={notification} 
                                />);
                            }
                    })
                
                
                }
            </div>
        </div>
    </div>
    </>);
};

export default HomeNotifications;