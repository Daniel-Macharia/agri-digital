import ProjectsOverview from "./overview/projects-overview";

import "./home.css";
import { ProjectsOverviewProps } from "./home-model";
import { useNavigate } from "react-router-dom";


export default function FarmerHome(){
    let projectsOverview: ProjectsOverviewProps = {projectName: "Maize", currentProjectStage: 4, projectType: "crop"};
    
    const navigate = useNavigate();

    return(<>
    <div className="col-12 farmer-home-container">
        <div className="row ">
            <div className="col-12 col-md-8 px-0 pe-md-2">
                <div className="farmer-home-container bg-white col-12 p-4" >
                    <p className="col-12">Project</p>
                    <ProjectsOverview 
                    projectName={projectsOverview.projectName} 
                    currentProjectStage={projectsOverview.currentProjectStage}
                    projectType={projectsOverview.projectType}
                    />
                </div>
            </div>

            <div className="col-12 col-md-4 px-0 ps-md-2">
                <div className="col-12 farmer-home-container bg-white" >
                    <p className="content-main-title">Articles</p>
                </div>
            </div> 
        </div>
    </div>
    </>);
}
