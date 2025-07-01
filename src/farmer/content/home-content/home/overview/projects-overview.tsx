import { NavLink } from "react-router-dom";
import ProgressBar from "../../../journey/projects/journey-item/progress-bar";

import "./overview.css";
import "./projects-overview.css";
import { useState } from "react";
import StartNewProjectModal from "../../../journey/add-new-project";

export default function ProjectsOverview(){

    const [show, setShow] = useState<boolean>(false);

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
                <button
                onClick={() => setShow(true)}
                >
                    {/* <NavLink to="/farmer/projects/crops/assessment" className="nav-link"> */}
                    Add a New Project
                    {/* </NavLink> */}
                    </button>
                <button 
                id="view-all-projects-button">
                    <NavLink 
                    to="/farmer/projects" 
                    className="nav-link">
                        View all projects
                    </NavLink>
                </button>
            </div>

            <StartNewProjectModal show={show} setShow={setShow} />


            {/* <Modal
            show={show}
            onHide={ () => setShow(false)}

            centered
            >

                <Modal.Header>

                </Modal.Header>

                <Modal.Body>
                    <img src="/assets/images/bank.svg" />
                    <h3 className="h3-medium" >
                        Project
                    </h3>

                    <p>Ready to start your farming adventure ? 

                        <br/>
                        Choose project Journey ?
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                    type="submit"
                    variant="primary"

                    onClick={handleStartCropProject}
                    >Crop Project</Button>

                    <Button
                    type="submit"
                    variant="primary"

                    onClick={handleStartLivestockProject}
                    >Livestock Project</Button>
                </Modal.Footer>
            </Modal> */}

        </div>
        </>);
    };

    return render();
}