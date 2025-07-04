import { useNavigate } from "react-router-dom";
import CropsNotification from "../crops-notification/crops-notification";
import "./index.css";
import "/src/index.css";

import { ManagementNotificationProps, ManagementSummaryProps } from "../crops-models";
import ManagementNotification from "./management-notification";
import ManagementSummary from "./management-summary";
import ActivityAddAndReview from "../activity/activity";
import HistoricalRecords from "./historical-records";

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
            "name": "Pendig Requests",
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

        navigate("/farmer/projects/crops/request-for-service", {state:"/farmer/projects/crops/management"});
    };

    const render = ()=>{
        return (<>
        <div className="rows management-container">

            <CropsNotification iconUrl={"/assets/images/warning.svg"} message={"Strong winds detected.Stalk weak plants to prevent damage"} />
            
            <div className="row col-sm-12"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
            }} >
                <button
                className="col-sm-4"
                onClick={handleRequestAService}
                style={{
                    width: "max-content"
                }}
                >Request a Service</button>
            </div>

            <div className="management-notifications row col-sm-12" >
                
                {
                    managementNotifications.map( notification => <div className="col-sm-12 col-md-3">
                        <ManagementNotification 
                        name={notification.name} 
                        description={notification.description} 
                        details={notification.details} 
                        />
                    </div> )
                }

            </div>

            <ActivityAddAndReview />

            <div id="summary-div" className="row col-sm-12">
                {
                    managementSummary.map(
                        summary => <div className="col-sm-10 col-md-4">
                            <ManagementSummary 
                            title={summary.title}
                            items={summary.items}
                            />
                        </div>
                    )
                }
            </div>

            <div id="hostorical-records-div" className="row container">
                <h3 className="h3-bold" >
                    <HistoricalRecords />
                </h3>
            </div>
        </div>
        </>);
    };

    return render();
}

export default Management;