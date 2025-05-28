

import "./side-bar-item.css";

interface SideBarItemDetailProps{
    name: string,
    iconUrl: string
}

export default function SideBarItem({name, iconUrl} : SideBarItemDetailProps)
{
    //let name = "Item";
    //let icon = "/src/assets/shamba_bot_logo.png";

    let render = ()=>{
        return (<>
    
            <div id="side-bar-item">
                <img src={iconUrl} />
                <p>{name}</p>
            </div>

        </>);
    };

    return render();
}
