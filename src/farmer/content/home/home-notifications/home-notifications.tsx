import { useNavigate } from "react-router-dom";
import CropsNotification from "../../journey/crops/crops-notification/crops-notification";
import { GeneralNotificationProps, OrdertNotificationItemProps, SponsorshipNotificationItemProps } from "./home-notifications-models";
import SponsorshipNotificationItem from "./sponsorship-notification";
import OrderNotificationItem from "./order-notification";
import GeneralNotificationItem from "./general-notification";
import { useEffect, useState } from "react";
import { HomeNotificationType } from "./home-enums";
import { FARMER_HOME_ROUTES } from "../home-routes";


const HomeNotifications: React.FC = () => {
    const navigate = useNavigate();

    type NotificationItem = SponsorshipNotificationItemProps | OrdertNotificationItemProps | GeneralNotificationProps;

    const notifications: NotificationItem[] = [];

    for( let i = 0; i < 25; i++ )
    {
        notifications.push({
            username: `Millicent ${i + 1}`,
            receivedAt: new Date(2025, 11, 24, 5, 28),
            orderItemName: "organic tomatoes",
            notificationDesc: "Looking for fresh organic tomatoes for a local restaurant. Need regular supply.",
            orderBudget: 300,
            orderUnitCount: 10,
            orderUnitName: "Kg",
            orderStatus: "rejected",
            notificationType: HomeNotificationType.ORDER_NOTIFICATION,
        });

    notifications.push({
        bankName: `AgriGrow Foundation ${i + 1}`,
        notificationTitle: "Inrtervention Name",
        notificationDesc: "Your sponsorship request has been accepted! We’re excited to support you.",
        sponsorshipAmount: 25000,
        receivedAt: new Date(2025, 11, 25, 4, 50),
        sponsorshipStatus: "accepted",
        notificationType: HomeNotificationType.SPONSORSHIP_NOTIFICATION,
        sponsorshipType: "voucher"
    });

    notifications.push({
        notificationDesc: `This is a new notification type ${i + 1}`,
        receivedAt: new Date(2025, 11, 24, 6, 38),
        notificationType: HomeNotificationType.GENERAL_NOTIFICATION
    });
    }

    const handleGoBackHome = () => {
        navigate(`${FARMER_HOME_ROUTES.HOME_FULL}`);
    };


    const [listData, setListData] = useState<NotificationItem[]>(notifications);
    const sortOptions: string[] = ["request", "time"];
    const [sortBy, setSortBy] = useState<string>(sortOptions[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);
    
    let dataSize: number = notifications.length;
    let pageSize: number = dataSize >= 10 ? 10 : dataSize;

    let numberOfPages: number = Math.trunc(dataSize / pageSize);
    
    if( numberOfPages === 0 )
        numberOfPages = 1;
    else if( (numberOfPages * pageSize) < dataSize )
        numberOfPages = numberOfPages + 1;

    console.log(numberOfPages);
    const pages: number[] = [];

    for( let count = 1; count <= numberOfPages; count++ )
    {
        pages.push(count);
    }

    useEffect(() => {
        dataSize = listData.length;
        //setCurrentStartIndex(0);
        pageSize = dataSize >= 10 ? 10 : dataSize;
    }, [listData]);

    useEffect(() => {
        //toast("sort altered");
        setListData(listData.sort((notification1, notification2) => {
            switch(sortBy)
            {
                case "time":
                    if(notification1.receivedAt < notification2.receivedAt)
                        return -1;
                    else if( notification1.receivedAt === notification2.receivedAt)
                            return 0;

                    else
                        return 1;
                case "request":
                    if( notification1.notificationType < notification2.notificationType)
                            return -1;
                    else if( notification1.notificationType == notification2.notificationType)
                            return 0;
                    else
                        return 1;
                default:
                    return 0;
            }
            }
        ));
    listData.forEach(item => console.log(item));
    }, [sortBy]);
    
    const handleMoveToNext = () => {
        console.log("moving to the next page");
        setCurrentPage( (currentPage < numberOfPages) ? (currentPage + 1) : 1)
    }

    useEffect( () => {
        const startIndex: number = Math.trunc( currentPage * pageSize) - pageSize;
        const endIndex: number = Math.trunc(currentPage * pageSize);

        setCurrentStartIndex(startIndex);

        setListData(notifications.slice( startIndex, endIndex));
    }, [currentPage]);

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
            <div className="row m-0 p-2 justify-content-end align-items-center">
                <p className="m-0 p-0 body-regular"
                style={{width: "max-content"}}>
                    {`Showing ${currentStartIndex + 1} to ${ currentStartIndex + listData.length} of ${dataSize} Notifications`}
                </p>
                <div className="m-0"
                style={{width: "max-content"}}>
                    <div className="row p-0 m-0" 
                    style={{width: "max-content"}}>
                        <p className=" m-0 p-2 invite-end-aligned-text body-regular"
                        style={{width: "max-content"}}>
                            Sort by: 
                        </p>
                        <select 
                        className="m-0 p-0 body-bold"
                        onChange={(event) => {
                            const value = event.target?.value;
                            //toast.info(`Selected: ${value}`);
                            setSortBy(value);
                        }}
                        
                        style={{
                            width: "max-content",
                            backgroundColor: "var(--Background, #F5F5F5)",
                            borderStyle: "none",
                            borderRadius: "4px", 
                        }}
                        >
                            {
                                sortOptions.map( (sortOption, index) => <option 
                                key={index} 
                                value={sortOption}
                                className="m-0 p-1"
                                style={{
                                    backgroundColor: "var(--Background, #F5F5F5)",
                                    borderStyle: "none"
                                }}
                                >
                                    {sortOption}
                                </option>)
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="col-12">
                {
                    listData.map((notification) => 
                        {
                            if( notification.notificationType === HomeNotificationType.SPONSORSHIP_NOTIFICATION )
                            {
                                
                                return (<SponsorshipNotificationItem 
                                data={notification}
                                /> );
                            }
                            else if(notification.notificationType == HomeNotificationType.ORDER_NOTIFICATION)
                            {
                                return (<OrderNotificationItem 
                                data={notification} 
                                />);
                            }
                            else if(notification.notificationType == HomeNotificationType.GENERAL_NOTIFICATION)
                            {
                                return (<GeneralNotificationItem 
                                data={notification} 
                                />);
                            }
                    })
                
                
                }
            </div>

            <div className="row m-0 p-0 justify-content-center">
                {
                    pages.map( (pageNumber, index) => 
                        <div className=" body-medium p-2 m-2 text-align-center"
                        style={{color: " var(--Primary, #457900)", 
                        backgroundColor: ( (index + 1) == currentPage ) ? "var(--Accent, #DAFFE7)" : "#ffffff",
                        borderStyle: "none",
                        borderRadius: "8px",
                        width: "40px",
                        textAlign: "center"}}
                        
                        onClick={() => {
                            setCurrentPage(index + 1);
                        }}
                        >
                            {pageNumber}
                        </div>
                    )
                }

                <div className="col-1 m-0">
                    <button 
                    className="small-medium m-2"
                    style={{
                        color: "var(--cards-form-bg, #FFF)",
                        borderStyle: "none",
                        borderRadius: "8px",
                        padding: "8px",
                        backgroundColor: "var(--Primary, #457900)"
                    }}
                    onClick={handleMoveToNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default HomeNotifications;