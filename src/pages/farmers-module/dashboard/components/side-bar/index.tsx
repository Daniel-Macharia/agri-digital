import SideBarItem from "./side-bar-item";

import "./index.css";

export default function SideBar()
{

    let render = () => {
        return (<>
        <div id="side-bar">
            <div id="app-logo">
                <img src="/assets/app_name.svg" />
            </div>
            <hr/>
            <div id="side-bar-items">
                <SideBarItem name="Home" iconUrl ="/assets/home.svg" contentUrl="/dashboard/"/>
                <SideBarItem name="Projects" iconUrl ="/assets/journey.svg" contentUrl="/dashboard/projects"/>
                <SideBarItem name="My Products" iconUrl ="/assets/group.svg" contentUrl="/dashboard/products"/>
                <SideBarItem name="Market Place" iconUrl ="/assets/marketplace.svg" contentUrl="/dashboard/market-place"/>
                <SideBarItem name="Banks" iconUrl ="/assets/bank.svg" contentUrl="/dashboard/banks"/>
                <SideBarItem name="Insurance" iconUrl ="/assets/bank.svg" contentUrl="/dashboard/insurance"/>
                <SideBarItem name="Sponsors" iconUrl ="/assets/success.svg" contentUrl="/dashboard/sponsors"/>
                <SideBarItem name="Wallets" iconUrl ="/assets/wallet.svg" contentUrl="/dashboard/wallet"/>
                <SideBarItem name="Packages" iconUrl ="/assets/package.svg" contentUrl="/dashboard/package"/>
                <SideBarItem name="Quality Score" iconUrl ="/assets/quality_score.svg" contentUrl="/dashboard/quality-score"/>
                <SideBarItem name="Weather" iconUrl ="/assets/sunny.svg" contentUrl="/dashboard/weather"/>
                <SideBarItem name="Training & Resources" iconUrl ="/assets/articles.svg" contentUrl="/dashboard/resources"/>
                <SideBarItem name="Settings" iconUrl ="/assets/settings.svg" contentUrl="/dashboard/settings"/>
                <SideBarItem name="Invite a Friend" iconUrl ="/assets/invite.svg" contentUrl="/dashboard/invite"/>
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