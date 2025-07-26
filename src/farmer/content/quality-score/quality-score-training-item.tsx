import { QualityScoreTrainingItemProps } from "./quality-score-models";


const QualityScoreTrainingItem: React.FC<QualityScoreTrainingItemProps> = 
(data: QualityScoreTrainingItemProps) => {

    return (<>
    <div className="col-12 p-2">
        <p className="body-semibold my-0"
        style={{color: "var(--Primary, #457900)"}}>
            {data.trainingName}
        </p>
        <div className="row m-0">
            <p className="col-8 m-0 p-1 small-regular secondary-text">
                {`${data.trainingDate}`}
            </p>
            <div className="col-4 m-0 p-0" >
                <p className="col-8 col-md-6 m-0 p-1 px-2 caption-regular crops-center-aligned-text"
                style={{
                    borderStyle: "none",
                    borderRadius: "20px",
                    backgroundColor: "var(--Accent, #DAFFE7)",
                    color: "var(--Primary, #457900)"
                }}>
                    {`${data.percentageScore}%`}
                </p>
            </div>
        </div>
    </div>
    </>);
};

export default QualityScoreTrainingItem;