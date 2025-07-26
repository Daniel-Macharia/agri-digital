import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KeyValuePair } from "../journey/crops/crops-models";


const QualityScoreBarChart: React.FC = () => {

    const periodOptions: string[] = [ "1 month", "3 months", "6 months", "1 year", "2 years"];

    let data: KeyValuePair[] = [
        { period: "Maize", value: 2},
        { period: "Rabbits", value: 1},
        { period: "Lettuce", value: 3},
        { period: "Carrots", value: 5},
        { period: "Spinach", value: 4},
        { period: "Dairy Cattle", value: 7},
    ];

    return (<>
    <div className="col-12 p-3">
        <div className="col-12 d-flex mb-3"
        >
            <div className="col-6">
                <p className="h3-semibold primary-text">
                    Quality Management
                </p>
            </div>
            <div className="col-6 d-flex"
            style={{justifyContent: "flex-end"}}>
                <select 
                className="col-10 col-md-4 p-2 py-0 m-0 quality-score-container"
                onChange={(event) => {
                    const val = event.target?.value;
                    alert(`selected: ${val}`);
                }}

                style={{
                    borderStyle: "none",
                    backgroundColor: "var(--primary, #457900)",
                    color: "var(--cards-form-bg, #FFF)"
                }}
                >
                    {
                        periodOptions.map(option => <option value={option} className="small-regular"
                        style={{borderStyle: "none"}}>
                            {option}
                        </option>)
                    }
                </select>
            </div>
        </div>

        <div className="col-12 p-0 m-0 mt-3">

            <ResponsiveContainer 
            height={300}
            width={"100%"}
            className={"mx-0 px-0"}

            >
                <BarChart
                data={data}
                margin={{top: 20, right: 20, bottom: 20, left: 0}}

                >
                    <CartesianGrid strokeDasharray={"3 10"} />
                    <XAxis dataKey={"period"} />
                    <YAxis domain={[0, 10]}  ticks={[0,2,4,6,8,10,12]}/>

                    <Tooltip />
                    <Legend />
                    <Bar 
                    dataKey={"value"}
                    stroke="var(--primary, #457900)"
                    fill="var(--primary, #457900)"

                    style={{
                        borderStyle: "none",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px"
                    }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
    </>);
};

export default QualityScoreBarChart;