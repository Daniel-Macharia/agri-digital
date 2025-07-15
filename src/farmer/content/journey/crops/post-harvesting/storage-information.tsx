import { StorageSpecificationItemProps } from "../crops-models";
import StorageSpecification from "./storage-specification";

interface StorageInfo{
    storageType: string,
    storagePurpose: string
};

interface StorageConditions{
    humidity: number,
    temperature: number
};

const StorageInformation: React.FC = () => {
    let storageSpecs:StorageSpecificationItemProps[] = [
        {itemName: "Inventory Level", itemValue : "3,500Kg"},
        {itemName: "Storage Duration", itemValue : "10days"},
        {itemName: "Storage Fee", itemValue : "KES 5,000/Month"}
    ];

    let storageConditions: StorageConditions = {
        humidity: 45,
        temperature: 24
    };

    let storageInfo: StorageInfo = {storageType: "Cold Storage", 
        storagePurpose: "preserve freshness"};

    const render = () => {
        return (<>
        <div className="col-12 crops-container bg-white" >
            
            <div className="row my-0 py-0" >
                <div className="col-11" >
                    <h3 className="h3-bold primary-text crops-start-aligned-text col-12 my-1" >
                        Storage
                    </h3>
                </div>

                <div className="col-1 p-0" >
                    <img src="/assets/images/edit.svg" 
                    alt="edit" 
                    className="col-12 m-0"
                    style={{width: "24px"}}
                    />
                </div>
            </div>

            <div className="row p-2">
                <div className="col-12 col-md-6  p-2">
                    <div className="col-12 card m-0 p-2">
                        <h3 className="body-medium primary-text col-12  crops-start-aligned-text my-1">
                            Storage Type
                        </h3>

                        <h3 className="h3-semibold primary-text col-12 crops-start-aligned-text my-1">
                            {storageInfo.storageType}
                        </h3>

                        <p className="body-regular secondary-text col-12 crops-start-aligned-text my-1" >
                            {storageInfo.storagePurpose}
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-6 p-2">
                    <div className="col-12 card m-0 p-2">
                        <h3 className="body-medium primary-text col-12 crops-start-aligned-text my-1">
                            Containers
                        </h3>

                        <div className="col-12 my-1" >
                            <div className="row my-1" >
                                <p className="body-regular secondary-text col-8 m-0 crops-start-aligned-text">
                                    Humidity
                                </p>

                                <p className="body-bold primary-text col-4 m-0 crops-end-aligned-text">
                                    {storageConditions.humidity}
                                </p>
                            </div>
                        </div>

                        <div className="col-12 my-1" >
                            <div className="row p-0" >
                                <p className="body-regular secondary-text col-8 m-0 crops-start-aligned-text">
                                    Temperature
                                </p>

                                <p className="body-bold primary-text col-4 m-0 crops-end-aligned-text">
                                    {storageConditions.temperature}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-12 px-0"
            >

                <div className="row px-1 mx-0 ">
                    {
                        storageSpecs.map( (storageSpec, index: number) => <div className={`col-12 col-md-4 mx-0 px-1 ${ (index === 0 ) ? "ps-0" : ""} ${( index === (storageSpecs.length - 1)) ? "pe-0" : "" }`} >
                            <StorageSpecification 
                            itemName={storageSpec.itemName} 
                            itemValue={storageSpec.itemValue} />
                        </div>)
                    }
                </div>

            </div>

        </div>
        </>);
    };

    return render();
};

export default StorageInformation;