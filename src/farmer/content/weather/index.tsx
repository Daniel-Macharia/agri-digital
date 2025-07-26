import { useNavigate } from "react-router-dom";
import CropsNotification from "../journey/crops/crops-notification/crops-notification";
import "./index.css";
import { FARMER_ROUTES } from "../../farmer-routes";
import React from "react";
import { AgriculturalAdvisoryItemProps, WeatherForecastItemProps, WeatherKeyValuePairProps } from "./weather-models";
import AgriculturalAdvisoryItem from "./agricultural-advisory-item";
import WeatherKeyValuePairItem from "./weather-key-value-pair-item";
import WeatherForecastItem from "./weather-forecast-item";

const Weather: React.FC = 
() => {
    const navigate = useNavigate();

    let weatherAdvisory: AgriculturalAdvisoryItemProps[] = [
        {
            title: "Planting conditions", 
            content: "Optimal for corn and soybeans. Soil temperature and moisture ideal",
            barColor: "var(--Primary, #457900)",
            backColor: "var(--Accent, #DAFFE7)",
            iconUrl: "/assets/images/weather/plant.svg"
        },
        {
            title: "Harvesting", 
            content: "Wait 2-3 days. Rain expected tomorrow could affect crop moisture.",
            barColor: "var(--Remember-me-Links, #2966FF)",
            backColor: "var(--Light-Blue, #E1EEFF)",
            iconUrl: "/assets/images/weather/clock.svg"
        },
        {
            title: "Pest alert", 
            content: "High risk of fungal disease due to humidity. Monitor wheat crops.",
            barColor: "var(--red, #F25C5E)",
            backColor: "var(--light-red, #FFF1E9)",
            iconUrl: "/assets/images/weather/bug.svg"
        }
    ]; 
    

    let currentConditions: WeatherKeyValuePairProps[] = [
        {
            itemKey: "Temperature",
            itemValue: "24 C"
        },
        {
            itemKey: "Humidity",
            itemValue: "65%"
        },
        {
            itemKey: "Wind Speed",
            itemValue: "12Km/hr NW"
        },
        {
            itemKey: "UV Index",
            itemValue: "6-high"
        },
        {
            itemKey: "Dew Point",
            itemValue: "15 c"
        }
    ];

    let soilConditions: WeatherKeyValuePairProps[] = [
        {
            itemKey: "Soil Temperature",
            itemValue: "18 C"
        },
        {
            itemKey: "Soil Moisture",
            itemValue: "42%"
        },
        {
            itemKey: "Workability",
            itemValue: "Good"
        },
        {
            itemKey: "Compaction Rist",
            itemValue: "Moderate"
        },
        {
            itemKey: "Frost Depth",
            itemValue: "None"
        }
    ];

    let growingConditions: WeatherKeyValuePairProps[] = [
        {
            itemKey: "Disease Risk",
            itemValue: "Moderate"
        },
        {
            itemKey: "Frost Risk(24h)",
            itemValue: "None"
        },
        {
            itemKey: "Heat Stress Risk",
            itemValue: "Moderate"
        },
        {
            itemKey: "Growing Conditions",
            itemValue: "Excellent"
        }
    ];


    let weatherForecastItems: WeatherForecastItemProps[] = [
        {
            dayOfTheWeek: "Sat",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 10
        },
        {
            dayOfTheWeek: "Sun",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 15
        },
        {
            dayOfTheWeek: "Mon",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 11
        },
        {
            dayOfTheWeek: "Tue",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 10
        },
        {
            dayOfTheWeek: "Wed",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 12
        },
        {
            dayOfTheWeek: "Thu",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 10
        },
        {
            dayOfTheWeek: "Fri",
            iconUrl: "/assets/images/weather/rainy_sunny.svg",
            temperature: 12
        }
    ];



    const handleGoBackHome = () => {
        navigate(`..${FARMER_ROUTES.HOME.replace("/*", "")}`);
    };

    
    return (<>
    <div className="col-12">
        <div className="col-12 d-flex justify-content-start">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="col-12 my-3" >
            <CropsNotification iconUrl="/assets/images/warning.svg"
            message={"Strong winds detected.\! Stalk weak plants to prevent damage."}/>
        </div>

        <div className="col-12 weather-container bg-white p-3">
            <p className="col-12 weather-start-aligned-text h3-semibold primary-text">
                Today's Agricultural Advisory
            </p>
            <div className="row">

                {
                    weatherAdvisory.map( (advice) => <div className="col-12 col-md-4 pe-md-2 mt-2 mt-md-0">
                    <AgriculturalAdvisoryItem
                    title={advice.title}
                    content={advice.content}
                    barColor={advice.barColor}
                    backColor={advice.backColor}
                    iconUrl={advice.iconUrl}
                    />
                    </div>)
                }
            </div>
        </div>

        <div className="col-12 mt-3">
            <div className="row m-0">
                <div className="col-12 col-md-4 pe-md-2 p-0 mt-2 mt-md-0">
                    <div className="col-12 weather-container bg-white p-3 m-0"
                    style={{height: "100%"}}>
                        <div className="col-12 d-flex">
                            <p className="col-10 m-0 h3-semibold primary-text">
                                Current conditions
                            </p>
                            <img 
                            src="/assets/images/weather/sun.svg"
                            alt="condition"
                            className="col-2 m-0" 
                            style={{width: "32px"}}
                            />
                        </div>

                        <div className="col-12">
                            <div className="col-12 d-flex align-items-center">
                                <p className="col-6 weather-start-aligned-text body-regular primary-text m-0">
                                    {currentConditions[0].itemKey}
                                </p>
                                <p className="col-6 weather-end-aligned-text h2-bold primary-text m-0"
                                style={{textAlign: "end"}}>
                                    {currentConditions[0].itemValue}
                                </p>
                            </div>
                            {
                                currentConditions.slice(1).map( condition => <WeatherKeyValuePairItem 
                                itemKey={condition.itemKey}
                                itemValue={condition.itemValue}
                                />)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mt-2 p-0 mt-md-0">
                    <div className="col-12 weather-container bg-white p-3 m-0"
                    style={{height: "100%"}}>
                        <div className="col-12 d-flex">
                            <p className="col-10 m-0 h3-semibold primary-text">
                                Soil conditions
                            </p>
                            <img 
                            src="/assets/images/weather/soil.svg"
                            alt="condition"
                            className="col-2 m-0" 
                            style={{width: "32px"}}
                            />
                        </div>

                        <div className="col-12">
                            {
                                soilConditions.map( condition => <WeatherKeyValuePairItem 
                                itemKey={condition.itemKey}
                                itemValue={condition.itemValue}
                                />)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 p-0 ps-md-2 mt-2 mt-md-0">
                    <div className="col-12 weather-container bg-white p-3 m-0"
                    style={{height: "100%"}}>
                        <div className="col-12 d-flex">
                            <p className="col-10 m-0 h3-semibold primary-text">
                                Growing conditions
                            </p>
                            <img 
                            src="/assets/images/weather/yellow_plant.svg"
                            alt="condition"
                            className="col-2 m-0" 
                            style={{width: "32px"}}
                            />
                        </div>

                        <div className="col-12">
                            {
                                growingConditions.map( condition => <WeatherKeyValuePairItem 
                                itemKey={condition.itemKey}
                                itemValue={condition.itemValue}
                                />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-12 weather-container bg-white mt-3 p-3">
            <p className="col-12">
                7-Day Forecast
            </p>

            <div className="row m-0 justify-content-space-around"
            style={{
                justifyContent: "space-between"
            }}>
                {
                    weatherForecastItems.map(forecastItem => <div className=" p-2 " 
                    style={{width: 'min-content'}}>
                        <WeatherForecastItem
                        dayOfTheWeek={forecastItem.dayOfTheWeek}
                        iconUrl={forecastItem.iconUrl}
                        temperature={forecastItem.temperature}
                        />
                    </div> )
                }
            </div>
        </div>
        
    </div>
    </>);
};

export default Weather;