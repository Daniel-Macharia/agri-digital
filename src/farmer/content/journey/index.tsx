import { Route, Routes } from "react-router-dom";
import NotFound from "../../../common/exceptions/NotFound";
import { CropJourneyProvider } from "../../../lib/context/CropJourneyContext";
import Crops from "./crops";
import { CROP_ROUTES } from "./crops/crop-routes";
import CropStateManager from "./crops/crops-state-manager/CropStateManager";
import DisplayCropDetails from "./crops/planting/display-crop-details";
import RequestForService from "./crops/planting/request-for-services";
import ProjectAssessment from "./crops/project-assessment";
import SelectFarmingEnvironment from "./crops/select-farming-environment";
import RequestForTesting from "./crops/soil-testing/request-for-testing";
import { JOURNEY_ROUTES } from "./journey-routes";
import Livestock from "./livestock";
import Projects from "./projects";
import ProjectInformation from "./projects/project-info";

export default function Journey() {
  const render = () => {
    return (
      <CropJourneyProvider>
        <CropStateManager />
        <Routes>
          <Route path={JOURNEY_ROUTES.ROOT} element={<Projects />} />
          <Route path={JOURNEY_ROUTES.INFO} element={<ProjectInformation />} />
          <Route path={JOURNEY_ROUTES.LIVESTOCK} element={<Livestock />} />

          <Route
            path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_ASSESSMENT}`}
            element={<ProjectAssessment />}
          />
          <Route
            path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_REQUEST_FOR_SERVICE}`}
            element={<RequestForService />}
          />
          <Route
            path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_REQUEST_FOR_SOIL_TESTING}`}
            element={<RequestForTesting />}
          />
          <Route
            path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_DISPLAY_CROP_DETAILS}`}
            element={<DisplayCropDetails />}
          />

          <Route
            path={`${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_SELECT_FARMING_ENVIRONMENT}`}
            element={<SelectFarmingEnvironment />}
          />
          <Route path={JOURNEY_ROUTES.CROPS_OTHER} element={<Crops />} />

          <Route path={JOURNEY_ROUTES.OTHER} element={<NotFound />} />
        </Routes>
      </CropJourneyProvider>
    );
  };

  return render();
}
