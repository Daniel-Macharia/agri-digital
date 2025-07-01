import { ManagementActivityProps } from "../crops-models";
import "./management-activity.css";


export default function ManagementActivity( activity: ManagementActivityProps){
    const render = () => {
        return (<>
        <div className="management-activity-container card" >
            <div id="completed-div" >
                <input
                type="checkbox"
                checked={activity.activityCompleted}
                readOnly={true}
                />

            </div>

            <div id="management-content-div" >
                <h3 className="management-activity-description body-regular">
                    {activity.activityName}
                </h3>

                <p
                className="management-activity-description body-semibold"
                >
                    {activity.activityCompletionDate.toString() }

                    <br/>

                    {activity.activityCompletionTime}
                </p>

                <p
                 className="management-activity-description small-light"
                 >
                    {activity.activityDescription}
                </p>
            </div>
        </div>
        </>);
    };

    return render();
};