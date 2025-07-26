import { Route, Routes } from "react-router-dom";
import Livestock from "./livestock";
import NotFound from "../../../common/exceptions/NotFound";
import Crops from "./crops";
import RequestForService from "./crops/planting/request-for-services";
import ProjectAssessment from "./crops/project-assessment";
import DisplayCropDetails from "./crops/planting/display-crop-details";
import RequestForTesting from "./crops/soil-testing/request-for-testing";
import SelectFarmingEnvironment from "./crops/select-farming-environment";
import { JOURNEY_ROUTES } from "./journey-routes";
import { CROP_ROUTES } from "./crops/crop-routes";
import ProjectsRouter from "./projects/projects-router";

import "./index.css";

export default function Journey()
{
    const render = ()=>{
        return (<>
        
        <Routes>
            <Route path={JOURNEY_ROUTES.INFO} element={<ProjectsRouter /> } />
            <Route path={JOURNEY_ROUTES.LIVESTOCK} element={<Livestock />} />

            <Route path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_ASSESSMENT}`} element={<ProjectAssessment />} />
            <Route path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`} element={<RequestForService />} />
            <Route path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_REQUEST_FOR_SOIL_TESTING}`} element={<RequestForTesting />} />
            <Route path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_DISPLAY_CROP_DETAILS}`} element={<DisplayCropDetails />} />

            <Route path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_SELECT_FARMING_ENVIRONMENT}`} element={<SelectFarmingEnvironment />} />
            <Route path={JOURNEY_ROUTES.CROPS_OTHER}  element={<Crops />} />

            <Route path={JOURNEY_ROUTES.OTHER} element={<NotFound />} />


        </Routes>
        </>);
    };

    return render();
}