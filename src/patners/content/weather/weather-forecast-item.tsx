import { WeatherForecastItemProps } from "./weather-models";


const WeatherForecastItem: React.FC<WeatherForecastItemProps> =
(data: WeatherForecastItemProps) => {

    return (<>
    <div className="col-12"
    style={{
        width: "min-content",
        borderRadius:"30px",
        backgroundColor: "var(--Dark-Green, #578158)"
    }}>
        <div className="col-12 m-0">
            <p className="col-12 weather-center-aligned-text p-0 py-2 m-0 mb-0 body-semibold"
            style={{textAlign: "center", color: "var(--cards-form-bg, #FFF)"}}>
                {data.dayOfTheWeek}
            </p>
        </div>

        {/* The following div only acts as a horizontal line. A normal <hr/> tag doesn't stand out enough */}
        <div className="col-12 my-0" 
        style={{backgroundColor: "var(--Border, #ECECEC)", height: "1px"}}/>

        <div className="col-12 my-0 p-4 d-flex justify-content-center">
            <img src={data.iconUrl}
            alt="icon"
            className=""
            style={{width: "56px"}}/>
        </div>

        <div className="col-12">
            <p className="col-12 p-0 pb-2 m-0 mb-2 h1-semibold"
            style={{textAlign: "center", color: "var(--cards-form-bg, #FFF)"}}>
                {`${data.temperature}`}
            </p>
        </div>
    </div>
    </>);
};

export default WeatherForecastItem;