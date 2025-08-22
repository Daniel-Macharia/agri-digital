import { useMemo, useState } from "react";
import { CROP_ROUTES } from "../crop-routes";
import CropsTopBarItem from "./top-bar-item";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";

interface TopBarItemProps {
  iconUrl: string;
  itemName: string;
  pageUrl: string;
}

const CropsTopBar: React.FC = () => {
  const { transactionId } = useCropJourney();

    const [selectedTab, setSelectedTab] = useState<string>("Soil Testing");

     const topBarItems: TopBarItemProps[] = useMemo(() => {
    return [
      {
        iconUrl: "/assets/images/soil-testing.svg",
        itemName: "Soil Testing",
        pageUrl:
          `${CROP_ROUTES.FULL.CROP_SOIL_TESTING_FULL}`.replace(
            ":transactionId",
            transactionId || ""
          ),
      },
      {
        iconUrl: "/assets/images/planting.svg",
        itemName: "Planting",
        pageUrl:
          `${CROP_ROUTES.FULL.CROP_PLANTING_FULL}`.replace(
            ":transactionId",
            transactionId || ""
          ),
      },
      {
        iconUrl: "/assets/images/management.svg",
        itemName: "Management",
        pageUrl:
          `${CROP_ROUTES.FULL.CROP_MANAGEMENT_FULL}`.replace(
            ":transactionId",
            transactionId || ""
          ),
      },
      {
        iconUrl: "/assets/images/harvest.svg",
        itemName: "Harvesting",
        pageUrl: `${CROP_ROUTES.FULL.CROP_HARVEST_FULL}`.replace(
          ":transactionId",
          transactionId || ""
        ),
      },
      {
        iconUrl: "/assets/images/post-harvest.svg",
        itemName: "Post Harvesting",
        pageUrl:
          `${CROP_ROUTES.FULL.CROP_POST_HARVESTING_FULL}`.replace(
            ":transactionId",
            transactionId || ""
          ),
      },
      {
        iconUrl: "/assets/images/sale.svg",
        itemName: "Sales",
        pageUrl: `${CROP_ROUTES.FULL.CROP_SALES_FULL}`.replace(
          ":transactionId",
          transactionId || ""
        ),
      },
    ];
  }, [transactionId]);

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
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    />
                </div>)
            }
        </div>
      </div>
    </>
  );
};

export default CropsTopBar;
