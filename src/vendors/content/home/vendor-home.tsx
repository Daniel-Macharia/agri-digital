import HomeAdvertChain from "../../../farmer/content/home/home-advert-chain";
import VendorHomeArticles from "./vendor-home-articles";
import VendorHomeCalendar from "./vendor-home-calendar-overview";
import VendorHomeMarketplace from "./vendor-home-market-place";
import VendorHomeMyProducts from "./vendor-home-my-products";
import VendorHomeMyServices from "./vendor-home-my-services";
import VendorHomeNotifications from "./vendor-home-notification";
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
                    <VendorHomeMyServices />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeMarketplace />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeStockSalesAndLevelOverview />
                </div>
            </div>

            <div className="col-12 col-md-4 p-0 ps-md-2 m-0">
                <div className="col-12 mt-3 mt-md-0 vendor-item-container bg-white p-3">
                    <VendorHomeCalendar />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeArticles />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeTraining />
                </div>

                <div className="col-12 mt-3 vendor-item-container bg-white p-3">
                    <VendorHomeNotifications />
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default VendorHome;