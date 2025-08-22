import { VENDOR_HOME_ROUTES } from "../content/home/vendor-home-routes";
import VendorSideBarItem from "./vendor-side-bar-item";

export default function VendorSideBar({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <div className="container-fluid d-flex flex-column align-items-center p-0 bg-white">
            {/* Logo and close button */}
            <div
  className="w-100 bg-white text-center d-flex align-items-center justify-content-center position-relative "
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
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Home" iconUrl="/assets/images/home.svg" contentUrl="/vendor/home" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="My Products" iconUrl="/assets/images/group.svg" contentUrl="/vendor/my-products" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="My Services" iconUrl="/assets/images/journey.svg" contentUrl="/vendor/my-services" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Market Place" iconUrl="/assets/images/marketplace.svg" contentUrl="/vendor/market-place" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Banks" iconUrl="/assets/images/bank.svg" contentUrl="/vendor/banks" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Insurance" iconUrl="/assets/images/bank.svg" contentUrl="/vendor/insurance" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Sponsors" iconUrl="/assets/images/success.svg" contentUrl="/vendor/sponsors" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Wallets" iconUrl="/assets/images/wallet.svg" contentUrl="/vendor/wallets" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Packages" iconUrl="/assets/images/package.svg" contentUrl="/vendor/packages" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Quality Score" iconUrl="/assets/images/quality_score.svg" contentUrl="/vendor/quality-score" />

                {/* <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Weather" iconUrl="/assets/images/sunny.svg" contentUrl="/vendor/weather" /> */}

                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Training & Resources" iconUrl="/assets/images/articles.svg" contentUrl="/vendor/resources" />
                
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Manage Users" iconUrl="/assets/images/vendor/user.svg" contentUrl="/vendor/manage-users" />
                
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Settings" iconUrl="/assets/images/settings.svg" contentUrl="/vendor/settings" />
                <VendorSideBarItem backUrl={VENDOR_HOME_ROUTES.FULL.HOME_FULL} name="Invite a Friend" iconUrl="/assets/images/invite.svg" contentUrl="/vendor/invite" />
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
