import { useNavigate } from "react-router-dom";
import "./index.css";
import "/src/index.css";
import "../../index.css";

import { useState } from "react";
import AddNewCropModal from "./add-new-crop-modal";
import { Button } from "react-bootstrap";

const Planting: React.FC = ()=>{

    

    const [show, setShow] = useState<boolean>(false);

    const navigate = useNavigate();

    

    const handleRequestForService = ()=>{
        navigate("/farmer/projects/crops/request-for-service", {state:"/farmer/projects/crops/planting"});
    };

    

    const render = ()=>{
        return (<>
        <div>
            <div id="top-bar-div">
                <button
                onClick={handleRequestForService}
                >
                    Request Services
                </button>
            </div>

            <div id="container-div">
                <div id="planting-calendar-container">
                    <img src="/assets/images/planting-calendar-icon.svg" id="planting-calendar-item" />

                    <h3 className="h3-medium" id="planting-calendar-title">
                        Create your Planting Calendar!
                    </h3>

                    <p id="planting-calendar-description">
                        Start planning your growing season by adding your first crop.
                    </p>

                    <Button 
                    variant="primary"
                    onClick={()=> setShow(true) }
                    className="col-sm-4"
                    >
                        Add your first crop
                    </Button>
                </div>
            </div>
        </div>

        <AddNewCropModal show={show} setShow={setShow} />
        </>);
    };

    return render();
}

export default Planting;