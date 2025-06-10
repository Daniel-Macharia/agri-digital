import SideBarItem from "./side-bar-item";

import "./index.css";

export default function SideBar()
{

    let render = () => {
        return (<>
        <div id="side-bar">
            <div id="app-logo">
                <img src="/assets/images/app_name.svg" />
            </div>
            <hr/>
            <div id="side-bar-items">
                <SideBarItem name="Home" iconUrl ="/assets/images/home.svg" contentUrl="/farmer/home" />
                <SideBarItem name="Projects" iconUrl ="/assets/images/journey.svg" contentUrl="/farmer/projects" />
                <SideBarItem name="My Products" iconUrl ="/assets/images/group.svg" contentUrl="/farmer/products"/>
                <SideBarItem name="Market Place" iconUrl ="/assets/images/marketplace.svg" contentUrl="/farmer/market-place" />
                <SideBarItem name="Banks" iconUrl ="/assets/images/bank.svg" contentUrl="/farmer/banks" />
                <SideBarItem name="Insurance" iconUrl ="/assets/images/bank.svg" contentUrl="/farmer/insurance" />
                <SideBarItem name="Sponsors" iconUrl ="/assets/images/success.svg" contentUrl="/farmer/sponsors"/>
                <SideBarItem name="Wallets" iconUrl ="/assets/images/wallet.svg" contentUrl="/farmer/wallet" />
                <SideBarItem name="Packages" iconUrl ="/assets/images/package.svg" contentUrl="/farmer/package"/>
                <SideBarItem name="Quality Score" iconUrl ="/assets/images/quality_score.svg" contentUrl="/farmer/quality-score"/>
                <SideBarItem name="Weather" iconUrl ="/assets/images/sunny.svg" contentUrl="/farmer/weather" />
                <SideBarItem name="Training & Resources" iconUrl ="/assets/images/articles.svg" contentUrl="/farmer/resources"/>
                <SideBarItem name="Settings" iconUrl ="/assets/images/settings.svg" contentUrl="/farmer/settings"/>
                <SideBarItem name="Invite a Friend" iconUrl ="/assets/images/invite.svg" contentUrl="/farmer/invite"/>
            </div>

            <div id="assistance-div">
                <div>
                    <img src="/assets/images/help.svg" />
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