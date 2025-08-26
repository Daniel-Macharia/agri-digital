import { WeatherKeyValuePairProps } from "./weather-models";


const WeatherKeyValuePairItem: React.FC<WeatherKeyValuePairProps> =
(data: WeatherKeyValuePairProps) => {

    return (<>
    <div className="col-12 d-flex" >
        <p className="col-6 weather-start-aligned-text body-regular primary-text m-0">
            {data.itemKey}
        </p>
        <p className="col-6 body-medium primary-text weather-end-aligned-text  m-0"
        style={{textAlign: "end"}}>
            {data.itemValue}
        </p>
    </div>
    </>);
};

export default WeatherKeyValuePairItem;