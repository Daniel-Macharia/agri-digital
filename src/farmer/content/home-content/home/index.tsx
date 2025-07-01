import "./index.css";
import ProjectsOverview from "./overview/projects-overview";


export default function FarmerHome(){
    const render = ()=>{
        return(<>
        <div id="journey-home-content" >
            <div className="content-background" id="projects-home-top">
                <h1>Here is the top bar</h1>
            </div>

            <div id="projects-home-content-main" >
                <div className="content-background" id="projects-home-content-main-left">
                    <ProjectsOverview />
                </div>

                <div className="content-background" id="projects-home-content-main-right">
                    <p className="content-main-title">Articles</p>
                </div>

            </div>

        </div>
        </>);
    };

    return render();
}
