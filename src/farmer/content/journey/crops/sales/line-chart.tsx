import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KeyValuePair } from "../crops-models";


const SalesLineChart: React.FC = () => {

    const insightsData: KeyValuePair[] = [
        {"period": "March 31", "value": 78},
        {"period": "April 5", "value": 79},
        {"period": "April 10", "value": 75},
        {"period": "April 15", "value": 85},
        {"period": "April 20", "value": 79},
        {"period": "April 25", "value": 80},
        {"period": "April 30", "value": 80}
    ];

    

    const yTicks: number[] = [25,30,35,40,45,50,55,60,65,70,75,80,85,90];

    return(
    <ResponsiveContainer
    height={300}
    width="100%"
    className="mx-0"
    >

        <LineChart 
        data={insightsData}
        margin={{top: 20, right: 20, bottom: 20, left: 20}}
        >
            <CartesianGrid strokeDasharray={"3 10"}/>
            <XAxis dataKey={"period"} />
            <YAxis domain={[25, 90]} ticks={yTicks}/>
            <Tooltip />
            <Legend />
            <Line 
            type={"monotone"} 
            dataKey={"value"}
            stroke="var(--primary)"
            activeDot={{ r : 8 }}/>
        </LineChart>

    </ResponsiveContainer>
    );
};


export default SalesLineChart;