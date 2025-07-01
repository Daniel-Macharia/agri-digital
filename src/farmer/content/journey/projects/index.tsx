import JourneyItem, { type Project } from "./journey-item/jouney-item";

import { loadProjects } from "../utils/load-projects";
import { NavLink } from "react-router-dom";
import StartNewProjectModal from "../add-new-project";
import { useState } from "react";

export default function Projects(){
    const journeyItems: Project[] | null =  loadProjects();

    const [show, setShow] = useState<boolean>(false);

    const render = ()=>{
        return (<>
            <div id="content" >
                <div id="journey-actions" >
                    <NavLink to="/farmer/projects"  className="nav-link">
                        <p>back</p>
                    </NavLink>
                    <button onClick={ () => setShow( true ) }>
                        Add a new project
                    </button>
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

            <StartNewProjectModal show={show} setShow={setShow}  />
        </>);
    };

    return render();
}