import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiClient } from "../../../../lib/api/ApiClient";
import { CropJourneySummaryPayload } from "../../../../lib/model/CropJourneyModel";
import {
  ListApiResponse,
  PAGINATION_MAX_PAGE_SIZE,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../lib/model/Model";
import { API_ROUTES } from "../../../../lib/Routes";
import { extractErrorMessage } from "../../../../lib/utils/Helpers";
import { CropFormData, LivestockFormData } from "../../products";
import CropProjectModal from "../../products/CropProjectModal";
import LivestockProjectModal from "../../products/LivestockProjectModal";
import ProjectSelectionModal from "../../products/ProjectSelectionModal";
// import { ProjectProps } from "../models";
// import { loadProjects } from "../utils/load-project-data";
import JourneyItem from "./journey-item";
const apiClient = new ApiClient();

export default function Projects() {
  const navigate = useNavigate();
  const [showProjectSelection, setShowProjectSelection] =
    useState<boolean>(false);
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
    console.log("Livestock Project Data:", formData);
    navigate("/farmer/projects/livestock/typebreed");

    setShowLivestockModal(false);
  };

  // const handleCropSubmit = (formData: CropFormData): void => {
  //     console.log('Crop Project Data:', formData);
  //     navigate("/farmer/projects/crops/assessment");

  //     setShowCropModal(false);
  // };
  const handleCropSubmit = (formData: CropFormData): void => {
    console.log("Crop Project Data:", formData);
    navigate("/farmer/projects/crops/assessment?name=" + formData.projectName);

    setShowCropModal(false);
  };

  //const journeyItems: ProjectProps[] | null = loadProjects();
  const [fetching, setFetching] = useState<boolean>(false);
  const [projects, setProjects] = useState<CropJourneySummaryPayload[]>([]);

  const fetchCropJourneys = useCallback(async () => {
    try {
      setFetching(true);
      console.log(`fetching items: ${fetching}`);
      const dataResponse = await apiClient.get<
        ListApiResponse<CropJourneySummaryPayload>
      >({
        url: API_ROUTES.CROP_JOURNEY.INIT,
        config: {
          params: {
            pageNumber: 0,
            pageSize: PAGINATION_MAX_PAGE_SIZE,
          },
        },
      });
      setProjects(dataResponse.list);
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage || "Journey's fetch failed", {
        autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
      });
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchCropJourneys();
  }, [fetchCropJourneys]);

  console.log(projects);

  return (
    <>
      <div className="col-12">
        <div className="col-12 d-flex">
          <div className="col-6">
            <div className="row justify-content-start">
              <div className="col-4 col-sm-2">
                <img
                  className="crops-start-aligned-text col-12 col-sm-6"
                  src="/assets/images/back-icon.svg"
                  onClick={() => {
                    navigate("/farmer/home");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row justify-content-end">
              <button
                onClick={() => setShowProjectSelection(true)}
                className="col-12 col-sm-6 crops-accept-button mx-2"
              >
                Add a new project
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 ">
          {/* <div className="col-12 crops-container bg-white ">
            <div className="col-12">
              <h3 className="h3-semibold primary-text crops-start-aligned-text my-0">
                Current Project
              </h3>
            </div>

            <JourneyItem
              projectId={journeyItems[0].projectId}
              projectName={journeyItems[0].projectName}
              projectDuration={journeyItems[0].projectDuration}
              overallScore={journeyItems[0].overallScore}
              completionDate={journeyItems[0].completionDate}
              currentStage={journeyItems[0].currentStage}
              projectType={journeyItems[0].projectType}
            />
          </div> */}

          <div className="col-12 crops-container bg-white my-3">
            <div className="col-12">
              <h3 className="h3-semibold primary-text crops-start-aligned-text my-0">
                {/* Completed Projects */}Projects
              </h3>
            </div>

            <div className="col-12">
              {/* {journeyItems.map((journeyItem, index) => {
                if (index === 0)
                  //skip first project
                  return "";
                else
                  return (
                    <JourneyItem
                      projectId={journeyItem.projectId}
                      projectName={journeyItem.projectName}
                      projectDuration={journeyItem.projectDuration}
                      overallScore={journeyItem.overallScore}
                      completionDate={journeyItem.completionDate}
                      currentStage={journeyItem.currentStage}
                      projectType={journeyItem.projectType}
                    />
                  );
              })}  */}
              {projects &&
                projects.length > 0 &&
                projects.map((project, index) => (
                  <JourneyItem
                    key={index}
                    projectId={project.transactionId}
                    projectName={project.name}
                    projectDuration={10}
                    overallScore={30}
                    completionDate={Date.now().toString()}
                    currentStage={49}
                    projectType={project.farmEnvironmentType}
                  />
                ))}
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
    </>
  );
}
