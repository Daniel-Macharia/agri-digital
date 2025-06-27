import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "./top-bar";
import SideBar from "./side-bar";
import Content from "./content";

import Home from "./content/home-content";
import Journey from "./content/journey";
import MarketPlace from "./content/market-place";
import Products from "./content/products";
import Banks from "./content/banks";
import Sponsors from "./content/sponsors";
import Package from "./content/package";
import QualityScore from "./content/quality-score";
import Resources from "./content/resources";
import Wallet from "./content/wallet";
import Weather from "./content/weather";
import Settings from "./content/settings";
import Invite from "./content/invite";
import NotFound from "../../../common/exceptions/NotFound";

export default function Dashboard() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return ( 
        <div
  className="container-fluid position-absolute top-0 start-0 vh-100 w-100 overflow-x-hidden "
  style={{ backgroundColor: '#ececec' }}
>

            <div className="row h-100">
                {/* Sidebar - collapsible on small screens */}
                <div
                    className={`col-9 col-sm-6 col-lg-3 col-xl-2 bg-white h-100 p-0 ${
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
                <div className="col-12 col-lg-9 col-xl-10 d-flex flex-column flex-grow-1 px-0">
                    <TopBar toggleSidebar={toggleSidebar} />
                    <Content> 
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/projects/*" element={<Journey />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/market-place" element={<MarketPlace />} />
                            <Route path="/banks" element={<Banks />} />
                            <Route path="/sponsors" element={<Sponsors />} />
                            <Route path="/wallet" element={<Wallet />} />
                            <Route path="/package" element={<Package />} />
                            <Route path="/quality-score" element={<QualityScore />} />
                            <Route path="/weather" element={<Weather />} />
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/invite" element={<Invite />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Content>
                </div>
            </div>
        </div>
    );
}
