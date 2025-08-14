import { CropProjectSummaryProps, LivestockProjectSummaryProps, ProjectProps, ProjectReviewProps } from "../../models";
import { useLocation, useNavigate } from "react-router-dom";
import { loadCropProjectDetails, loadLivestockProjectDetails, loadProjectReviews } from "../../utils/load-project-data";

import LivestockProjectSummary from "./livestock-project-summary";
import CropProjectSummary from "./crop-project-summary";
import ProgressBar from "../journey-item/progress-bar";
import ProjectReview from "../../reviews/project-review";
import { PROJECTS_ROUTES } from "../projects-routes";
import { JOURNEY_ROUTES } from "../../journey-routes";


const ProjectInformation: React.FC = () => {
    const cropProjectStages: string[] = ["Soil Testing", "Planting", "Management", "Harvesting", "Post-harvesting", "Sales"];

    const data: ProjectProps = useLocation().state;

    const isCropProject: boolean = data.projectType == "crop" ? true : false;

    const projectReviews: ProjectReviewProps[] = loadProjectReviews( data.projectId );

    type ProjectType = LivestockProjectSummaryProps | CropProjectSummaryProps;

    const projectSummary: ProjectType[] = isCropProject ? loadCropProjectDetails( data.projectId ) : loadLivestockProjectDetails( data.projectId );

    const navigate = useNavigate();

    const isCompleted = (): boolean => {
        return ( data.projectType == "crop" && data.currentStage == 6 )
        || (data.projectType == "livestock" && data.currentStage == 7 );
    };


    const handleViewMoreReviews = () => {
        navigate(`${PROJECTS_ROUTES.FULL.MORE_PROJECT_REVIEWS_FULL}`)
    };

    return (<>
    <div className="col-12">
        <div className="row justify-content-start">
            <div className="col-2 col-sm-1">
                <img
                src="/assets/images/back-icon.svg" 
                className="col-12 col-sm-6"
                onClick={() => {
                    navigate(`${JOURNEY_ROUTES.FULL.HOME_FULL}`);
                } }
                />
            </div>
        </div>

        <div className="col-12 my-3">
            <div className="col-12 crops-container bg-white p-3">
                <div className="crops-container p-3" style={{backgroundColor: "whitesmoke"}}>
                    <div className="col-12 py-3" >
                        <p className="crops-start-aligned-text body-semibold secondary-text my-1">
                            {data.projectName}
                        </p>
                        <p className="crops-start-aligned-text small-regular secondary-text my-1">
                            { ( isCompleted() ? "Completed " : "Last Updated " )}
                            {data.completionDate.toDateString()}
                        </p>
                    </div>

                    <div className="col-12" style={{display: isCropProject ? "block" : "none" }}>
                        <div className="col-12">
                            <div className="row justify-content-end">
                                <p className="col-6 col-sm-4 crops-end-aligned-text">
                                    {cropProjectStages[data.currentStage - 1]}
                                </p>
                            </div>

                            <ProgressBar
                            max={100}
                            value={ ( data.currentStage / 6 ) * 100}
                            fillColor={"var(--Primary, #457900)"}
                            backColor={"#fff"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 my-3">

                <div className="row m-0">
                    <div className="col-12 col-md-8 px-0 pe-md-2  crops-container bg-white">

                        <div className="col-12 p-3">
                            <div className="row ">
                                <div className="col-12 col-sm-8">
                                    <p className="h2-semibold primary-text crops-start-aligned-text my-0 ">
                                        {isCropProject ? "Crop " : "Livestock "} Quality Report
                                    </p>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <p className="col-12">
                                        <span className="h3-semibold"
                                        style={{color: "var(--Primary, #457900)"}}>
                                            {data.overallScore}{"% "}
                                        </span>
                                        <span className="body-regular secondary-text">
                                            Overall Score
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 m-0 p-3">
                            {
                                isCropProject ? (
                                    projectSummary.map( (summary: ProjectType) => <CropProjectSummary
                                        stageScore={(summary as CropProjectSummaryProps).stageScore}
                                        cropProjectStage={(summary as CropProjectSummaryProps).cropProjectStage}
                                        cropProjectDescription={(summary as CropProjectSummaryProps).cropProjectDescription}
                                        />)
                                ) 
                                : (
                                    projectSummary.map( (summary: ProjectType) => <LivestockProjectSummary
                                        livestockId={(summary as LivestockProjectSummaryProps).livestockId}
                                        livestockName={(summary as LivestockProjectSummaryProps).livestockName}
                                        shortDescription={(summary as LivestockProjectSummaryProps).shortDescription}
                                        />)
                                )
                            }
                        </div>
                    </div>

                    <div className="col-12 col-md-4 px-0 ps-md-2 mt-3 mt-md-0">
                        <div className="col-12 m-0 crops-container bg-white p-3">
                            <div className="col-12">
                                <div className="row p-0">
                                    <div className="col-6 p-0 m-0">
                                        <p className="h3-semibold primary-text crops-start-aligned-text m-0 col-12 ps-2">
                                            Recent Reviews
                                        </p>
                                    </div>
                                    <div className="col-6 p-0 m-0">
                                        <button 
                                        className="body-regular primary-text crops-end-aligned-text m-0 col-12"
                                        style={{color: "var(--Primary, #457900)",
                                            backgroundColor: "white",
                                            borderStyle: "none"
                                        }}
                                        onClick={handleViewMoreReviews}
                                        >
                                            View all reviews
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 p-0 m-0 mt-4">
                                {/* <ul className="col-12" style={{listStyle: "none"}}> */}
                                {
                                    projectReviews.map( (review, index: number) =>{ {/* <li className="col-12"> */}
                                        return (<>
                                        <ProjectReview
                                        username={review.username}
                                        userAccountState={review.userAccountState}
                                        rating={review.rating}
                                        comment={review.comment}
                                        reviewDate={review.reviewDate}
                                        /> 

                                        {/* Add a horizontal rule after each review provided it is not the last review */}
                                        { (index == projectReviews.length - 1 ) ? "" : <hr/> }
                                    </>);
                                    {/* </li> */} } )
                                }
                                {/* </ul> */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    </>);
};

export default ProjectInformation;