
export interface AgriculturalAdvisoryItemProps{
    title: string,
    iconUrl: string,
    content: string
    barColor: string,
    backColor: string
};

export interface WeatherKeyValuePairProps{
    itemKey: string,
    itemValue: string
};

export interface WeatherForecastItemProps{
    dayOfTheWeek: string,
    iconUrl: string,
    temperature: number
};