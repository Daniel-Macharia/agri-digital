import { useNavigate } from "react-router-dom";

import { useState } from "react";
import AddNewCropModal from "./add-new-crop-modal";
import CropsNotification from "../crops-notification/crops-notification";
import { JOURNEY_ROUTES } from "../../journey-routes";
import { CROP_ROUTES } from "../crop-routes";

const Planting: React.FC = ()=>{

    

    const [show, setShow] = useState<boolean>(false);

    const navigate = useNavigate();

    

    const handleRequestForService = ()=>{
        navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`, {state:`..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_PLANTING}`});
    };

    

    return (<>
    <div className="col-12 mb-4">

        <div className="col-12 my-3" >
            <CropsNotification 
            iconUrl={"/assets/images/warning.svg"} 
            message={"The long rains begin in two weeks"} />
        </div>

        <div className="col-12 crops-container">
            <div className="col-12">
                <div className="row my-2 px-0 px-md-2 justify-content-end">
                    <button
                    className="col-12 col-md-4 crops-accept-button"
                    onClick={handleRequestForService}
                    >
                        Request Services
                    </button>
                </div>
            </div>
            <div className="col-12 ">
                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 crops-container bg-white p-4">
                        <div className="col-sm-12">
                            <div className="col-12 d-flex justify-content-center">
                                <img 
                                src="/assets/images/planting-calendar-icon.svg"
                                style={{width: "64px"}}
                                />
                            </div>

                            <h3 className="h3-bold primary-text text-center col-sm-12" >
                                Create your Planting<br/>Calendar!
                            </h3>

                            <p
                            className="col-sm-12 body-medium secondary-text text-center">
                                Start planning your growing season by adding your first crop.
                            </p>

                            <div className="col-12">
                                <div className="row justify-content-center px-2">
                                    <button 
                                    onClick={()=> setShow(true) }
                                    className="col-12 col-md-4 crops-accept-button"
                                    >
                                        Add your first crop
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <AddNewCropModal show={show} setShow={setShow} />
    </>);
}

export default Planting;