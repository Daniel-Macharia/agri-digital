import { useNavigate } from "react-router-dom";
import "./index.css";
import "/src/index.css";

const SelectFarmingEnvironment: React.FC = ()=>{

    const navigate = useNavigate();

    const handleOpenFieldEnvironment = ()=>{
        console.log("selected handle open field.");

        navigate("/farmer/projects/crops/planting");
    };

    const handleControlledEnvironment = ()=>{
        console.log("selected handle controlled environment.");

        navigate("/farmer/projects/crops/planting");
    };

    const render = ()=>{
        return (<>
        <div className="container-fluid">
            <h3 className="h3-medium" id="title">
                Select Your Farming Environment.
            </h3>

            <p id="description">
                Choose your farming environment to get started with monitoring
            </p>

            <div className="content-div row">
                <div className="environment col-sm-8 col-md-4" 
                onClick={handleOpenFieldEnvironment}
                >
                    <img src="/assets/images/open-field.svg" className="environment-icon"/>
                    <h3 className="h3-large environement-title" >
                        Open Field
                    </h3>
                    <p className="environment-description">
                        Traditional outdoor farming with natural conditions.
                    </p>
                </div>
                <div className="environment col-sm-8 col-md-4" 
                onClick={handleControlledEnvironment}
                >
                    <img src="/assets/images/controlled-environment.svg"  className="environment-icon"/>
                    <h3 className="h3-large environement-title">
                        Controlled Environment
                    </h3>
                    <p className="environment-description">
                        Controlled environment for optimal growth.
                    </p>
                </div>
            </div>

        </div>
        </>);
    };

    return render();
};

export default SelectFarmingEnvironment;