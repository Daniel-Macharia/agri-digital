import { Route, Routes } from "react-router-dom";
import Projects from "./projects";
import ProjectInfo from "./project-info";
import Livestock from "./livestock";
import NotFound from "../../../common/exceptions/NotFound";
import Crops from "./crops";
import RequestForService from "./crops/planting/request-for-services";
import ProjectAssessment from "./crops/project-assessment";
import DisplayCropDetails from "./crops/planting/display-crop-details";
import RequestForTesting from "./crops/soil-testing/request-for-testing";
import SelectFarmingEnvironment from "./crops/select-farming-environment";

export default function Journey()
{
    const render = ()=>{
        return (<>
        
        <Routes>
            {/* <Route path="" element={<JourneyHome /> } /> */}
            <Route path="" element={<Projects /> } />
            <Route path="/info" element={<ProjectInfo /> } />
            <Route path="/livestock/*" element={<Livestock />} />

            <Route path="/crops/assessment" element={<ProjectAssessment />} />
            <Route path="/crops/request-for-service" element={<RequestForService />} />
            <Route path="/crops/request-for-soil-testing" element={<RequestForTesting />} />
            <Route path="/crops/display-crop-details" element={<DisplayCropDetails />} />

            <Route path="/crops/select-farming-environment" element={<SelectFarmingEnvironment />} />
            <Route path="/crops/*"  element={<Crops />} />

            <Route path="/*" element={<NotFound />} />


        </Routes>
        </>);
    };

    return render();
}