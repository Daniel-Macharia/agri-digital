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
                <SideBarItem name="Home" iconUrl ="/assets/home.svg" contentUrl="/home"/>
                <SideBarItem name="Projects" iconUrl ="/assets/journey.svg" contentUrl="/projects"/>
                <SideBarItem name="My Products" iconUrl ="/assets/group.svg" contentUrl="/products"/>
                <SideBarItem name="Market Place" iconUrl ="/assets/marketplace.svg" contentUrl="/market-place"/>
                <SideBarItem name="Banks" iconUrl ="/assets/bank.svg" contentUrl="/banks"/>
                <SideBarItem name="Insurance" iconUrl ="/assets/bank.svg" contentUrl="/insurance"/>
                <SideBarItem name="Sponsors" iconUrl ="/assets/success.svg" contentUrl="/sponsors"/>
                <SideBarItem name="Wallets" iconUrl ="/assets/wallet.svg" contentUrl="/wallet"/>
                <SideBarItem name="Packages" iconUrl ="/assets/package.svg" contentUrl="/package"/>
                <SideBarItem name="Quality Score" iconUrl ="/assets/quality_score.svg" contentUrl="/quality-score"/>
                <SideBarItem name="Weather" iconUrl ="/assets/sunny.svg" contentUrl="/weather"/>
                <SideBarItem name="Training & Resources" iconUrl ="/assets/articles.svg" contentUrl="/resources"/>
                <SideBarItem name="Settings" iconUrl ="/assets/settings.svg" contentUrl="/settings"/>
                <SideBarItem name="Invite a Friend" iconUrl ="/assets/invite.svg" contentUrl="/invite"/>
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