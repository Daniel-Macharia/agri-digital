import { useNavigate } from "react-router-dom";
import { LivestockProjectSummaryProps } from "../../models";
import { PROJECTS_ROUTES } from "../projects-routes";


const LivestockProjectSummary: React.FC<LivestockProjectSummaryProps> = (data: LivestockProjectSummaryProps) => {
    const navigate = useNavigate();
    const handleViewMore = () => {
        console.log(`livestock ID: ${data.livestockId}`);
        navigate(`..${PROJECTS_ROUTES.LIVESTOCK_PROJECT_MORE_INFO}`, {state: data.livestockId});
    };
    
    return (<>
    <div className="my-4 card">
        <div className="col-12">
            <div className="row my-0">
                <div className="col-8">
                    <p className="col-12 h3-semibold primary-text crops-start-aligned-text my-0"
                    >
                        {data.livestockName}
                    </p>
                </div>
                <div className="col-4">
                    <button
                    className="col-12 h3-semibold crops-end-aligned-text my-0"
                    style={{
                        color: "var(--Primary, #457900)",
                        backgroundColor: "white",
                        borderStyle: "none"
                    }}
                    onClick={handleViewMore}
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>

        <div className="col-12 mt-3">
            <p className="body-regular primary-text crops-start-aligned-text my-0">
                {data.shortDescription}
            </p>
        </div>
    </div>
    </>);
};

export default LivestockProjectSummary;