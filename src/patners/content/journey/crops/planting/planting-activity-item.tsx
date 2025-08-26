import { PlantingActivity } from "../crops-models";


const PlantingActivityItem: React.FC<PlantingActivity> = (activity: PlantingActivity)=>{

    return (<>
    <div className="col-12 bg-white p-1 m-1 px-0 mx-0" 
    style={{
    borderRadius: "4px"
    }}
    >
        <div className="row mx-0">
            <div className="col-12 col-md-3" >
                <p className="col-12 crops-start-aligned-text small-semibold m-0 p-0">
                    {activity.activityDate?.toString().substring(0,10)}: 
                </p>    
            </div>
            
            <div className="col-12 col-md-9" >
                <p className="col-12 crops-start-aligned-text body-regular m-0 p-0">
                    {activity.activityDescription}
                </p>
            </div>
        </div>

    </div>
    </>);
}

export default PlantingActivityItem;