import { StorageSpecificationItemProps } from "../crops-models";
import "./storage-specification.css";

const StorageSpecification: React.FC<StorageSpecificationItemProps> = (item:StorageSpecificationItemProps) => {
    const render = () => {
        return (<>
        <div className="row col-sm-12 storage-specification-container card">
            <h3 className="small-regular col-sm-12 storage-left-aligned-text">
                {item.itemName}
            </h3>
            <h3 className="small-bold col-sm-12 storage-left-aligned-text">
                {item.itemValue}
            </h3>
        </div>
        </>);
    };
    return render();
};

export default StorageSpecification;