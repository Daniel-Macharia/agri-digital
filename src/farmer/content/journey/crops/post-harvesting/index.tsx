import { useNavigate } from "react-router-dom";
import ActivityAddAndReview from "../activity/activity";
import { ManagementSummaryProps } from "../crops-models";
import CropsNotification from "../crops-notification/crops-notification";
import ManagementSummary from "../management/management-summary";
import "./index.css";
import OnelineNotifications from "./oneline-notifications";
import StorageInformation from "./storage-information";
import "/src/index.css";

const PostHarvesting: React.FC = ()=>{

    const navigate = useNavigate();

    let sideSummaries: ManagementSummaryProps[] = [
        {"title": "Sorting & Grading", "items": [{"label": "Grade", "value": "Grade 1 (Export)"},
            {"label": "Harvest Date", "value": "2025/02/10"},
            {"label": "Quantity", "value": "25Kg"},
            {"label": "Notes", "value": "--"}]
        },
        {"title": "Packaging", "items": [{"label": "Packaging Method", "value": "Plastic Crates"},
            {"label": "Packaging Costs (KES)", "value": "3,000"}]
        }
    ];

    let otherSummaries: ManagementSummaryProps[] = [
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
        navigate("/farmer/projects/crops/request-for-service", {state: "/farmer/projects/crops/post-harvesting"});
    };

    const handleContinueAction = () => {
        navigate("/farmer/projects/crops/sales");
    };
    const render = ()=>{
        return (<>
        <div className="row post-harvest-content-wrapper">
            <CropsNotification iconUrl={"/assets/images/warning.svg"} message={"Use ventilated plastic crates for tomatoes to reducee spoilage"} />

            <div className="row col-sm-12">
                <button className="col-sm-4 offset-8" 
                onClick={handleRequestForService}
                >
                    Request for Service
                </button>
            </div>


            <div className="row col-sm-12">
                <div className="col-sm-10 col-md-7 post-harvest-container" >
                    
                    <StorageInformation />
                    
                </div>

                <div className="col-sm-10 col-md-5 side-summary-container" >
                    {
                        sideSummaries.map( sideSummary => <ManagementSummary 
                            title={sideSummary.title} 
                            items={sideSummary.items} 
                            />)
                    }
                </div>
            </div>

            <div className="row col-sm-12">
                <div className="row col-sm-10 col-md-8" >
                    
                    {
                        otherSummaries.map( otherSummary => <div className="col-sm-6">
                            <ManagementSummary
                            title={otherSummary.title}
                            items={otherSummary.items} />
                        </div>)
                    }

                </div>

                <div className="col-sm-12 col-md-4" >
                    
                    <OnelineNotifications />

                </div>
            </div>

            <ActivityAddAndReview />

            <div className="row col-sm-12">
                <button 
                className="col-sm-4 offset-8"
                onClick={handleContinueAction}
                >
                Continue
                </button> 
            </div>
        </div>
        </>);
    };

    return render();
}

export default PostHarvesting;