import JourneyItem, { type Project } from "./journey-item/jouney-item";

import { loadProjects } from "../utils/load-projects";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectSelectionModal from "../../products/ProjectSelectionModal";
import { CropFormData, LivestockFormData, LivestockType } from "../../products";
import LivestockProjectModal from "../../products/LivestockProjectModal";
import CropProjectModal from "../../products/CropProjectModal";

export default function Projects(){

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

    const journeyItems: Project[] | null =  loadProjects();

    const render = ()=>{
        return (<>
            <div id="content" >
                <div id="journey-actions" >
                    <NavLink to="/farmer/projects"  className="nav-link">
                        <p>back</p>
                    </NavLink>
                    <button onClick={ () => setShowProjectSelection( true ) }>
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