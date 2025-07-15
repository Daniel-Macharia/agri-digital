import { Route, Routes } from "react-router-dom";
import "./index.css";
import SoilTesting from "./soil-testing";
import CropsTopBar from "./crops-journey-top-bar";

import Sales from "./sales";
import Harvesting from "./harvesting";
import Management from "./management";
import Planting from "./planting";
import PostHarvesting from "./post-harvesting";


import "react-datepicker/dist/react-datepicker.css";
import NotFound from "../../../../common/exceptions/NotFound";

export default function Crops(){

    const render = () => {
        return (<>
        <div className="col-12">
            <CropsTopBar />
            <div className="col-12"
            >
                <Routes>
                    <Route path="/soil-testing" element={ <SoilTesting /> } />
                    <Route path="/planting" element={ <Planting /> } />
                    <Route path="/management" element={ <Management /> } />
                    <Route path="/harvesting/*" element={ <Harvesting /> } />
                    <Route path="/post-harvesting" element={ <PostHarvesting /> } />
                    <Route path="/sales" element={ <Sales /> } />

                    <Route path="*" element={ <NotFound />} />
                </Routes>
            </div>
        </div>
        </>);
    };


    return render();
}