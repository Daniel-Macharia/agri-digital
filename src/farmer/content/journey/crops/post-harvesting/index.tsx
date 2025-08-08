import { useNavigate } from "react-router-dom";
import ActivityAddAndReview from "../activity/activity";
import { ManagementSummaryProps } from "../crops-models";
import CropsNotification from "../crops-notification/crops-notification";
import ManagementSummary from "../management/management-summary";
import OnelineNotifications from "./oneline-notifications";
import StorageInformation from "./storage-information";
import { JOURNEY_ROUTES } from "../../journey-routes";
import { CROP_ROUTES } from "../crop-routes";

const PostHarvesting: React.FC = ()=>{

    const navigate = useNavigate();

    const sideSummaries: ManagementSummaryProps[] = [
        {"title": "Sorting & Grading", "items": [{"label": "Grade", "value": "Grade 1 (Export)"},
            {"label": "Harvest Date", "value": "2025/02/10"},
            {"label": "Quantity", "value": "25Kg"},
            {"label": "Notes", "value": "--"}]
        },
        {"title": "Packaging", "items": [{"label": "Packaging Method", "value": "Plastic Crates"},
            {"label": "Packaging Costs (KES)", "value": "3,000"}]
        }
    ];

    const otherSummaries: ManagementSummaryProps[] = [
        {"title": "Value Addition", "items": [{"label": "Processing Methods", "value": "Drying"},
            {"label": "Final Product", "value": "--"},
            {"label": "Processing Costs", "value": "KES 12,000"},
            {"label": "Marketing Price", "value": "KES 300/Kg"},
            {"label": "Profitability Analysis", "value": "--"}]
        },
        {"title": "Transport", "items": [{"label": "Method", "value": "Hired Truck"},
            {"label": "Vehicle Type", "value": "Refrigerated Truck"},
            {"label": "Pickup Location", "value": "Kisumu Central"},
            {"label": "Destination", "value": "Nairobi Fresh Produce"},
            {"label": "Estimated Costs", "value": "KES 8,500"}]
        }
    ];

    const handleRequestForService = () => {
        navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {state:`..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_POST_HARVESTING}`});
    };

    const handleContinueAction = () => {
        navigate(`..${CROP_ROUTES.CROP_SALES}`);
    };
    
    
    return (<>
    <div className="col-12">

        <div className="col-12 my-3">
            <CropsNotification iconUrl={"/assets/images/warning.svg"} message={"Use ventilated plastic crates for tomatoes to reducee spoilage"} />
        </div>

        <div className="crops-container m-0">

            <div className="col-12">
                <div className="row justify-content-end my-2">
                    <button className="col-12 col-md-4 crops-accept-button" 
                    onClick={handleRequestForService}
                    >
                        Request for Service
                    </button>
                </div>
            </div>


            <div className="col-12">
                <div className="row">
                    <div className="col-12 col-md-7 mt-2 px-0" >
                        <StorageInformation />
                    </div>

                    <div className="col-12 col-md-5 mt-2 px-0" 
                    style={{
                        height: "100%"
                    }}>
                        {
                            sideSummaries.map( (sideSummary, index) => <div className={`col-12 px-0 ps-md-2 ${(index === (sideSummaries.length-1)) ? "mt-2" : ""}`}>
                                <ManagementSummary 
                                title={sideSummary.title} 
                                items={sideSummary.items} 
                                />
                            </div>)
                        }
                    </div>
                </div>
            </div>

            <div className="col-12 mt-2">
                <div className="row ">
                    {
                        otherSummaries.map( (otherSummary, index) => <div className={`col-12 col-md-4 mt-2 mt-md-0 p-0 px-md-2 ${ index  === 0 ? "ps-md-0" : ""}`}>
                            <ManagementSummary
                            title={otherSummary.title}
                            items={otherSummary.items} />
                        </div>)
                    }

                    <div className="col-12 col-md-4 p-0 ps-0 ps-md-2 mt-2 mt-md-0 m-0 " >
                        <OnelineNotifications />
                    </div>
                </div> 
            </div>

            <div className="col-12 mt-2">
                <ActivityAddAndReview />
            </div>

            <div className="col-12 mt-2">
                <div className="row justify-content-end" >
                    <button 
                    className="col-12 col-md-4 crops-accept-button"
                    onClick={handleContinueAction}
                    >
                    Continue
                    </button>
                </div>
            </div>

        </div>
    </div>
    </>);
}

export default PostHarvesting;