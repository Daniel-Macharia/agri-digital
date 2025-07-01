import "./index.css";
import CropsTopBarItem from "./top-bar-item";
import "/src/index.css";

const CropsTopBar: React.FC = ()=>{

    const render = ()=>{
        return (<>
        <div className="top-bar">
            <CropsTopBarItem iconUrl="/assets/images/soil-testing.svg" itemName="Soil Testing" pageUrl="/farmer/projects/crops/soil-testing" />
            <CropsTopBarItem iconUrl="/assets/images/planting.svg" itemName="Planting" pageUrl="/farmer/projects/crops/planting" />
            <CropsTopBarItem iconUrl="/assets/images/management.svg" itemName="Management" pageUrl="/farmer/projects/crops/management" />
            <CropsTopBarItem iconUrl="/assets/images/harvest.svg" itemName="Harvesting" pageUrl="/farmer/projects/crops/harvesting" />
            <CropsTopBarItem iconUrl="/assets/images/post-harvest.svg" itemName="Post Harvesting" pageUrl="/farmer/projects/crops/post-harvesting" />
            <CropsTopBarItem iconUrl="/assets/images/sale.svg" itemName="Sales" pageUrl="/farmer/projects/crops/sales" />
        </div>
        </>);
    };

    return render();
};

export default CropsTopBar;