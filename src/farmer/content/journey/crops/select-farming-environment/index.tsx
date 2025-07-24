import { useNavigate } from "react-router-dom";
import { CROP_ROUTES } from "../crop-routes";
import { JOURNEY_ROUTES } from "../../journey-routes";

const SelectFarmingEnvironment: React.FC = ()=>{

    const navigate = useNavigate();

    const handleOpenFieldEnvironment = ()=>{
        console.log("selected handle open field.");

        navigate(`..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_PLANTING}`);
    };

    const handleControlledEnvironment = ()=>{
        console.log("selected handle controlled environment.");

        navigate(`..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_PLANTING}`);
    };

    return (<>
    <div className="crops-container col-12">
        <h3 className="h3-medium crops-center-aligned-text">
            Select Your Farming Environment.
        </h3>

        <p className="crops-center-aligned-text">
            Choose your farming environment to get started with monitoring
        </p>

        <div className="row justify-content-center">
            <div className="col-8 col-md-4 offset-md-1 crops-farming-environment" 
            onClick={handleOpenFieldEnvironment}
            >
                <img src="/assets/images/open-field.svg" className="environment-icon col-12"
                style={{width: "88px", height: "88px"}}/>
                <h3 className="h3-bold crops-farming-environment-title col-12" >
                    Open Field
                </h3>
                <p className="body-medium crops-farming-environment-description col-12">
                    Traditional outdoor farming with natural conditions.
                </p>
            </div>
            <div className="crops-farming-environment col-8 col-md-4 offset-md-2" 
            onClick={handleControlledEnvironment}
            >
                <img src="/assets/images/controlled-environment.svg"  className="environment-icon col-12"
                style={{width: "88px", height: "88px"}}/>
                <h3 className="h3-bold crops-farming-environment-title col-12">
                    Controlled Environment
                </h3>
                <p className="body-medium crops-farming-environment-description col-12">
                    Controlled environment for optimal growth.
                </p>
            </div>
        </div>

    </div>
    </>);
};

export default SelectFarmingEnvironment;