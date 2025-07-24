import { useNavigate } from "react-router-dom";
import ProgressBar from "../../journey/projects/journey-item/progress-bar";

import { useCallback, useState } from "react";
import { CropFormData, LivestockFormData } from "../../products";
import ProjectSelectionModal from "../../products/ProjectSelectionModal";
import LivestockProjectModal from "../../products/LivestockProjectModal";
import CropProjectModal from "../../products/CropProjectModal";
import { ProjectsOverviewProps } from "../home-model";

export default function ProjectsOverview(data: ProjectsOverviewProps){

    const navigate = useNavigate();

    let currentProgress = 0;

    const [showProjectSelection, setShowProjectSelection] = useState<boolean>(false);
    const [showLivestockModal, setShowLivestockModal] = useState<boolean>(false);
    const [showCropModal, setShowCropModal] = useState<boolean>(false);

    // New Project Modal handlers

    const handleCloseProjectSelection = (): void => {
        setShowProjectSelection(false);
    };

    const handleCropProject = (): void => {
        setShowProjectSelection(false);
        setShowCropModal(true);
    };

    const handleLivestockProject = (): void => {
        setShowProjectSelection(false);
        setShowLivestockModal(true);
    };

    const handleBackToProjectSelection = (): void => {
        setShowLivestockModal(false);
        setShowCropModal(false);
        setShowProjectSelection(true);
    };

    const handleCloseLivestockModal = (): void => {
        setShowLivestockModal(false);
    };

    const handleCloseCropModal = (): void => {
        setShowCropModal(false);
    };

    const handleLivestockSubmit = (formData: LivestockFormData): void => {
        console.log('Livestock Project Data:', formData);
        navigate("/farmer/projects/livestock/typebreed");

        setShowLivestockModal(false);
    };

    const handleCropSubmit = (formData: CropFormData): void => {
        console.log('Crop Project Data:', formData);
        navigate("/farmer/projects/crops/assessment");
        
        setShowCropModal(false);
    };

    const getCurrentStageName = (stage: number): string => {
        let cropStages: string[] = ["soil testing", "planting", "management", "harvesting", "postharvesting", "sales"];
        let livestockStages: string[] = ["type and breed", "housing", "feeding", "health management", "breeding", "production", "sales"];

        let currentStageName = "current";
        
        if( data.projectType === "crop" )
        {
            currentProgress = ( data.currentProjectStage / 6 ) * 100;
            currentStageName = cropStages[stage - 1];
        }
        else
        {
            currentProgress = ( data.currentProjectStage / 7 ) * 100;
            currentStageName = livestockStages[stage - 1]
        }

        return currentStageName;
    };

    const handleUpdateProject = () => {
        console.log("update current project");
        alert("update current project");
    };


    useCallback(handleUpdateProject, []);

    const render = ()=>{
        return (<>
        <div className="col-12 farmer-home-container"> 
            <div className="farmer-home-container p-4 mx-0 col-12" style={{backgroundColor: "whitesmoke"}}>
                <p className="body-semibold secondary-text">
                    {data.projectName}
                </p>

                <div className=" my-3">
                    <p className=" mb-0 small-regular primary-text" style={{textAlign: "start"}}>
                        {getCurrentStageName(data.currentProjectStage)}
                    </p>
                    <ProgressBar max={100} value={currentProgress} />
                </div>

                <div className="row justify-content-center" 
                onClick={handleUpdateProject}
                >
                    <div className="col-6 d-flex justify-content-end align-items-center pe-0" >
                        <img src="/assets/images/arrow.svg"
                        style={{width: "14px", height: "14px"}}
                        alt="more"
                        className="pe-0 mb-0 me-1 justify-self-end self-align-end"
                        />
                    </div>
                    <div className="col-6 ps-0">
                        <p className="col-12 ms-1 mb-0 small-medium secondary-text self-align-center"
                        >
                            Update Project
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3" >
                <div className="row">
                    <div className="col-6">
                        <button
                        onClick={() => setShowProjectSelection(true)}
                        className="col-12 farmer-home-accept-button"
                        >
                            Add a New Project
                        </button>
                    </div>

                    <div className="col-6">
                        <button 
                        onClick={() => {navigate("/farmer/projects")}}
                        className="col-12 farmer-home-other-button"
                        >
                            View all projects
                        </button>
                    </div>
                </div>
            </div>
        </div>


        {/* New Project Modals */}
        <ProjectSelectionModal
            show={showProjectSelection}
            onHide={handleCloseProjectSelection}
            onCropProject={handleCropProject}
            onLivestockProject={handleLivestockProject}
        />

        <LivestockProjectModal
            show={showLivestockModal}
            onHide={handleCloseLivestockModal}
            onBack={handleBackToProjectSelection}
            onSubmit={handleLivestockSubmit}
        />

        <CropProjectModal
            show={showCropModal}
            onHide={handleCloseCropModal}
            onBack={handleBackToProjectSelection}
            onSubmit={handleCropSubmit}
        />
        </>);
    };

    return render();
}