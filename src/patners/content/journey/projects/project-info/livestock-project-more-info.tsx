import { useLocation } from "react-router-dom";
import RatingAndReviews from "../../reviews/ratings-and-reviews";
import { ProjectKeyValuePairItemProps } from "./project-models";

const KeyValueData: React.FC<ProjectKeyValuePairItemProps> = 
(data: ProjectKeyValuePairItemProps) => {
    return(<>
    <div className="col-12 my-1">
        <div className="col-11 d-flex gap-0 m-0 ">
            <p className="col-7 project-start-aligned-text body-regular secondary-text m-0">
                {data.itemKey}
            </p>
            <p className="col-5 project-end-aligned-text body-bold primary-text m-0">
                {data.itemValue}
            </p>
        </div>
    </div>
    </>);
};


const LivestockProjectMoreInfo: React.FC = () => {
    const livestockId: number = useLocation().state;

    console.log("ID received: " + livestockId);
    
    let productionStatus: string = "Sold";

    let generalInfo: ProjectKeyValuePairItemProps[] = [
        {itemKey: "Sex", itemValue: "Lorem, ipsum"},
        {itemKey: "Weight at birth", itemValue: "Lorem, ipsum"},
        {itemKey: "Breed", itemValue: "Lorem, ipsum"},
        {itemKey: "Purpose", itemValue: "Lorem, ipsum"},
        {itemKey: "Vital status", itemValue: "Lorem, ipsum"}
    ];

    let feedingAndNutrition: ProjectKeyValuePairItemProps[] = [
        {itemKey: "Weight", itemValue: "Lorem, ipsum"},
        {itemKey: "Type of feed", itemValue: "Lorem, ipsum"},
        {itemKey: "Quantity of feed", itemValue: "Lorem, ipsum"},
        {itemKey: "Feeding schedule", itemValue: "Lorem, ipsum"},
        {itemKey: "Status", itemValue: "Lorem, ipsum"}
    ];

    let production: ProjectKeyValuePairItemProps[] = [
        {itemKey: "Collection records", itemValue: "Lorem, ipsum"},
        {itemKey: "Feed conversion ratio", itemValue: "Lorem, ipsum"},
        {itemKey: "Slaughter age", itemValue: "Lorem, ipsum"},
        {itemKey: "Expected yield", itemValue: "Lorem, ipsum"},
        {itemKey: "Milk produce", itemValue: "Lorem, ipsum"}
    ];

    let pestAndDiseaseManagement: ProjectKeyValuePairItemProps[] = [
        {itemKey: "Issues", itemValue: "Lorem, ipsum"},
        {itemKey: "Symptoms", itemValue: "Lorem, ipsum"},
        {itemKey: "Diagnosis", itemValue: "Lorem, ipsum"},
        {itemKey: "Vaccines", itemValue: "Lorem, ipsum"},
        {itemKey: "Quarantine", itemValue: "Lorem, ipsum"}
    ];

    let breedingAndReproduction: ProjectKeyValuePairItemProps[] = [
        {itemKey: "Estrus detection", itemValue: "Lorem, ipsum"},
        {itemKey: "Next action", itemValue: "Lorem, ipsum"},
        {itemKey: "Conception date", itemValue: "Lorem, ipsum"},
        {itemKey: "Age", itemValue: "Lorem, ipsum"},
        {itemKey: "NewBorn", itemValue: "Lorem, ipsum"}
    ];

    const handleViewReportAction = () => {
        alert("viewing report");
    };

    return (<>
    <div className="col-12 pb-3">
        <div className="col-12">
            <RatingAndReviews />
        </div>

        <div className="col-12 ">
            <div className="row ">
                <div className="col-12 col-md-4 mt-3 pe-md-2">
                    <div className="col-12 project-container bg-white p-3">
                        <p className="h3-bold primary-text m-0">
                            General Information
                        </p>
                        <div className="col-12">
                            {
                                generalInfo.map((info) => <KeyValueData 
                                itemKey={info.itemKey} 
                                itemValue={info.itemValue} />)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mt-3 px-md-2">
                    <div className="col-12 project-container bg-white p-3">
                        <p className="h3-bold primary-text m-0">
                            Feeding and Nutrition
                        </p>
                        <div className="col-12">
                            {
                                feedingAndNutrition.map((info) => <KeyValueData 
                                itemKey={info.itemKey} 
                                itemValue={info.itemValue} />)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mt-3 ps-md-2">
                    <div className="col-12 project-container bg-white p-3">
                        <div className="row d-flex">
                            <p className="col-8 h3-bold primary-text m-0">
                                Production
                            </p>
                            <div className="col-4 d-flex justify-content-end">
                                <button
                                className="small-medium px-2 py-1 m-0"
                                style={{color: "var(--cards-form-bg, #FFF)",
                                    backgroundColor: "var(--Primary, #457900)",
                                    borderStyle: "none",
                                    borderRadius: "20px",
                                }}>
                                    {productionStatus}
                                </button>
                            </div>
                        </div>
                        <div className="col-12">
                            {
                                production.map((info) => <KeyValueData 
                                itemKey={info.itemKey} 
                                itemValue={info.itemValue} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-12">
            <div className="row">
                <div className="col-12 col-md-6 pe-md-2 mt-3">
                    <div className="col-12 project-container bg-white p-3">
                        <div className="row d-flex">
                            <p className="col-8 h3-bold primary-text m-0">
                                Pests and Diseases
                            </p>
                            <div className="col-4 d-flex justify-content-end" >
                                <button
                                className="small-medium px-2 py-1 m-0"
                                style={{color: "var(--cards-form-bg, #FFF)",
                                    backgroundColor: "var(--Primary, #457900)",
                                    borderStyle: "none",
                                    borderRadius: "20px"
                                }}
                                onClick={handleViewReportAction}
                                >
                                    View Report
                                </button>
                            </div>
                        </div>
                        <div className="col-12">
                            {
                                pestAndDiseaseManagement.map((info) => <KeyValueData 
                                itemKey={info.itemKey} 
                                itemValue={info.itemValue} />)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 ps-md-2 mt-3">
                    <div className="col-12 project-container bg-white p-3">
                        <p className="h3-bold primary-text m-0">
                            Breeding and Reproduction
                        </p>
                        <div className="col-12">
                            {
                                breedingAndReproduction.map((info) => <KeyValueData 
                                itemKey={info.itemKey} 
                                itemValue={info.itemValue} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default LivestockProjectMoreInfo;