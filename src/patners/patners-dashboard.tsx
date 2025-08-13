import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "./top-bar/index.tsx";
import SideBar from "./side-bar/index.tsx";
import Content from "./content/index.tsx";

import Journey from "./content/journey/index.tsx";
import MarketPlaceRouter from "./content/market-place/index.tsx";
import Products from "./content/products/index.tsx";
import Banks from "./content/banks/index.tsx";
import Insurance from "./content/insurance/index.tsx";
import Sponsors from "./content/sponsors/index.tsx";
import Package from "./content/package/index.tsx";
import QualityScore from "./content/quality-score/index.tsx";
import Resources from "./content/resources/index.tsx";
import Wallet from "./content/wallet/index.tsx";
import Weather from "./content/weather/index.tsx";
import Settings from "./content/settings/index.tsx";
import Invite from "./content/invite/index.tsx";
import NotFound from "../common/exceptions/NotFound.tsx";
import { PATNERS_ROUTES } from "./patners-routes.ts";
import PatnersHomeRouter from "./content/home/patners-home-router.tsx";


export default function PatnersDashboard() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return ( 
        <div
  className="container-fluid position-absolute top-0 start-0 vh-100 w-100 overflow-x-hidden "
  style={{ backgroundColor: '#ececec', height: "100vh" }}
>

            <div className="row h-100">
                {/* Sidebar - collapsible on small screens */}
                <div
                    className={`col-9 col-sm-6 col-lg-3 col-xl-2 bg-white h-100 p-0 overflow-auto ${
                        isSidebarVisible ? "position-fixed start-0 top-0 z-3 shadow" : "d-none d-lg-block"
                    }`}
                    style={{ zIndex: isSidebarVisible ? 1200 : undefined }}
                >
                    <SideBar toggleSidebar={toggleSidebar} />
                </div>

                {/* Overlay for mobile view */} 
                {isSidebarVisible && (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-lg-none"
                        style={{ opacity: 0.5, zIndex: 1100 }}
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main content area */}
                <div className="col-12 col-lg-9 col-xl-10 d-flex flex-column flex-grow-1 px-0"
                style={{height: "100vh"}}>
                    
                    <TopBar toggleSidebar={toggleSidebar} />

                    <div className="overflow-auto">
                    <Content> 
                        <Routes>
                            <Route path={PATNERS_ROUTES.HOME} element={<PatnersHomeRouter />} />
                            <Route path={PATNERS_ROUTES.JOURNEY} element={<Journey />} />
                            <Route path={PATNERS_ROUTES.PRODUCTS} element={<Products />} />
                            <Route path={PATNERS_ROUTES.MARKET_PLACE} element={<MarketPlaceRouter />} />
                            <Route path={PATNERS_ROUTES.BANKS} element={<Banks />} />
                            <Route path={PATNERS_ROUTES.INSURANCE} element={<Insurance />} />
                            <Route path={PATNERS_ROUTES.SPONSORS} element={<Sponsors />} />
                            <Route path={PATNERS_ROUTES.WALLET} element={<Wallet />} />
                            <Route path={PATNERS_ROUTES.PACKAGE} element={<Package />} />
                            <Route path={PATNERS_ROUTES.QUALITY_SCORE} element={<QualityScore />} />
                            <Route path={PATNERS_ROUTES.WEATHER} element={<Weather />} />
                            <Route path={PATNERS_ROUTES.RESOURCES} element={<Resources />} />
                            <Route path={PATNERS_ROUTES.SETTINGS} element={<Settings />} />
                            <Route path={PATNERS_ROUTES.INVITE} element={<Invite />} />
                            <Route path={PATNERS_ROUTES.OTHER} element={<NotFound />} />
                        </Routes>
                    </Content>
                    </div>
                </div>
            </div>
        </div>
    );
}
