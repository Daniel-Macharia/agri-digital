import { NavLink } from "react-router-dom";

const TabNavBar: React.FC = ()=>{

    const render = ()=>{
        return (<>
        <div className="row justify-content-start px-0 mx-0">
            <NavLink
            to="/farmer/projects/crops/harvesting"//"expected-yield"
            end
            className="col-6 col-md-2 nav-link body-medium primary-text crops-start-aligned-text"
            defaultChecked
            >
                Expected Yield
            </NavLink>
            <NavLink
            to="/farmer/projects/crops/harvesting/actual-yield"
            end
            className="col-6 col-md-2 nav-link body-medium primary-text crops-start-aligned-text"
            
            >
                Actual Yield
            </NavLink>
        </div>
        </>);
    };
    return render();
};

export default TabNavBar;