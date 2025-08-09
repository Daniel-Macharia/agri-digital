import { ManagementActivityProps } from "../crops-models";

export default function ManagementActivity( activity: ManagementActivityProps){
    return (<>
        <div className="col-12 card p-1 my-1" >
            <div className="row p-0 m-0 d-flex align-items-center" >
                <div className="col-2 col-md-1 d-flex justify-items-end align-items-center">
                    <input
                    type="checkbox"
                    checked={activity.activityCompleted}
                    readOnly={true}
                    />
                </div>

                <div className="col-10 col-md-11">
                    <h3 className="crops-start-aligned-text body-semibold primary-text col-12 m-0 body-regular">
                    {activity.activityName}
                    </h3>

                    <p
                    className="crops-start-aligned-text col-12 m-0 body-semibold"
                    style={{ color: "var(--Remember-me-Links, #2966FF)" }}
                    >
                    {activity.activityCompletionDate.toString()}

                    <br />

                    {activity.activityCompletionTime}
                    </p>

                    <p className="crops-start-aligned-text col-12 m-0 body-regular secondary-text">
                    {activity.activityDescription}
                    </p>
                </div>
            </div>
      </div>
    </>
  );
}
