import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KeyValuePair } from "../journey/crops/crops-models";
import { loadProjects } from "../journey/utils/load-project-data";
import { ProjectProps } from "../journey/models";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const QualityScoreBarChart: React.FC = () => {

    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [currentDuration, setCurrentDuration] = useState<number>(1);

    const periodOptions: number[] = [ 1, 3, 6, 12, 24];
    const loadedProjects: ProjectProps[] = loadProjects();

    let data: KeyValuePair[] = [];
    projects.forEach( project => data.push(
        { period: project.projectName, 
            value: ((project.overallScore * 7) / 100)}));

    useEffect( () => {
        switch(currentDuration)
        {
            case 1:
                setProjects(loadedProjects.slice(0,1));
                break;
            case 3:
                setProjects(loadedProjects.slice(0,loadedProjects.length - 4));
                break;
            case 6:
                setProjects(loadedProjects.slice(0,loadedProjects.length - 3));
                break;
            case 12:
                setProjects(loadedProjects.slice(0,loadedProjects.length - 2));
                break;
            case 24:
                setProjects(loadedProjects.slice(0,loadProjects.length-1));
                break;
            default:
                setProjects(loadedProjects);
                break;
        }
    }, [currentDuration]);

    console.log(projects);

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
                    //alert(`selected: ${val}`);
                    setCurrentDuration(parseInt(val));
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
                            {`${option} months`}
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
                    
                    onClick={(data:any) => {
                        console.log(`Value: ${data.payload.period}`);
                        navigate("/farmer/projects/info", { state: projects.find((project) => project.projectName === data.payload.period) } );
                    }}
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