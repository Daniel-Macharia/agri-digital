import { NavLink, useNavigate } from "react-router-dom";
import ProgressBar from "../../../journey/projects/journey-item/progress-bar";

import "./overview.css";
import "./projects-overview.css";
import { useState } from "react";
import { CropFormData, LivestockFormData } from "../../../products";
import ProjectSelectionModal from "../../../products/ProjectSelectionModal";
import LivestockProjectModal from "../../../products/LivestockProjectModal";
import CropProjectModal from "../../../products/CropProjectModal";

export default function ProjectsOverview(){

    const navigate = useNavigate();

    const [showProjectSelection, setShowProjectSelection] = useState<boolean>(false);
    const [showLivestockModal, setShowLivestockModal] = useState<boolean>(false);
    const [showCropModal, setShowCropModal] = useState<boolean>(false);

    // New Project Modal handlers
    const handleAddNewProduct = (): void => {
        setShowProjectSelection(true);
    };

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
                onClick={() => setShowProjectSelection(true)}
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