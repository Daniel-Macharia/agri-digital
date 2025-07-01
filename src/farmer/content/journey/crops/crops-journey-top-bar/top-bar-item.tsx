import { NavLink, useNavigate } from "react-router-dom";
import "./top-bar-item.css"

interface CropsTopBarItemProps{
    iconUrl: string,
    itemName: string,
    pageUrl: string
};

const CropsTopBarItem: React.FC<CropsTopBarItemProps> = ({iconUrl, itemName, pageUrl})=>{

    const navigate = useNavigate();

    const handleClickItem = ()=>{
      navigate(pageUrl);  
    };

    const render = ()=>{
        return (<>
        <NavLink
        to={pageUrl} end
        className="nav-link"
        >
            {({isActive}) => (
                <div className="top-bar-item" onClick={handleClickItem}>
                    <img src={iconUrl} />
                    <p>{itemName}</p>
                </div>
            )}
        </NavLink>
        </>)
    };

    return render();
}

export default CropsTopBarItem;