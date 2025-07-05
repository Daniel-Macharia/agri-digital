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
        <div className="col-sm-12"
        style={{paddingBottom: "32px"}}>
            <div className="col-sm-12"
            style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <button
                className="col-sm-4 offset-md-8"
                onClick={handleRequestForService}
                style={{minWidth: "max-content", alignSelf: "end"}}
                >
                    Request Services
                </button>
            </div>

            <div id="container-div" className="col-sm-12">
                <div id="planting-calendar-container" className="col-sm-12">
                    <img 
                    src="/assets/images/planting-calendar-icon.svg" 
                    id="planting-calendar-item"
                    className="col-sm-12 planting-icon"
                    />

                    <h3 className="h3-medium col-sm-12" id="planting-calendar-title">
                        Create your Planting Calendar!
                    </h3>

                    <p id="planting-calendar-description"
                    className="col-sm-12">
                        Start planning your growing season by adding your first crop.
                    </p>

                    <Button 
                    variant="primary"
                    onClick={()=> setShow(true) }
                    className="col-md-4"
                    style={{minWidth: "max-content"}}
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