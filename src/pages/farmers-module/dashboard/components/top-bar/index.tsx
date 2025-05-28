

import "./index.css";

export default function TopBar()
{

    let render = ()=>{
        return (
        <div id="top-bar">
            <div id="details-div">
                <h3>Welcome, full name</h3>
                <p>
                    Farm name<span>, Location</span><span></span>
                </p>
            </div>
            <div id="profile-div">
                <h3>profile</h3>
                <img id="profile-icon" src="/src/assets/shamba_bot_logo.png" />
            </div>
        </div>
        );
    };

    return render();
}
