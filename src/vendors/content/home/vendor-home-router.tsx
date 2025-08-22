import { Route, Routes } from "react-router-dom";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";
import NotFound from "../../../common/exceptions/NotFound";
import VendorHome from "./vendor-home";
import VendorTrackOrder from "./vendor-home-track-orders";
import VendorHomeStockSalesAndLevelDetails from "./vendor-home-stock-details";
import VendorHomeDetailedCalendar from "./vendor-home-calendar-details";
import HomeOrders from "../../../farmer/content/home/home-orders";
import HomeNotifications from "../../../farmer/content/home/home-notifications/home-notifications";



const HomeRouter: React.FC = () => {

    return (<>
    <div className="col-12">
        <Routes >
            <Route path={VENDOR_HOME_ROUTES.VENDOR_HOME_TRACK_ORDER} element={<VendorTrackOrder />} />
            <Route path={VENDOR_HOME_ROUTES.VENDOR_HOME_STOCK_SALES} element={<VendorHomeStockSalesAndLevelDetails />} />
            <Route path={VENDOR_HOME_ROUTES.VENDOR_HOME_CALENDAR} element={<VendorHomeDetailedCalendar />} />
            <Route path={VENDOR_HOME_ROUTES.VENDOR_HOME_ORDERS} element={<HomeOrders />} />
            <Route path={VENDOR_HOME_ROUTES.VENDOR_HOME_NOTIFICATIONS} element={<HomeNotifications />} />

            <Route path={VENDOR_HOME_ROUTES.HOME} element={<VendorHome />} />
            
            <Route path={VENDOR_HOME_ROUTES.HOME_OTHER} element={<NotFound />} />
        </Routes>
    </div>
    </>);
};

export default HomeRouter;