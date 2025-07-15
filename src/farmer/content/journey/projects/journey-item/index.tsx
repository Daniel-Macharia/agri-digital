import { useNavigate } from "react-router-dom";
import ProgressBar from "./progress-bar";
import { ProjectProps } from "../../models";

const JourneyItem: React.FC<ProjectProps> = (journeyItemData: ProjectProps) =>{

    const navigate = useNavigate();

    let projectProgress = 100;

    let cropProjectStages = ["Soil Testing", "Planting", "Management", "Harvesting", "Post-harvesting", "Sales"];
    let livestockProjectStages = ["Type and Breed", "Housing", "Feeding", "Health Management", "Breeding", "Production", "Sales"];

    if( journeyItemData.projectType == "crop" ) //a crop project
    {
        projectProgress = ( journeyItemData.currentStage * 100) / 6;
    }
    else{ //a livestock project
        projectProgress = ( journeyItemData.currentStage * 100) / 7;
    }

    const isProjectCompleted = () => {
        if( journeyItemData.projectType == "crop" ) //a crop project
            return journeyItemData.currentStage === 6;
        
        else
            return journeyItemData.currentStage === 7;
    };

    const getCurrentStage = (): string => {
        if( journeyItemData.projectType == "crop" )//crop project
        {
            return cropProjectStages[journeyItemData.currentStage - 1];
        }
        else //livestock project
        {
            return livestockProjectStages[journeyItemData.currentStage - 1];
        }
    };

    const handleShowMoreInfo = () => {
        navigate("/farmer/projects/info", { state: journeyItemData } );
    };

    let render = ()=>{
        return (<>
        <div className="col-12 col-md-8 crops-container p-3 my-2"
        style={{backgroundColor: "whitesmoke"}}
        onClick={handleShowMoreInfo}
        >
            <div>
                <div className="row my-1">
                    <div className="col-6">
                        <div className="row justify-content-start">
                            <p className="body-semibold secondary-text crops-start-aligned-text my-0">
                                {journeyItemData.projectName}
                            </p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row justify-content-start">
                            <p className="body-regular secondary-text crops-end-aligned-text my-0">
                                <span className="h3-semibold" style={{color: "var(--Primary, #457900)"}}>
                                    {journeyItemData.overallScore}% 
                                </span> 
                                <span> Overall score</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="small-regular secondary-text crops-start-aligned-text">
                <p>
                    { ( isProjectCompleted() ) ? "Completed: " : "Last Updated: " }
                    {journeyItemData.completionDate}
                </p>

                <div className="col-12">
                    <div className="row justify-content-end">
                        <p className="crops-end-aligned-text">{getCurrentStage()}</p>
                    </div>
                    <ProgressBar max={100} value={projectProgress} />
                </div>
            </div>
        </div>
        </>);
    };

    return render();
}


export default JourneyItem;