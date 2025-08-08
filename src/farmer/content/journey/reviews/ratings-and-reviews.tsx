import { useNavigate } from "react-router-dom";
import { ProjectReviewProps } from "../models";
import { loadProjectReviews } from "../utils/load-project-data";
import { PROJECTS_ROUTES } from "../projects/projects-routes";
import ProjectReview from "./project-review";
import { FaStar } from "react-icons/fa";
import { FARMER_ROUTES } from "../../../farmer-routes";
import { ReactNode } from "react";


const RatingAndReviews:React.FC = () => {
    const overallRating: number = 4.5;
    const totalRating: number = 5;
    const basisOfRating: string = "Lorem, ipsum dolor";

    let projectReviews: ProjectReviewProps[] = loadProjectReviews( 3 );
    if( projectReviews.length > 3 )
        projectReviews = projectReviews.slice(0, 3);

    const getRatingStars = ():ReactNode[] => {
        const stars: ReactNode[] = [];
        
        for( let i = 1; i <= totalRating; i++ )
        {
            stars.push(
                <FaStar 
                size={20}
                color={ i < overallRating ? "var(--yellow, #F8C813)" : "#e4e5e9"}
                />
            );
        }
        return stars;
    };

    const navigate = useNavigate();

    const handleViewMoreReviews = () => {
        navigate(`..${FARMER_ROUTES.JOURNEY.replace("/*", "")}${PROJECTS_ROUTES.MORE_PROJECT_REVIEWS}`)
    };

    return (<>
        <div className="col-12">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="col-12 m-0 crops-container bg-white p-3"
                    style={{height: "100%"}}>
                        <h3 className="col-12 h3-semibold primary-text crops-center-aligned-text">
                            Overall Quality Score
                        </h3>
                        <div className="col-12 justify-content-center" >
                            <div 
                            className="align-content-center "
                            style={{
                                width: "160px",
                                height: "160px",
                                borderStyle: "solid",
                                borderRadius: "50%",
                                borderWidth: "4px",
                                borderColor: "var(--Primary, #457900)",
                                backgroundColor: "var(--Accent, #DAFFE7)",
                                justifySelf: "center"
                            }}>
                                <div className="col-12" >
                                    <p className="h1-bold my-0 crops-center-aligned-text"
                                    style={{color: "var(--Primary, #457900)"}}>
                                        {overallRating}
                                    </p>
                                    <p className="h3-medium my-0 crops-center-aligned-text"
                                    style={{color: "var(--Primary, #457900)"}}>
                                        {`out of ${totalRating}`}
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-items-center my-2"
                            style={{justifyContent: "center"}}>
                                {getRatingStars()}
                            </div>

                        </div>

                        <div className="col-12">
                            <p className="small-regular secondary-text crops-center-aligned-text">
                                {`Based on ${basisOfRating}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-8 mt-3 mt-md-0">
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
        </>);
};

export default RatingAndReviews;