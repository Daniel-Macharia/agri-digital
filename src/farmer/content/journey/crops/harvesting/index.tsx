import { Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import TabNavBar from "./tab-nav-bar";
import "/src/index.css";
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
        <div className="row harvest-container">
            <CropsNotification iconUrl="/assets/images/plant.svg" message="Your crop is nearing harvest. Begin planning for harvesting logistics" />

            
            <div className="row  col-sm-12"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
            }}
            >
                <button
                className="col-sm-4"
                onClick={handleRequestForHarvestingTools}
                >
                    Request for harvesting tools
                </button>
            </div>
            <div className="row col-sm-12 harvest-content">
                <h3 className="h3-regular" id="heading">Yield updates</h3>

                <TabNavBar />

                <Routes >
                    <Route path="" element={ <ExpectedYield />} />
                    <Route path="/actual-yield" element={ <ActualYield /> } />

                    <Route path="*" element={ <NotFound />} />
                </Routes>
            </div>
        </div>
        </>);
    }
    return render();
}

export default Harvesting;