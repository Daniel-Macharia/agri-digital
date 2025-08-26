import { Route, Routes } from "react-router-dom";
import CropsTopBar from "./crops-journey-top-bar";
import "./index.css";
import SoilTesting from "./soil-testing";

import Harvesting from "./harvesting";
import Management from "./management";
import Planting from "./planting";
import PostHarvesting from "./post-harvesting";
import Sales from "./sales";

import "react-datepicker/dist/react-datepicker.css";
import NotFound from "../../../../common/exceptions/NotFound";
import { CROP_ROUTES } from "./crop-routes";
import DisplayCropDetails from "./planting/display-crop-details";
import RequestForService from "./planting/request-for-services";
import ProjectAssessment from "./project-assessment";
import SelectFarmingEnvironment from "./select-farming-environment";
import RequestForTesting from "./soil-testing/request-for-testing";

export default function Crops() {
  return (
    <div className="col-12">
      <CropsTopBar />
      <div className="col-12">
        <Routes>
          <Route
            path={CROP_ROUTES.CROP_ASSESSMENT}
            element={<ProjectAssessment />}
          />
          <Route
            path={CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}
            element={<RequestForService />}
          />
          <Route
            path={CROP_ROUTES.CROP_REQUEST_FOR_SOIL_TESTING}
            element={<RequestForTesting />}
          />
          <Route
            path={CROP_ROUTES.CROP_DISPLAY_CROP_DETAILS}
            element={<DisplayCropDetails />}
          />

          <Route
            path={CROP_ROUTES.CROP_SELECT_FARMING_ENVIRONMENT}
            element={<SelectFarmingEnvironment />}
          />
          <Route
            path={CROP_ROUTES.CROP_SOIL_TESTING}
            element={<SoilTesting />}
          />
          <Route path={CROP_ROUTES.CROP_PLANTING} element={<Planting />} />
          <Route path={CROP_ROUTES.CROP_MANAGEMENT} element={<Management />} />
          <Route path={CROP_ROUTES.CROP_HARVEST} element={<Harvesting />} />
          <Route
            path={CROP_ROUTES.CROP_POST_HARVESTING}
            element={<PostHarvesting />}
          />
          <Route path={CROP_ROUTES.CROP_SALES} element={<Sales />} />

          <Route path={CROP_ROUTES.CROP_OTHER} element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
