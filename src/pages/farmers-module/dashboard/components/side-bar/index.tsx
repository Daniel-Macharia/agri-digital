import SideBarItem from "./side-bar-item";

import "./index.css";

export default function SideBar()
{

    let render = () => {
        return (<>
        <div id="side-bar">
            <div id="app-logo">
                <img src="/../../../../../assets/app_name.svg" />
            </div>
            <hr/>
            <div id="side-bar-items">
                <SideBarItem name="Home" iconUrl ="/../../../../../assets/home.svg"/>
                <SideBarItem name="Projects" iconUrl ="/../../../../../assets/journey.svg"/>
                <SideBarItem name="My Products" iconUrl ="/../../../../../assets/Group.svg"/>
                <SideBarItem name="Market Place" iconUrl ="/../../../../../assets/marketplace.svg"/>
                <SideBarItem name="Banks" iconUrl ="/../../../../../assets/bank.svg"/>
                <SideBarItem name="Insurance" iconUrl ="/../../../../../assets/bank.svg"/>
                <SideBarItem name="Sponsors" iconUrl ="/../../../../../assets/success.svg"/>
                <SideBarItem name="Wallets" iconUrl ="/../../../../../assets/wallet.svg"/>
                <SideBarItem name="Packages" iconUrl ="/../../../../../assets/package.svg"/>
                <SideBarItem name="Quality Score" iconUrl ="/../../../../../assets/quality_score.svg"/>
                <SideBarItem name="Weather" iconUrl ="/../../../../../assets/sunny.svg"/>
                <SideBarItem name="Training & Resources" iconUrl ="/../../../../../assets/articles.svg"/>
                <SideBarItem name="Settings" iconUrl ="/../../../../../assets/settings.svg"/>
                <SideBarItem name="Invite a Friend" iconUrl ="/../../../../../assets/invite.svg"/>
            </div>

            <div id="assistance-div">
                <div>
                    <img src="/assets/help.svg" />
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