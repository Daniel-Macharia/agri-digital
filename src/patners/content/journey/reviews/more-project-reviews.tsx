import { FaStar } from "react-icons/fa";
import ProgressBar from "../projects/journey-item/progress-bar";
import { ProjectReviewProps } from "../models";
import ProjectReview from "./project-review";


const MoreProjectReviews: React.FC = () => {
    let fiveStarCount: number = 234;
    let fourStarCount: number = 25;
    let threeStarCount: number = 3;
    let twoStarCount: number = 0;
    let oneStarCount: number = 0;

    let reviewsTitle: string = "Employee Reviews";
    let averageRating: number = 4.8;
    let totalRating: number = 5;

    const getRatingStars = () :any[] => {
        let stars: any[] = [];
        
        for( let i = 1; i <= totalRating; i++ )
        {
            stars.push(
                <FaStar 
                size={20}
                color={ i < averageRating ? "var(--yellow, #F8C813)" : "#e4e5e9"}
                />
            );
        }
        return stars;
    };

    let reviews: ProjectReviewProps[] = [
            {username: "Julius Kiptoo",
            userAccountState: "verified",
            reviewDate: new Date("06/24/2025"),
            rating: 4,
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},

            {username: "Sandra Juma", 
            userAccountState: "verified", 
            reviewDate: new Date("06/10/2025"), 
            rating: 2, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},
            
            {username: "Millicent Ole Sapit", 
            userAccountState: "verified", 
            reviewDate: new Date("05/26/2025"), 
            rating: 1, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},
            
            {username: "Kevin Maiyo", 
            userAccountState: "verified", 
            reviewDate: new Date("05/20/2025"), 
            rating: 3, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},

            {username: "Sylvia Nanyama", 
            userAccountState: "verified", 
            reviewDate: new Date("05/13/2025"), 
            rating: 4, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"}
        ];

    return (<>
    <div className="col-12">
        <div className="row quality-score-container bg-white p-3">
                <div className="col-12 col-md-4">
                    <p className="col-12 center-aligned-text small-medium primary-text" style={{textAlign: "center"}}>
                        {reviewsTitle}
                    </p>
                    <p className="col-12 center-aligned-text h1-bold primary-text" style={{textAlign: "center"}}>
                        {averageRating}
                    </p>
                    <div className="col-12 d-flex" style={{justifyContent: "center"}}>
                        {getRatingStars()}
                    </div>

                    <p className="col-12 caption-medium secondary-text" style={{textAlign: "center"}}>
                        {`(${fiveStarCount + fourStarCount + threeStarCount + twoStarCount + oneStarCount} reviews)`}
                    </p>
                </div>

                <div className="col-12 col-md-8 align-content-center">
                    <div className="row m-0 align-content-center">
                        <div className="col-12 col-md-2 crops-end-aligned-text">
                            5 Stars
                        </div>
                        <div className="col-12 col-md-10 m-0 p-0 d-flex">
                            <div className="col-10 p-0 align-content-center">
                                <ProgressBar max={100} value={
                                    (fiveStarCount * 100) / (fiveStarCount + fourStarCount + threeStarCount + twoStarCount + oneStarCount)
                                }
                                fillColor={"var(--Secondary, #FF9800)"}
                                backColor={"var(--Background, #F5F5F5)"}
                                />
                            </div>
                            <p className="col-2 m-0 crops-end-aligned-text">
                                {fiveStarCount}
                            </p>
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col-12 col-md-2 crops-end-aligned-text">
                            4 Stars
                        </div>
                        <div className="col-12 col-md-10 m-0 p-0 d-flex">
                            <div className="col-10 p-0 align-content-center">
                                <ProgressBar max={100} value={
                                    (fourStarCount * 100) / (fiveStarCount + fourStarCount + threeStarCount + twoStarCount + oneStarCount)
                                }
                                fillColor={"var(--Secondary, #FF9800)"}
                                backColor={"var(--Background, #F5F5F5)"}
                                />
                            </div>
                            <p className="col-2 m-0 crops-end-aligned-text">
                                {fourStarCount}
                            </p>
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col-12 col-md-2 crops-end-aligned-text">
                            3 Stars
                        </div>
                        <div className="col-12 col-md-10 m-0 p-0 d-flex">
                            <div className="col-10 p-0 align-content-center">
                                <ProgressBar max={100} value={
                                    (threeStarCount * 100) / (fiveStarCount + fourStarCount + threeStarCount + twoStarCount + oneStarCount)
                                }
                                fillColor={"var(--Secondary, #FF9800)"}
                                backColor={"var(--Background, #F5F5F5)"}
                                />
                            </div>
                            <p className="col-2 m-0 crops-end-aligned-text">
                                {threeStarCount}
                            </p>
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col-12 col-md-2 crops-end-aligned-text">
                            2 Stars
                        </div>
                        <div className="col-12 col-md-10 m-0 p-0 d-flex">
                            <div className="col-10 p-0 align-content-center">
                                <ProgressBar max={100} value={
                                (twoStarCount * 100) / (fiveStarCount + fourStarCount + threeStarCount + twoStarCount + oneStarCount)
                                }
                                fillColor={"var(--Secondary, #FF9800)"}
                                backColor={"var(--Background, #F5F5F5)"}
                                />
                            </div>
                            <p className="col-2 m-0 crops-end-aligned-text">
                                {twoStarCount}
                            </p>
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col-12 col-md-2 crops-end-aligned-text">
                            1 Star
                        </div>
                        <div className="col-12 col-md-10 m-0 p-0 d-flex">
                            <div className="col-10 p-0 align-content-center">
                                <ProgressBar max={100} value={
                                    (oneStarCount * 100) / (fiveStarCount + fourStarCount + threeStarCount + twoStarCount + oneStarCount)
                                }
                                fillColor={"var(--Secondary, #FF9800)"}
                                backColor={"var(--Background, #F5F5F5)"}
                                />
                            </div>
                            <div className="col-2 m-0 crops-end-aligned-text">
                                {oneStarCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div className="row my-3 quality-score-container bg-white">
            {
                reviews.map((review, index: number) => <div className="col-12"><ProjectReview 
                username={review.username}
                userAccountState={review.userAccountState}
                reviewDate={review.reviewDate}
                rating={review.rating}
                comment={review.comment}
                />
                {(index < (reviews.length -1 ) ? <hr/> : <></>)}
                </div>)
            }
        </div>
    </div>
    </>);
};

export default MoreProjectReviews;