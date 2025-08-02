import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "./top-bar";
import SideBar from "./side-bar";
import Content from "./content";

import Journey from "./content/journey";
import MarketPlaceRouter from "./content/market-place";
import Products from "./content/products/index.tsx";
import Banks from "./content/banks";
import Insurance from "./content/insurance/index.tsx";
import Sponsors from "./content/sponsors";
import Package from "./content/package";
import QualityScore from "./content/quality-score";
import Resources from "./content/resources";
import Wallet from "./content/wallet";
import Weather from "./content/weather";
import Settings from "./content/settings";
import Invite from "./content/invite";
import NotFound from "../common/exceptions/NotFound";
import FarmerHomeRouter from "./content/home/farmer-home-router.tsx";
import { FARMER_ROUTES } from "./farmer-routes.ts";

export default function Dashboard() {
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
                            <Route path={FARMER_ROUTES.HOME} element={<FarmerHomeRouter />} />

                            <Route path={FARMER_ROUTES.JOURNEY} element={<Journey />} />
                            <Route path={FARMER_ROUTES.PRODUCTS} element={<Products />} />
                            <Route path={FARMER_ROUTES.MARKET_PLACE} element={<MarketPlaceRouter />} />
                            <Route path={FARMER_ROUTES.BANKS} element={<Banks />} />
                            <Route path={FARMER_ROUTES.INSURANCE} element={<Insurance />} />
                            <Route path={FARMER_ROUTES.SPONSORS} element={<Sponsors />} />
                            <Route path={FARMER_ROUTES.WALLET} element={<Wallet />} />
                            <Route path={FARMER_ROUTES.PACKAGE} element={<Package />} />
                            <Route path={FARMER_ROUTES.QUALITY_SCORE} element={<QualityScore />} />
                            <Route path={FARMER_ROUTES.WEATHER} element={<Weather />} />
                            <Route path={FARMER_ROUTES.RESOURCES} element={<Resources />} />
                            <Route path={FARMER_ROUTES.SETTINGS} element={<Settings />} />
                            <Route path={FARMER_ROUTES.INVITE} element={<Invite />} />
                            <Route path={FARMER_ROUTES.OTHER} element={<NotFound />} />
                        </Routes>
                    </Content>
                    </div>
                </div>
            </div>
        </div>
    );
}
