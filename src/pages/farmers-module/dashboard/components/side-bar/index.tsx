import SideBarItem from "./side-bar-item";

import "./index.css";

export default function SideBar()
{

    let render = () => {
        return (<>
        <div id="side-bar">
            <div id="app-logo">
                <img src="/src/assets/app_name.svg" />
            </div>
            <hr/>
            <div id="side-bar-items">
                <SideBarItem name="Home" iconUrl ="/src/assets/home.svg"/>
                <SideBarItem name="Projects" iconUrl ="/src/assets/journey.svg"/>
                <SideBarItem name="My Products" iconUrl ="/src/assets/Group.svg"/>
                <SideBarItem name="Market Place" iconUrl ="/src/assets/marketplace.svg"/>
                <SideBarItem name="Banks" iconUrl ="/src/assets/bank.svg"/>
                <SideBarItem name="Insurance" iconUrl ="/src/assets/bank.svg"/>
                <SideBarItem name="Sponsors" iconUrl ="/src/assets/success.svg"/>
                <SideBarItem name="Wallets" iconUrl ="/src/assets/wallet.svg"/>
                <SideBarItem name="Packages" iconUrl ="/src/assets/package.svg"/>
                <SideBarItem name="Quality Score" iconUrl ="/src/assets/quality_score.svg"/>
                <SideBarItem name="Weather" iconUrl ="/src/assets/sunny.svg"/>
                <SideBarItem name="Training & Resources" iconUrl ="/src/assets/articles.svg"/>
                <SideBarItem name="Settings" iconUrl ="/src/assets/settings.svg"/>
                <SideBarItem name="Invite a Friend" iconUrl ="/src/assets/invite.svg"/>
            </div>

            <div id="assistance-div">
                <div>
                    <img src="/src/assets/help.svg" />
                </div>
                <p id="assistance-title">Need assistance ?</p>
                <p>check our documentation</p>
                <button>DOCUMENTATION</button>
            </div>

        </div>
        </>);
    };

    return render();
}