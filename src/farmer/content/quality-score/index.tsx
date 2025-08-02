import { useNavigate } from "react-router-dom";
import { FARMER_ROUTES } from "../../farmer-routes";
import "./quality-score.css";

import RatingAndReviews from "../journey/reviews/ratings-and-reviews";
import { QualityScoreCertificationItemProps, QualityScoreTrainingItemProps } from "./quality-score-models";
import QualityScoreCertificationItem from "./quality-score-certification-item";
import QualityScoreTrainingItem from "./quality-score-training-item";
import QualityScoreBarChart from "./quality-score-bar-chart";
import { FARMER_HOME_ROUTES } from "../home/home-routes";

export default function QualityScore()
{
    const navigate = useNavigate();
    let yearsOfExperience: number = 12;
    let averageTrainingScore = 91;

    let certifications: QualityScoreCertificationItemProps[] = [
        {
            certificationName: "Organic Farming certification", 
            completionDate: "2020",
            status: "verified"
        },
        {
            certificationName: "Organic Farming certification", 
            completionDate: "2020",
            status: "verified"
        },
        {
            certificationName: "Organic Farming certification", 
            completionDate: "2020",
            status: "verified"
        },
        {
            certificationName: "Organic Farming certification", 
            completionDate: "2020",
            status: "verified"
        },
        {
            certificationName: "Organic Farming certification", 
            completionDate: "2020",
            status: "verified"
        },
    ];

    let trainings: QualityScoreTrainingItemProps[] = [
        {
            trainingName: "Organic Farming certification", 
            trainingDate: "2020",
            percentageScore: 87
        },
        {
            trainingName: "Organic Farming certification", 
            trainingDate: "2020",
            percentageScore: 87
        },
        {
            trainingName: "Organic Farming certification", 
            trainingDate: "2020",
            percentageScore: 87
        },
        {
            trainingName: "Organic Farming certification", 
            trainingDate: "2020",
            percentageScore: 87
        },
        {
            trainingName: "Organic Farming certification", 
            trainingDate: "2020",
            percentageScore: 87
        },
    ];

    if( certifications.length > 3 )
        certifications = certifications.slice(0, 3);

    if( trainings.length > 3 )
        trainings = trainings.slice(0, 3);

    const handleGoBackHome = () => {
        navigate(`${FARMER_HOME_ROUTES.HOME_FULL}`);
    };

    return (<>
    <div className="col-12">
        <div className="col-12 d-flex justify-content-start mb-3">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="col-12 p-0">
            <RatingAndReviews />
        </div>

        <div className="col-12 quality-score-container bg-white mt-3">
            <QualityScoreBarChart />
        </div>

        <div className="col-12 my-3">
            <div className="row m-0">
                <div className="col-12 col-md-6 m-0 p-0 pe-0 pe-md-2">
                    <div className="col-12 m-0 quality-score-container bg-white p-3">
                        <div className="row mb-3 px-2">
                            <div className="col-6 pb-0">
                                <p className="h3-semibold primary-text mb-0">
                                    Bio Data
                                </p>
                            </div>
                            <div className="col-6 pb-0 d-flex justify-content-end ">
                                <button
                                className="body-regular bg-white mb-0"
                                style={{borderStyle: "none", color: "var(--Primary, #457900)"}}
                                onClick={() => navigate(`..${FARMER_ROUTES.SETTINGS}`)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row m-0 px-2"
                            style={{alignItems: "center"}}>
                                <div className="d-flex"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderStyle: "none",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--Accent, #DAFFE7)",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                >
                                    <img src={"/assets/images/calendar.svg"} 
                                    alt="period" 
                                    className="m-0"
                                    style={{width: "24px", height: "24px"}}
                                    />
                                </div>
                                <div className="col-10">
                                    <p className="body-regular secondary-text my-0">
                                        Years of Experience
                                    </p>
                                    <p className="h3-medium primary-text my-0">
                                        {`${yearsOfExperience} years`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 p-0 mt-3">
                            <div className="row m-0 px-2">
                                <img
                                src="/assets/images/home/success.svg"
                                alt="certs"
                                className="m-0"
                                style={{width: "40px"}}
                                />

                                <p className="col-10 m-0 h3-semibold primary-text">
                                    Certifications
                                </p>
                            </div>

                            <div className="col-12">
                                {
                                    certifications.map(certification => <QualityScoreCertificationItem 
                                    certificationName={certification.certificationName}
                                    completionDate={certification.completionDate}
                                    status={certification.status}
                                    />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 m-0 p-0 ps-0 ps-md-2 mt-3 mt-md-0">
                    <div className="col-12 m-0 quality-score-container bg-white p-3">
                        <div className="row mb-3 px-2">
                            <p className="h3-semibold primary-text mb-0">
                                Training Score
                            </p>
                        </div>

                        <div className="col-12">
                            <div className="row m-0 px-2"
                            style={{alignItems: "center"}}>
                                <div className="d-flex"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderStyle: "none",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--Accent, #DAFFE7)",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                >
                                    <p
                                    className="m-0"
                                    style={{width: "24px", height: "24px"}}
                                    >
                                        {averageTrainingScore}
                                    </p>
                                </div>
                                <div className="col-10">
                                    <p className="body-regular secondary-text my-0">
                                        Average Training Score
                                    </p>
                                    <p className="h3-medium primary-text my-0">
                                        {`Average`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 p-0 mt-3">
                            <div className="row m-0 px-2">
                                <img
                                src="/assets/images/home/completed_task.svg"
                                alt="certs"
                                className="m-0"
                                style={{width: "40px"}}
                                />

                                <p className="col-10 m-0 h3-semibold primary-text">
                                    Completed Trainings
                                </p>
                            </div>

                            <div className="col-12">
                                {
                                    trainings.map(training => <QualityScoreTrainingItem 
                                    trainingName={training.trainingName}
                                    trainingDate={training.trainingDate}
                                    percentageScore={training.percentageScore}
                                    />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </>);
}