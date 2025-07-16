import { Route, Routes, useNavigate } from "react-router-dom";
import TabNavBar from "./tab-nav-bar";
import ExpectedYield from "./expected-yield";
import ActualYield from "./actual-yield";
import CropsNotification from "../crops-notification/crops-notification";
import NotFound from "../../../../../common/exceptions/NotFound";

const Harvesting: React.FC = ()=>{

    const navigate = useNavigate();

    const handleRequestForHarvestingTools = ()=>{
        console.log("request for harvesting tools");
        navigate("/farmer/projects/crops/request-for-service", {state:"/farmer/projects/crops/harvesting"});
    };

    
    const render = ()=>{
        return (<>
        <div className="col-12">
            <div className="row my-3 px-0 mx-0">
                <CropsNotification 
                iconUrl="/assets/images/plant.svg" 
                message="Your crop is nearing harvest. Begin planning for harvesting logistics"
                />
            </div>
            
            <div className="col-12 crops-container" >
                <div className="row justify-content-end px-3 my-2">
                    <button
                    className="col-12 col-md-4 mx-0 crops-accept-button"
                    onClick={handleRequestForHarvestingTools}
                    >
                        Request for harvesting tools
                    </button>
                </div>

                <div className="col-12 bg-white crops-container">
                    <div className="col-12 my-0">
                        <h3 className="h3-semibold primary-text col-12 my-0 crops-start-aligned-text" >
                            Yield updates
                        </h3>
                    </div>

                    <div className="col-12">
                        <TabNavBar />
                    </div>

                    <div className="col-12">
                        <Routes >
                            <Route path="" element={ <ExpectedYield />} />
                            <Route path="/actual-yield" element={ <ActualYield /> } />

                            <Route path="*" element={ <NotFound />} />
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
        </>);
    }
    return render();
}

export default Harvesting;