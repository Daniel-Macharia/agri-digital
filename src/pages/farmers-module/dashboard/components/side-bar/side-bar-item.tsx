import "./side-bar-item.css";

import { NavLink, useNavigate } from "react-router-dom";

export interface SideBarItemDetailProps{
    name: string,
    iconUrl: string,
    contentUrl: string
}

export default function SideBarItem({name, iconUrl, contentUrl} : SideBarItemDetailProps)
{
    let render = ()=>{
        return (<>
            <NavLink
            to={contentUrl}

            className={({isActive}) => isActive ? 'selected-item-indicator-bar' : 'disselected-item-indicator-bar'}
            >
                
                <div id="side-bar-item-container" >
                    <div id="side-bar-item">
                        <img id="item-logo" src={iconUrl}  />
                        <p id="item-name">{name}</p>
                        
                    </div>
                    <div id="item-indicator-div">
                        <span id="item-indicator-bar" 
                        
                        >
                            |
                        </span>
                    </div>
                </div>
            </NavLink>
        </>);
    };

    return render();
}
