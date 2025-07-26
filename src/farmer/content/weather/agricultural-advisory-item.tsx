import { AgriculturalAdvisoryItemProps } from "./weather-models";



const AgriculturalAdvisoryItem: React.FC<AgriculturalAdvisoryItemProps> = 
(data: AgriculturalAdvisoryItemProps) => {
    return (<>
    <div className="col-12 d-flex"
    style={{backgroundColor: data.backColor}}>

        <div className="d-block"
        style={{
            backgroundColor: data.barColor,
            width: "9px"
        }}>
            {/* Nothing here. Just the vertical bar */}
        </div>
        <div className="col-11 p-2">
            <div className="col-12 col d-flex">
                <img 
                src={data.iconUrl}
                alt="condition"
                className="col-2 m-0" 
                style={{width: "24px"}}
                />
                <p className="col-10 m-0 ms-2 body-bold primary-text m-0">
                    {data.title}
                </p>
            </div>

            <div className="col-12">
                <p className="body-regular secondary-text m-0">
                    {data.content}
                </p>
            </div>
        </div>
    </div>
    </>);
};

export default AgriculturalAdvisoryItem;