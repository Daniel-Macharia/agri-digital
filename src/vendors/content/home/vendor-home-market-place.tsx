import { HomeOverviewNavigation } from "../../../farmer/content/home/home-model";
import MarketPlaceOverview from "../../../farmer/content/home/overview/market-place-overview";


const VendorHomeMarketplace: React.FC<HomeOverviewNavigation> = (overviewNavigation: HomeOverviewNavigation) => {

    return (<>
    <MarketPlaceOverview viewMoreUrl={overviewNavigation.viewMoreUrl} backUrl={overviewNavigation.backUrl} />
    </>);
};

export default VendorHomeMarketplace;