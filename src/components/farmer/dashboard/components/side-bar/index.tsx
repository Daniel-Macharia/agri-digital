import SideBarItem from "./side-bar-item";

export default function SideBar({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <div className="container-fluid d-flex flex-column align-items-center p-0">
            {/* Logo and close button */}
            <div
  className="w-100 bg-white text-center d-flex align-items-center justify-content-center position-relative"
  style={{
    maxWidth: "14.4375rem",
    height: "4.375rem",
    flexShrink: 0,
    aspectRatio: "33 / 10",
    background: "lightgray 50% / cover no-repeat",
  }}
>
  <img
    src="/assets/images/app_name.svg"
    className="img-fluid w-75"
    alt="App Logo"
    style={{ maxHeight: "100%", objectFit: "contain" }}
  />
  <button
    className="btn btn-link text-dark position-absolute top-0 end-0 d-lg-none"
    onClick={toggleSidebar}
    style={{ fontSize: "1.5rem" }}
  >
    <i className="fas fa-times"></i>
  </button>
</div>


            <hr className="w-100 my-2" />

            {/* Sidebar Items */}
            <div className="w-100 d-flex flex-column">
                <SideBarItem name="Home" iconUrl="/assets/images/home.svg" contentUrl="/farmer/home" />
                <SideBarItem name="Projects" iconUrl="/assets/images/journey.svg" contentUrl="/farmer/projects" />
                <SideBarItem name="My Products" iconUrl="/assets/images/group.svg" contentUrl="/farmer/products" />
                <SideBarItem name="Market Place" iconUrl="/assets/images/marketplace.svg" contentUrl="/farmer/market-place" />
                <SideBarItem name="Banks" iconUrl="/assets/images/bank.svg" contentUrl="/farmer/banks" />
                <SideBarItem name="Insurance" iconUrl="/assets/images/bank.svg" contentUrl="/farmer/insurance" />
                <SideBarItem name="Sponsors" iconUrl="/assets/images/success.svg" contentUrl="/farmer/sponsors" />
                <SideBarItem name="Wallets" iconUrl="/assets/images/wallet.svg" contentUrl="/farmer/wallet" />
                <SideBarItem name="Packages" iconUrl="/assets/images/package.svg" contentUrl="/farmer/package" />
                <SideBarItem name="Quality Score" iconUrl="/assets/images/quality_score.svg" contentUrl="/farmer/quality-score" />
                <SideBarItem name="Weather" iconUrl="/assets/images/sunny.svg" contentUrl="/farmer/weather" />
                <SideBarItem name="Training & Resources" iconUrl="/assets/images/articles.svg" contentUrl="/farmer/resources" />
                <SideBarItem name="Settings" iconUrl="/assets/images/settings.svg" contentUrl="/farmer/settings" />
                <SideBarItem name="Invite a Friend" iconUrl="/assets/images/invite.svg" contentUrl="/farmer/invite" />
            </div>

            {/* Assistance Section */}
            <div className="mt-3 p-3 bg-success rounded text-white text-start w-100">
                <div className="mb-2">
                    <img src="/assets/images/help.svg" alt="Help Icon" />
                </div>
                <p className="fw-bold mb-1">Need assistance ?</p>
                <p className="mb-2">Check our documentation</p>
                <div className="d-grid">
                    <button className="btn btn-light text-dark fw-semibold rounded-pill">DOCUMENTATION</button>
                </div>
            </div>
        </div>
    );
}
