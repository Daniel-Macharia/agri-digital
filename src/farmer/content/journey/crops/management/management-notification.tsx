import { ManagementNotificationProps } from "../crops-models";

export default function ManagementNotification( data: ManagementNotificationProps)
{
    return (<>
    <div className="card col-12 py-3 px-2 m-0"
    style={{height: "100%"}}
    >
        <h3 className=" body-semibold primary-text crops-start-aligned-text col-12 m-0"
        >
            {data.name}
        </h3>

        <h3 className=" h2-bold primary-text crops-start-aligned-text col-12 m-0"
        >
            {data.description}
        </h3>

        <p className=" small-regular secondary-text crops-start-aligned-text col-12 m-0"
        >
            {data.details}
        </p>
    </div>
    </>);
};