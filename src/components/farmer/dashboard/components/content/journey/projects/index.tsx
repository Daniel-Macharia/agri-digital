import JourneyItem, { type Project } from "./journey-item/jouney-item";

import { loadProjects } from "../utils/load-projects";
import { NavLink } from "react-router-dom";

export default function Projects(){
    const journeyItems: Project[] | null =  loadProjects();

    const render = ()=>{
        return (<>
            <div id="content" >
                <div id="journey-actions" >
                    <NavLink to="/farmer/projects"  className="nav-link">
                        <p>back</p>
                    </NavLink>
                    <button><NavLink className="nav-link" to="/farmer/projects/add">Add a new project</NavLink></button>
                </div>
                <div id="journey-content" >
                    <div className="project-container" id="current-project" >
                        <h3 className="overall-title">Current Project</h3>

                        <JourneyItem 
                        projectId={journeyItems[0].projectId}
                        projectName={journeyItems[0].projectName} 
                        projectDuration={journeyItems[0].projectDuration} 
                        overallScore={journeyItems[0].overallScore} 
                        completionDate={journeyItems[0].completionDate}
                        />

                    </div>

                    <div className="project-container" id="other-projects" >
                        <h3 className="overall-title">Completed Projects</h3>
                        {
                            
                        journeyItems.map((journeyItem, index) => {
                                if( index === 0 )//skip first project
                                    return  "";
                                else
                                    return (<JourneyItem 
                                        projectId={journeyItem.projectId}
                                        projectName={journeyItem.projectName} 
                                        projectDuration={journeyItem.projectDuration} 
                                        overallScore={journeyItem.overallScore}
                                        completionDate={journeyItem.completionDate}
                                        />);
                            })
                            
                        }
                    </div>
                </div>
            </div>
        </>);
    };

    return render();
}