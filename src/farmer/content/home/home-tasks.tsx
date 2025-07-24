import { useNavigate } from "react-router-dom";
import { TaskItemProps } from "./home-model";

const TaskItem: React.FC<TaskItemProps> = ( data: TaskItemProps) => {


    return (<>
    <div className="col-12 my-3">
        <div className="col-12 d-flex">
            <div className="">
                <img src="/assets/images/home/green_calendar_icon.svg"
                alt="time"
                className="my-0"
                style={{width: "20px"}}/>
            </div>
            <div className="col-11">
                <p className="col-12 my-0 small-regular justify-self-center"
                style={{color: "var(--Primary, #457900)" }}>
                    {data.taskDate}
                </p>
            </div>
        </div>

        <div className="col-12 my-2">
            <p className="col-12 my-0 h3-semibold primary-text">
                {data.taskTitle}
            </p>
        </div>

        <div className="col-12">
            <p className="col-12 my-0 small-regular secondary-text">
                {data.taskDesc}
            </p>
        </div>
    </div>
    </>);
};

const HomeTasks: React.FC = () => {

    const navigate = useNavigate();
    
    let tasks: TaskItemProps[] = [
        {
            taskDate: "September 1, 2025 9:00 AM", 
            taskTitle: "Name of Task", 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        },
        {
            taskDate: "September 1, 2025 9:00 AM", 
            taskTitle: "Name of Task", 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        },
        {
            taskDate: "September 1, 2025 9:00 AM", 
            taskTitle: "Name of Task", 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        },
    ];

    const handleGoBackHome = () => {
        alert("going back Home");
        navigate("/farmer/home")
    };

    return (<>
    <div className="col-12">

        <div className="col-12 d-flex justify-content-start my-4">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>


        <div className="col-12 farmer-home-container bg-white p-4">
            <div className="col-12">
                <h3 className="h3-semibold primary-text">
                    Task Due
                </h3>
            </div>

            <div className="col-12">
                {
                    tasks.map( (task, index: number) => <><div className="col-12" >
                        <TaskItem
                        taskDate={task.taskDate}
                        taskTitle={task.taskTitle}
                        taskDesc={task.taskDesc}
                        />
                        </div>
                        {(index < (tasks.length - 1)) ? <hr/> : ""}
                        </>)
                }
            </div>
        </div>
    </div>
    </>);
};

export default HomeTasks