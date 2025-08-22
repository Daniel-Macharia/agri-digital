import HomeAdvertChain from "../../../farmer/content/home/home-advert-chain";
import { VENDOR_ROUTES } from "../../vendor-routes";
import VendorHomeArticles from "./vendor-home-articles";
import VendorHomeCalendar from "./vendor-home-calendar-overview";
import VendorHomeMarketplace from "./vendor-home-market-place";
import VendorHomeMyProducts from "./vendor-home-my-products";
import VendorHomeMyServices from "./vendor-home-my-services";
import VendorHomeNotifications from "./vendor-home-notification";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";
import VendorHomeStockSalesAndLevelOverview from "./vendor-home-stock-overview";
import VendorHomeSummaries from "./vendor-home-summaries";
import VendorHomeTraining from "./vendor-home-training";

const VendorHome: React.FC = () => {

    return (<>
    <div className="col-12">
        <div className={`col-12`}>
            <HomeAdvertChain />
        </div>

        <div className="col-12" >
            <VendorHomeSummaries />
        </div>

        <div className="row p-0 m-0 mt-3">
            <div className="col-12 col-md-8 p-0 pe-md-2 m-0" >
                <div className="col-12 vendor-item-container bg-white p-3">
                    <VendorHomeMyProducts />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeMyServices viewMoreUrl={VENDOR_ROUTES.FULL.VENDOR_MY_SERVICES_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeMarketplace viewMoreUrl={VENDOR_ROUTES.FULL.VENDOR_MARKET_PLACE_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeStockSalesAndLevelOverview viewMoreUrl={VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_STOCK_SALES_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>
            </div>

            <div className="col-12 col-md-4 p-0 ps-md-2 m-0">
                <div className="col-12 mt-3 mt-md-0 vendor-item-container bg-white p-3">
                    <VendorHomeCalendar viewMoreUrl={VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_CALENDAR_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeArticles viewMoreUrl={VENDOR_ROUTES.FULL.VENDOR_RESOURCES_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeTraining viewMoreUrl={VENDOR_ROUTES.FULL.VENDOR_RESOURCES_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeNotifications viewMoreUrl={VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_NOTIFICATIONS_FULL} backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} />
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default VendorHome;