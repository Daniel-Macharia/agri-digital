import React from "react";
import HomeNotificationOverview from "../../../farmer/content/home/overview/notification-overview";
import { HomeOverviewNavigation } from "../../../farmer/content/home/home-model";


const VendorHomeNotifications: React.FC<HomeOverviewNavigation> = (overviewNavigation: HomeOverviewNavigation) => 
{
    return(<>
    <HomeNotificationOverview viewMoreUrl={overviewNavigation.viewMoreUrl} backUrl={overviewNavigation.backUrl}  />
    </>);

};

export default VendorHomeNotifications;