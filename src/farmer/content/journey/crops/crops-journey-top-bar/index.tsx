import { JOURNEY_ROUTES } from "../../journey-routes";
import { CROP_ROUTES } from "../crop-routes";
import CropsTopBarItem from "./top-bar-item";

interface TopBarItemProps{
    iconUrl: string,
    itemName: string,
    pageUrl: string
};

const CropsTopBar: React.FC = ()=>{

    let topBarItems: TopBarItemProps[] = [
        { iconUrl: "/assets/images/soil-testing.svg", itemName: "Soil Testing", pageUrl: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_SOIL_TESTING}` },
        { iconUrl: "/assets/images/planting.svg", itemName: "Planting", pageUrl: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_PLANTING}` },
        { iconUrl: "/assets/images/management.svg", itemName: "Management", pageUrl: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_MANAGEMENT}` },
        { iconUrl: "/assets/images/harvest.svg", itemName: "Harvesting", pageUrl: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_HARVEST}` },
        { iconUrl: "/assets/images/post-harvest.svg", itemName: "Post Harvesting", pageUrl: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_POST_HARVESTING}` },
        { iconUrl: "/assets/images/sale.svg", itemName: "Sales", pageUrl: `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_SALES}` }
    ];

    return (<>
    <div className="col-12 crops-container mx-0 bg-white"  style={{overflowX: "auto"}}>
        <div className="d-flex" >
            {
                topBarItems.map( topBarItem => <div className="col-4 col-md-2 px-2 " 
                style={{minWidth: "max-content"}}>
                    <CropsTopBarItem 
                    iconUrl={topBarItem.iconUrl} 
                    itemName={topBarItem.itemName}
                    pageUrl={topBarItem.pageUrl} 
                    />
                </div>)
            }
        </div>
    </div>
    </>);
};

export default CropsTopBar;