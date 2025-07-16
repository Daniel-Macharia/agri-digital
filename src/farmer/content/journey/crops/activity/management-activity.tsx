import { ManagementActivityProps } from "../crops-models";

export default function ManagementActivity( activity: ManagementActivityProps){
    const render = () => {
        return (<>
        <div className="col-12 card p-1" >
            <div className="row p-0 d-flex" >
                <div className="col-2" style={{alignSelf: "center"}}>
                    <input
                    type="checkbox"
                    checked={activity.activityCompleted}
                    readOnly={true}
                    />

                </div>

                <div className="col-10" >
                    <h3 className="crops-start-aligned-text body-semibold primary-text col-12 m-0 body-regular"
                    >
                        {activity.activityName}
                    </h3>

                    <p
                    className="crops-start-aligned-text col-12 m-0 body-semibold"
                    style={{color: "var(--Remember-me-Links, #2966FF)"}}
                    >
                        {activity.activityCompletionDate.toString() }

                        <br/>

                        {activity.activityCompletionTime}
                    </p>

                    <p
                    className="crops-start-aligned-text col-12 m-0 body-regular secondary-text"
                    >
                        {activity.activityDescription}
                    </p>
                </div>
            </div>
        </div>
        </>);
    };

    return render();
};