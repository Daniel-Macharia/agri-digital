import { FaStar } from "react-icons/fa";
import { ProjectReviewProps } from "../models";
import { ReactNode } from "react";


const ProjectReview: React.FC<ProjectReviewProps> = (data: ProjectReviewProps) => {

    const getRatings = ():ReactNode[] => {
        const stars: ReactNode[] = [];
        for( let i = 0; i < 5; i++ )
        {
            stars.push(
                <FaStar 
                size={12}
                color={ i < data.rating ? "var(--yellow, #F8C813)" : "#e4e5e9"}
                />
            );
        }

        return stars;
    };

    return (<>
    <div className="col-12 m-0 p-0 my-4 ">
        <div className="col-12 m-0 d-flex mb-2">
            {/* <div className="col-12 d-flex"> */}
                <div className="me-2 ">
                    <p className="body-regular primary-text crops-start-aligned-text m-0">
                        {data.username}
                    </p>
                </div>
                <div className="col-7 ms-4">
                    <div className="row justify-content-start" >
                        <p className="caption-medium crops-center-aligned-text px-3 py-1 m-0" 
                        style={{borderRadius: "20px",
                            borderStyle: "none",
                            backgroundColor: "var(--Accent, #DAFFE7)",
                            color: "var(--Primary, #457900)",
                            width: "max-content"
                        }}>
                            {data.userAccountState}
                        </p>
                    </div>
                </div>

            {/* </div> */}
        </div>

        <div className="col-12 my-1 d-flex " >
            <div className="my-0 py-0">
                <p className="crops-start-aligned-text my-0 py-0" > 
                    {getRatings()}
                </p>
            </div>
            <div className="col-7 my-0 py-0 mx-4">
                <div className="col-12 my-0 py-0">
                    <p className="caption-medium col-12 my-0 py-1">
                        {data.reviewDate.toDateString()}
                    </p>
                </div>
            </div>
        </div>

        <div className="col-12">
            <p className="crops-start-aligned-text body-regular primary-text m-0">
                {data.comment}
            </p>
        </div>
    </div>
    </>);
};

export default ProjectReview;