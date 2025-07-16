import CropsTopBarItem from "./top-bar-item";

interface TopBarItemProps{
    iconUrl: string,
    itemName: string,
    pageUrl: string
};

const CropsTopBar: React.FC = ()=>{

    let topBarItems: TopBarItemProps[] = [
        { iconUrl: "/assets/images/soil-testing.svg", itemName: "Soil Testing", pageUrl: "/farmer/projects/crops/soil-testing" },
        { iconUrl: "/assets/images/planting.svg", itemName: "Planting", pageUrl: "/farmer/projects/crops/planting" },
        { iconUrl: "/assets/images/management.svg", itemName: "Management", pageUrl: "/farmer/projects/crops/management" },
        { iconUrl: "/assets/images/harvest.svg", itemName: "Harvesting", pageUrl: "/farmer/projects/crops/harvesting" },
        { iconUrl: "/assets/images/post-harvest.svg", itemName: "Post Harvesting", pageUrl: "/farmer/projects/crops/post-harvesting" },
        { iconUrl: "/assets/images/sale.svg", itemName: "Sales", pageUrl: "/farmer/projects/crops/sales" }
    ];

    const render = ()=>{
        return (<>
        <div className="col-12 crops-container mx-0 bg-white"  style={{overflowX: "auto"}}>
            <div className="d-flex" >
                {
                    topBarItems.map( topBarItem => <div className="col-4 col-md-2 px-2 " 
                    style={{minWidth: "max-content"}}>
                        <CropsTopBarItem 
                        iconUrl={topBarItem.iconUrl} 
                        itemName={topBarItem.itemName}
                        pageUrl={topBarItem.pageUrl} 
                        />
                    </div>)
                }
            </div>
        </div>
        </>);
    };

    return render();
};

export default CropsTopBar;