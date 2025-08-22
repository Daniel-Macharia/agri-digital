import { HomeOverviewNavigation } from "../../../farmer/content/home/home-model";
import HomeArticlesOverview from "../../../farmer/content/home/overview/articles-overview";


const VendorHomeArticles: React.FC<HomeOverviewNavigation> = (overviewNavigation: HomeOverviewNavigation) => 
{
    return(<>
    <HomeArticlesOverview viewMoreUrl={overviewNavigation.viewMoreUrl} backUrl={overviewNavigation.backUrl} />
    </>);

};

export default VendorHomeArticles;