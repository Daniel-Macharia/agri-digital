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
import { CROP_ROUTES } from "./crop-routes";

export default function Crops(){

    return (<>
    <div className="col-12">
        <CropsTopBar />
        <div className="col-12"
        >
            <Routes>
                <Route path={CROP_ROUTES.CROP_SOIL_TESTING} element={ <SoilTesting /> } />
                <Route path={CROP_ROUTES.CROP_PLANTING} element={ <Planting /> } />
                <Route path={CROP_ROUTES.CROP_MANAGEMENT} element={ <Management /> } />
                <Route path={CROP_ROUTES.CROP_HARVEST_OTHER} element={ <Harvesting /> } />
                <Route path={CROP_ROUTES.CROP_POST_HARVESTING} element={ <PostHarvesting /> } />
                <Route path={CROP_ROUTES.CROP_SALES} element={ <Sales /> } />

                <Route path={CROP_ROUTES.CROP_OTHER} element={ <NotFound />} />
            </Routes>
        </div>
    </div>
    </>);
}