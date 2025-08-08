import { useNavigate } from "react-router-dom";

interface CropsTopBarItemProps{
    iconUrl: string,
    itemName: string,
    pageUrl: string,
    selectedTab: string,
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>
};

const CropsTopBarItem: React.FC<CropsTopBarItemProps> = ({iconUrl, itemName, pageUrl, selectedTab, setSelectedTab})=>{

    const navigate = useNavigate();

    const handleClickItem = ()=>{
        setSelectedTab(itemName);
      navigate(pageUrl);  

    };

    return (<>
    <div
    className="nav-link col-12 p-1"
    onClick={handleClickItem} 
    >
        <div className="col m-0 justify-content-center" 
        >
            <div className="d-flex justify-content-center">
            <img src={iconUrl} 
            className="m-0 p-1 rounded-circle"
            style={{
                borderStyle: "solid",
                borderWidth: "2px",
                width: "48px", 
                height: "48px",
                borderColor: (selectedTab === itemName) ? "var(--Primary, #457900)" : "var(--Primary-Text, #333)" 
            }}
            />
            </div>

            <p className=" col-12 m-0 text-center text-nowrap" 
            style={{ 
                color: (selectedTab === itemName) ? "var(--Primary, #457900)" : "var(--Primary-Text, #333)"
            }}
            >
                {itemName}
            </p>

        </div>
    </div>
    </>);
}

export default CropsTopBarItem;