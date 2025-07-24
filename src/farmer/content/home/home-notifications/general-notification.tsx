import { GeneralNotificationProps } from "./home-notifications-models";


function GeneralNotificationItem({data}: {data: GeneralNotificationProps})
{
    const handleViewDetailsAction = () => {
        console.log("showing more details..");
    };

    return (<>
    <div className="col-12 farmer-home-container bg-white"
    >
        <div className="row">
            <div className="col-12 col-sm-2 col-md-1 align-content-start">
                <img src="/assets/images/home/bank_logo.svg" 
                alt="sponsor"
                className=""
                style={{width: "50px", height: "50px"}}
                />
            </div>

            <div className="col-12 col-sm-10 col-md-11">
                <div className="col-12 d-flex">
                    <p className="col-6 my-0 col-md-10 h3-semibold primary-text">
                        New notification
                    </p>
                </div>

                <div className="col-12 d-flex pb-0">
                        <img src="/assets/images/home/home_clock.svg"
                        alt="time"
                        style={{width: "14px", height: "14px"}}
                        />
                    <p className="col-10 my-0 small-regular start-aligned-text"
                    style={{color: "var(--Primary, #457900)"}}>
                        {`${data.receivedAt} minutes ago`}
                    </p>
                </div>

                <div className="col-12">
                    <p className="col-12 my-2 small-regular secondary-text">
                        {data.notificationDesc}
                    </p>
                </div>

                <div className="row m-0 py-3">
                    <div className="col-12 px-0" >
                        <button
                        className="col-12 col-md-2 mx-0 farmer-home-accept-button"
                        onClick={handleViewDetailsAction}>
                            View Details
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default GeneralNotificationItem;