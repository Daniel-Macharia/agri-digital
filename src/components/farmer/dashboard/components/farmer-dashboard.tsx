import "./farmer-dashboard.css";

import TopBar from "./top-bar";
import SideBar from "./side-bar";
import Content from "./content";
import { Route, Routes } from "react-router-dom";

import Home from "./content/home-content";
import Journey from "./content/journey";
import MarketPlace from "./content/market-place";
import Products from "./content/products";
import Insurance from "./content/insurance";
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
    
    let render = ()=>{
        return (
            <div id="home-content">
                <div id="left-div" >
                    <SideBar />
                </div>
                <div id="right-div" >
                    <TopBar />
                    <Content >
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/projects/*" element={<Journey />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/market-place" element={<MarketPlace />} />
                            <Route path="/banks" element={<Banks />} />
                            <Route path="/insurance" element={<Insurance />} />
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
        );
    }

    return render();
}
