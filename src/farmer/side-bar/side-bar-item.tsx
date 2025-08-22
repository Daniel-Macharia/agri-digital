import "./side-bar-item.css";
import "/src/index.css";

import { NavLink } from "react-router-dom";

export interface SideBarItemDetailProps{
    name: string,
    iconUrl: string,
    contentUrl: string
}

export default function SideBarItem({name, iconUrl, contentUrl} : SideBarItemDetailProps)
{
    //const navigate = useNavigate();
    return (<>
        <NavLink
        to={contentUrl}
        className={"nav-link side-bar-nav-link"}
        >   
            {({isActive}) => (
                <div id="side-bar-item-container" >
                    <div id="side-bar-item">
                        
                        <img src={iconUrl} className={isActive ? "selected-item-icon item-logo" : "item-logo disselected-item-icon"} />
                        <p className={isActive ? "item-name-selected" : "item-name"}>{name}</p>
                        
                    </div>
                    <div className="indicator-container">
                        <img src="/assets/images/active.svg" className={isActive ? "selected-item-indicator-bar" : "disselected-item-indicator-bar"} />
                    </div>
                </div>
            )}
        </NavLink>
    </>);
}
