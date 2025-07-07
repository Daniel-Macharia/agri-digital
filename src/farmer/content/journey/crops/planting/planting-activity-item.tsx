import { PlantingActivity } from "../crops-models";
import "./planting-activity-item.css";
import "/src/index.css";


const PlantingActivityItem: React.FC<PlantingActivity> = (activity: PlantingActivity)=>{

    const render = ()=>{
        return (<>
        <div className="col-sm-12 planting-crop-activity-item" 
        style={{
            display: 'flex', 
            flexDirection: 'row'
            }}>
            
            <p className="col-sm-3 crop-label small-semibold"
            style={{margin: '0px', padding: '0px'}}>
                {activity.activityDate?.toString().substring(0,10)}: 
            </p>
            
            <p className="col-sm-7 crop-label body-regular"
            style={{margin: '0px', padding: '0px'}}>
                {activity.activityDescription}
            </p>

        </div>
        </>);
    };
    return render();
}

export default PlantingActivityItem;