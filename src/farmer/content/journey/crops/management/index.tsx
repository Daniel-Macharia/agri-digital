import { useNavigate } from "react-router-dom";
import CropsNotification from "../crops-notification/crops-notification";

import { ManagementNotificationProps, ManagementSummaryProps } from "../crops-models";
import ManagementNotification from "./management-notification";
import ManagementSummary from "./management-summary";
import ActivityAddAndReview from "../activity/activity";
import HistoricalRecords from "./historical-records";
import { CROP_ROUTES } from "../crop-routes";
import { JOURNEY_ROUTES } from "../../journey-routes";

const Management: React.FC = ()=>{
    let managementNotifications: ManagementNotificationProps[] = [
        {
            "name": "Active Tasks",
            "description": "2",
            "details": "Stay on track. Manage your farm efficiency."
        },
        {
            "name": "Crop Health",
            "description": "Good",
            "details": "Monitor, protect and your harvest"
        },
        {
            "name": "Weather Alerts",
            "description": "Moderate rain",
            "details": "Plan ahead with real-time weather insights."
        },
        {
            "name": "Pending Requests",
            "description": "2",
            "details": "Don't miss a step. Complete your tasks."
        }
    ];


    let managementSummary: ManagementSummaryProps[] = [
        {
        "title": "Soil Health Monitoring",
        "items": [{ "label": "Soil PH", "value": "6.5"},
            { "label": "Moisture", "value": "45%"},
            { "label": "Type", "value": "Loamy"},
            { "label": "Nutrients Level", "value": "--"}]
        },
        {
            "title": "Weather Conditions",
            "items": [{ "label": "Recent Rainfall", "value": "--"},
                { "label": "Humidity", "value": "45%"},
                { "label": "Temperature", "value": "24 C"},
                { "label": "Wind Speed 3", "value": "12KM/h"}]
        },
        {
            "title": "Growth Analysis",
            "items": [{ "label": "Crop Height", "value": "75cm"},
                { "label": "Growth Stage", "value": "Flowering"},
                { "label": "Expected Yield", "value": "25Kg"},
                { "label": "Current Price per Kg", "value": "Ksh 150"}]
        }
    ];


    const navigate = useNavigate();

    const handleRequestAService = ()=>{
        console.log("requesting for a service.");

        navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {state:`..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_MANAGEMENT}`});
    };

    return (<>
    <div className="col-12">

        <div className="col-12 my-3">
            <CropsNotification 
            iconUrl={"/assets/images/warning.svg"} 
            message={"Strong winds detected.Stalk weak plants to prevent damage"} />
        </div>
        
        <div className="col-12 crops-container">
            <div className="row justify-content-end px-1 my-2 mx-0" >
                <button
                className="col-12 col-md-4 m-0 crops-accept-button"
                onClick={handleRequestAService}
                >Request a Service</button>
            </div>

            <div className="row  px-0 mx-0 mt-2 " >
                
                {
                    managementNotifications.map( notification => 
                    <div className="col-12 col-md-3 mx-0 px-0 px-md-4 py-1">
                        <ManagementNotification 
                        name={notification.name} 
                        description={notification.description} 
                        details={notification.details} 
                        />
                    </div> )
                }

            </div>

            <div className="col-12 mt-2" >
                <ActivityAddAndReview />
            </div>

            <div className="row px-0 mx-0 mt-2 ">
                {
                    managementSummary.map(
                        summary => 
                        <div className="col-12 col-md-4 mx-0 px-0 px-md-1 p-1">
                            <ManagementSummary 
                            title={summary.title}
                            items={summary.items}
                            />
                        </div>
                    )
                }
            </div>

            <div className="col-12 px-0 mt-2">
                <HistoricalRecords />
            </div>

        </div>
    </div>
    </>);
}

export default Management;