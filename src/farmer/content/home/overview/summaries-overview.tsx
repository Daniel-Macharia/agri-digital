import { useNavigate } from "react-router-dom";
import { HomeSummaryItemProps } from "../home-model";
import { FARMER_HOME_ROUTES } from "../home-routes";
import { FARMER_ROUTES } from "../../../farmer-routes";


const HomeSummaryItem: React.FC<HomeSummaryItemProps> = ( data: HomeSummaryItemProps) => {
    const navigate = useNavigate();

    return (<>
    <div className="col-12 farmer-home-container bg-white "
    style={{height: "100%"}}
    onClick={() => navigate(`.${data.detailsUrl}`)}
    >

        <h1 className="body-semibold secondary-text my-0">
            {data.itemTitle}
        </h1>
        <p className="h2-bold primary-text my-2">
            {data.itemCount}
        </p>
        <p className="body-small secondary-text my-0">
            {data.itemDesc}
        </p>

    </div>
    </>);
};



const SummariesOverview: React.FC = () => {
    const homeSummaries: HomeSummaryItemProps[] = [
        {
            itemTitle: "Pending orders", 
            itemCount: 2, 
            itemDesc: "You have pendinig orders awaiting your actions",
            detailsUrl: FARMER_HOME_ROUTES.HOME_ORDERS
        },
        {
            itemTitle: "Tasks due", 
            itemCount: 3, 
            itemDesc: "Pending activities",
            detailsUrl: FARMER_HOME_ROUTES.HOME_TASKS
        },
        {
            itemTitle: "Quality score", 
            itemCount: 4.8, 
            itemDesc: "Your rating is average. Improve to grow business.",
            detailsUrl: `.${FARMER_ROUTES.QUALITY_SCORE}`
        },
    ];
    return (<>
    <div className="col-12 p-0 m-0 mx-0 px-0" >
        <div className="row p-0 m-0">
            {
                homeSummaries.map( (summary, index: number) => <div 
                className={`col-12 col-md-4 mt-2 mt-md-0 px-0 ${ (index == 0 ? "ps-0" : "ps-0 ps-md-1") } ${ ( index == 2) ? "pe-0" : "pe-0 pe-md-1"}`}>
                    <HomeSummaryItem 
                    itemTitle={summary.itemTitle} 
                    itemCount={summary.itemCount} 
                    itemDesc={summary.itemDesc}
                    detailsUrl={summary.detailsUrl}
                    />
                </div>)
            }
        </div>
    </div>
    </>);
};

export default SummariesOverview;