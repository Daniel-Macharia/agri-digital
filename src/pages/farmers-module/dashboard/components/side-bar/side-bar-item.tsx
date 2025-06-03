

import type { MouseEventHandler } from "react";
import "./side-bar-item.css";

interface SideBarItemDetailProps{
    name: string,
    iconUrl: string,
    contentUrl: string
}

export default function SideBarItem({name, iconUrl, contentUrl} : SideBarItemDetailProps)
{
    //let name = "Item";
    //let icon = "/src/assets/shamba_bot_logo.png";

    const itemClickHandler = (clickEvent: MouseEvent) => {
        console.log("handling click event");

        let element: EventTarget | null = clickEvent.currentTarget;

        if( element !== null )
        {
            console.log(`target for click event found: ${element}`);
            console.log(`Content Url: ${contentUrl}`);
        }
        
    };

    let render = ()=>{
        return (<>
            <div id="side-bar-item-container" onClick={itemClickHandler}>
                <div id="side-bar-item">
                    <img id="item-logo" src={iconUrl}  />
                    <p id="item-name">{name}</p>
                    
                </div>
                <div id="item-indicator-div">
                    <span id="item-indicator-bar">
                        |
                    </span>
                </div>
            </div>
        </>);
    };

    return render();
}
