import { CropProjectSummaryProps } from "../../models";


const CropProjectSummary: React.FC<CropProjectSummaryProps> = ( data:CropProjectSummaryProps ) => {

    const cropProjectStages: string[] = ["Soil Testing", "Planting", "Management", "Harvesting", "Post-harvesting", "Sales"];
    
    
    return (<>
    <div className="my-4 card">
        <div className="col-12">
            <div className="row">
                <div className="col-6 col-sm-8">
                    <p className="h3-semibold primary-text crops-start-aligned-text my-2">
                        {cropProjectStages[data.cropProjectStage - 1]}
                    </p>
                </div>

                <div className="col-6 col-md-4">
                    <p className="h3-semibold crops-end-aligned-text my-2"
                    style={{color: "var(--Primary, #457900)"}}>
                        {data.stageScore}{"%"}
                    </p>
                </div>
            </div>
        </div>
        
        <div className="col-12">
            <p className="crops-start-aligned-text">
                {data.cropProjectDescription}
            </p>
        </div>

        <hr />

        <div className="col-12">
            <div className="row">
                <div className="col-6">
                    <p className="body-regular secondary-text my-2 col-12 col-md-6 crops-start-aligned-text" style={{backgroundColor: "white"}}>
                        Stage {data.cropProjectStage} of {6}
                    </p>
                </div>
                <div className="col-6">
                    <div className="row justify-content-end">
                        <p className="body-regular primary-text my-2 col-6 crops-end-aligned-text"
                        style={{color: "var(--Primary, #457900)", backgroundColor: "white"}}>
                            Done
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default CropProjectSummary;