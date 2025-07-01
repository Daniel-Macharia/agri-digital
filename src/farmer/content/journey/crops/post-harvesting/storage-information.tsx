import { StorageSpecificationItemProps } from "../crops-models";
import "./storage-information.css";
import StorageSpecification from "./storage-specification";

const StorageInformation: React.FC = () => {
    let storageSpecs:StorageSpecificationItemProps[] = [
        {"itemName": "Inventory Level", "itemValue" : "3,500Kg"},
        {"itemName": "Storage Duration", "itemValue" : "10days"},
        {"itemName": "Storage Fee", "itemValue" : "KES 5,000/Month"}
    ];
    const render = () => {
        return (<>
        <div className="row col-sm-12 storage-information-container" >
            
            <div className="storage-top-bar row" >
                <h3 className="h3-semibold storage-title col-sm-10 storage-left-aligned-text" >Storage</h3>

                <img src="/assets/images/edit.svg" alt="edit" className="storage-edit col-sm-1"/>
            </div>

            <div className="row storage-items-container">
                <div className="col-sm-5 storage-item-container card">
                    <h3 className="small-semibold col-sm-12  storage-left-aligned-text">
                        Storage Type
                    </h3>

                    <h3 className="body-semibold col-sm-12 storage-left-aligned-text">
                        Cold Storage
                    </h3>

                    <p className="small-regular col-sm-12 storage-left-aligned-text" >
                        Preserve Freshness
                    </p>
                </div>

                <div className="col-sm-5 storage-item-container card">
                    <h3 className="small-semibold col-sm-12 storage-left-aligned-text">
                        Containers
                    </h3>

                    <div className="row col-sm-12" >
                        <p className="small-regular col-sm-7 storage-left-aligned-text">
                            Humidity
                        </p>

                        <p className="small-semibold col-sm-4  storage-right-aligned-text">
                            45%
                        </p>
                    </div>

                    <div className="row col-sm-12" >
                        <p className="small-regular col-sm-7  storage-left-aligned-text">
                            Temperature
                        </p>

                        <p className="small-semibold col-sm-4  storage-right-aligned-text">
                            24 C
                        </p>
                    </div>
                </div>

            </div>

            <div className="row col-sm-12 storage-specs-container"
            >

                {
                    storageSpecs.map( storageSpec => <div className="col-sm-4" >
                        <StorageSpecification 
                        itemName={storageSpec.itemName} 
                        itemValue={storageSpec.itemValue} />
                    </div>)
                }

            </div>

        </div>
        </>);
    };

    return render();
};

export default StorageInformation;