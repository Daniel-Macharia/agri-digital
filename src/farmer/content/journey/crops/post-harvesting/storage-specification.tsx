import { StorageSpecificationItemProps } from "../crops-models";

const StorageSpecification: React.FC<StorageSpecificationItemProps> = (item:StorageSpecificationItemProps) => {
    const render = () => {
        return (<>
        <div className="col-12 card p-1">
            <h3 className="body-medium primary-text col-12 crops-start-aligned-text my-1">
                {item.itemName}
            </h3>
            <h3 className="h3-semibold primary-text col-12 crops-start-aligned-text my-1">
                {item.itemValue}
            </h3>
        </div>
        </>);
    };
    return render();
};

export default StorageSpecification;