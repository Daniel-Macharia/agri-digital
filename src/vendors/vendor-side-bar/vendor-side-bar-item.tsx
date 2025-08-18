import "./vendor-side-bar-item.css";
import "/src/index.css";

import { useNavigate } from "react-router-dom";

export interface SideBarItemDetailProps{
    name: string,
    iconUrl: string,
    contentUrl: string,
    backUrl: string
}

export default function VendorSideBarItem({name, iconUrl, contentUrl, backUrl} : SideBarItemDetailProps)
{
    const isActive = false;
    const navigate = useNavigate();
    return (<>
        <div
        className={"nav-link side-bar-nav-link"}
        onClick={() => {
            navigate(contentUrl, {state: backUrl})
        }}
        >   
            {/* {({isActive}) => ( */}
                <div id="side-bar-item-container" >
                    <div id="side-bar-item">
                        
                        <img src={iconUrl} className={isActive ? "selected-item-icon item-logo" : "item-logo disselected-item-icon"} />
                        <p className={isActive ? "item-name-selected" : "item-name"}>{name}</p>
                        
                    </div>
                    <div className="indicator-container">
                        <img src="/assets/images/active.svg" className={isActive ? "selected-item-indicator-bar" : "disselected-item-indicator-bar"} />
                    </div>
                </div>
            {/* )} */}
        </div>
    </>);
}
