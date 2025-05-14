import { Component, useState } from "react";

import "./Home.css";

export default function Home() {
    let state = useState();

    let render = ()=>{
        return (
            <>
                <div>
                    <h1>
                        Welcome to the home page!
                    </h1>
                </div>
            </>
        );
    }

    return render();
}
