import { NavLink } from "react-router-dom";
import ProgressBar from "../../projects/journey-item/progress-bar";

import "./overview.css";
import "./projects-overview.css";

export default function ProjectsOverview(){

    const render = ()=>{
        return (<>
        <div className="overview-content"> 
            <p className="overview-title">Projects</p>
            <div id="projects-overview-body">
                <p id="current-project-name">Current Project</p>

                <p id="current-task-name">Current Task</p>

                <ProgressBar max={100} value={75} />

                <p id="update-project">Update Project</p>
            </div>

            <div id="projects-actions" >
                <button><NavLink to="/farmer/projects/add" className="nav-link">Add a New Project</NavLink></button>
                <button id="view-all-projects-button"><NavLink to="/farmer/projects/all" className="nav-link">View all projects</NavLink></button>
            </div>

        </div>
        </>);
    };

    return render();
}