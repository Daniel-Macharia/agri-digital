import { NavLink } from "react-router-dom";
import "./journey-item.css";
import ProgressBar from "./progress-bar";

export interface Project{
    projectId: number,
    projectName: string,
    projectDuration: number,
    overallScore: number,
    completionDate: string
};

const JourneyItem = (journeyItemData: Project) =>{

    let render = ()=>{
        return (<>
        <NavLink id="journey-item-content" to="/farmer/projects/info" className="nav-link">
            <div id="title-div">
                <span id="project-name">
                    {journeyItemData.projectName}
                </span>
                
                <span>
                    <b className="highlighted-info">{journeyItemData.overallScore}%</b> Overall score
                </span>
            </div>
            <div id="body-div" className="highligheted-info">
                <p>
                    Completed: {journeyItemData.completionDate}
                </p>

                <div id="progress-indicator">
                    <p>sales</p>
                    <ProgressBar max={100} value={journeyItemData.overallScore} />
                    
                </div>
            </div>
        </NavLink>
        </>);
    };

    return render();
}


export default JourneyItem;