import { NavLink } from "react-router-dom";
import { HARVEST_ROUTES } from "./harvest-routes";
import { CROP_ROUTES } from "../crop-routes";

const TabNavBar: React.FC = ()=>{

    return (<>
    <div className="row justify-content-start px-0 mx-0">
        <NavLink
        to={`..${CROP_ROUTES.CROP_HARVEST}${HARVEST_ROUTES.CROP_EXPECTED_YIELD}`}//"/farmer/projects/crops/harvesting"//"expected-yield"
        end
        className="col-6 col-md-2 nav-link body-medium primary-text crops-start-aligned-text"
        defaultChecked
        >
            Expected Yield
        </NavLink>
        <NavLink
        to={`..${CROP_ROUTES.CROP_HARVEST}${HARVEST_ROUTES.CROP_ACTUAL_YIELD}`}//"/farmer/projects/crops/harvesting/actual-yield"
        end
        className="col-6 col-md-2 nav-link body-medium primary-text crops-start-aligned-text"
        
        >
            Actual Yield
        </NavLink>
    </div>
    </>);
};

export default TabNavBar;