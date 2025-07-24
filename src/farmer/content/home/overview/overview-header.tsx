import { useNavigate } from "react-router-dom";
import { OverviewHeaderProps } from "../home-model";

const OverviewHeader: React.FC<OverviewHeaderProps> = (data: OverviewHeaderProps) => {
    const navigate = useNavigate();
    return (<>
    <div className="col-12">
        <div className="row mb-3">
            <div className="col-6 pb-0">
                <p className="h3-semibold primary-text mb-0">
                    {data.overviewTitle}
                </p>
            </div>
            <div className="col-6 pb-0 d-flex justify-content-end ">
                <button
                className="body-regular bg-white mb-0"
                style={{borderStyle: "none", color: "var(--Primary, #457900)"}}
                onClick={() => navigate(data.viewMoreUrl)}
                >
                    View More
                </button>
            </div>
        </div>
    </div>
    </>);
};

export default OverviewHeader;