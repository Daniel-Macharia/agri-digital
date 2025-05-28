import { Component, useState } from "react";

import "./Home.css";
import TopBar from "./top-bar";
import SideBar from "./side-bar";
import Content from "./content";

export default function Home() {
    let state = useState();

    let render = ()=>{
        return (
            <div id="home-content">
                <div id="left-div">
                    <SideBar />
                </div>
                <div id="right-div">
                    <TopBar />
                    <Content />
                </div>
            </div>
        );
    }

    return render();
}
