import "./tab-nav-bar.css";
import { NavLink } from "react-router-dom";

const TabNavBar: React.FC = ()=>{

    const render = ()=>{
        return (<>
        <div className="top-nav-bar">
            <NavLink
            to="/farmer/projects/crops/harvesting"//"expected-yield"
            end
            className="nav-link nav-link-item"
            defaultChecked
            >
                Expected Yield
            </NavLink>
            <NavLink
            to="/farmer/projects/crops/harvesting/actual-yield"
            end
            className="nav-link nav-link-item"
            >
                Actual Yield
            </NavLink>
        </div>
        </>);
    };
    return render();
};

export default TabNavBar;