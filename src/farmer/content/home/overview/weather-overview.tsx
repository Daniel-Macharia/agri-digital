import { WeatherSummaryProps } from "../home-model";

const weatherSummaryProps: WeatherSummaryProps = {
    farmLocation: "Ruiru",
    farmName: "Mugutha",
    sun: "Clear Sky",
    temperature: 45,
    humidity: 65,
    windSpeed: 125
};

const WeatherOverview:React.FC = () => {

    return (<>
    <div className="col-12">
        <p className="h3-semibold primary-text">
            Today's weather in {weatherSummaryProps.farmLocation}, {weatherSummaryProps.farmName}
        </p>

        <div className="col-12">
            <div className="row">
                <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="row">
                        <div className="col-4">
                            <img src="/assets/images/home/sun.svg" 
                            style={{width: "32px"}}
                             />
                        </div>
                        <div className="col-8 px-0 ps-1">
                            <p className="col-12 small-regular my-0"
                            style={{color: "var(--Secondary, #FF9800)"}}>
                                Sunny
                            </p>
                            <p className="col-12 body-regular primary-text my-0">
                                {weatherSummaryProps.sun}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="row">
                        <div className="col-4">
                            <img src="/assets/images/home/thermometer.svg" 
                            style={{width: "32px"}}
                             />
                        </div>
                        <div className="col-8 px-0 ps-1">
                            <p className="col-12 small-regular my-0"
                            style={{color: "var(--Remember-me-Links, #2966FF)"}}>
                                Temperature
                            </p>
                            <p className="col-12 body-regular primary-text my-0">
                                {weatherSummaryProps.temperature} C
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="row">
                        <div className="col-4">
                            <img src="/assets/images/home/humidity.svg" 
                            style={{width: "32px"}}
                            />
                        </div>
                        <div className="col-8 px-0 ps-1">
                            <p className="col-12 small-regular my-0"
                            style={{color: "var(--success, #26A65B)"}}>
                                Humidity
                            </p>
                            <p className="col-12 body-regular primary-text my-0">
                                {weatherSummaryProps.humidity} %
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="row">
                        <div className="col-4">
                            <img src="/assets/images/home/wind.svg" 
                            style={{width: "32px"}}
                             />
                        </div>
                        <div className="col-8 px-0 ps-1">
                            <p className="col-12 small-regular my-0"
                            style={{color: "var(--red, #F25C5E)"}}>
                                Wind Speed
                            </p>
                            <p className="col-12 body-regular primary-text my-0">
                                {weatherSummaryProps.windSpeed} Km/hr
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default WeatherOverview;