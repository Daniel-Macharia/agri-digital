import { HomeOverviewNavigation } from "../../../farmer/content/home/home-model";
import HomeTrainingOverview from "../../../farmer/content/home/overview/training-overview";


const VendorHomeTraining: React.FC<HomeOverviewNavigation> = (overviewNavigation: HomeOverviewNavigation) => 
{
    return(<>
    <HomeTrainingOverview viewMoreUrl={overviewNavigation.viewMoreUrl} backUrl={overviewNavigation.backUrl} />
    </>);

};

export default VendorHomeTraining;