import { useNavigate } from "react-router-dom";
import { TaskItemProps } from "./home-model";
import { useEffect, useState } from "react";
import { FARMER_HOME_ROUTES } from "./home-routes";

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
                    {data.taskDate.toString()}
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
    
    const tasks: TaskItemProps[] = [
        {
            taskDate: new Date( 2025, 8, 1, 2, 44), 
            taskTitle: "Name of Task", 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        },
        {
            taskDate: new Date( 2025, 8, 1, 5, 44), 
            taskTitle: "Name of Task", 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        },
        {
            taskDate: new Date( 2025, 8, 1, 4, 44), 
            taskTitle: "Name of Task", 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        },
    ];

    useEffect( () => {
        for( let i = 0; i < 22; i++ )
        {
            tasks.push({
            taskDate: new Date( 2025, 8, 1, 4, 44), 
            taskTitle: `Task ${i + 1}`, 
            taskDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illum iusto excepturi? Animi pariatur quod at sequi officia ipsa aperiam totam tenetur id rerum!"
        });
        }
    }, []);

    const handleGoBackHome = () => {
        navigate(`${FARMER_HOME_ROUTES.FULL.HOME_FULL}`);
    };


    const [listData, setListData] = useState<TaskItemProps[]>(tasks);
    const sortOptions: string[] = ["Date"];
    const [sortBy, setSortBy] = useState<string>(sortOptions[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);
    
    const dataSize: number = tasks.length;
    const pageSize: number = dataSize >= 10 ? 10 : dataSize;

    let numberOfPages: number = Math.trunc(dataSize / pageSize);
    
    if( numberOfPages === 0 )
        numberOfPages = 1;
    else if( (numberOfPages * pageSize) < dataSize )
        numberOfPages = numberOfPages + 1;

    console.log(numberOfPages);
    const pages: number[] = [];
    
    for( let count = 1; count <= numberOfPages; count++ )
    {
        pages.push(count);
    }

    useEffect(() => {
        setListData(listData.sort((task1, task2) => {
            if( task1.taskDate.valueOf() < task2.taskDate.valueOf() )
                return -1;
            else if( task1.taskDate.valueOf() === task2.taskDate.valueOf() )
                return 0;
            else 
                return 1;
            }
        ));
    listData.forEach(item => console.log(item));
    }, [sortBy]);

    const handleMoveToNext = () => {
        console.log("moving to the next page");
        setCurrentPage( (currentPage < numberOfPages) ? (currentPage + 1) : 1)
    }

    useEffect( () => {
        const startIndex: number = Math.trunc( currentPage * pageSize) - pageSize;
        const endIndex: number = Math.trunc(currentPage * pageSize);

        setCurrentStartIndex(startIndex);

        setListData(tasks.slice( startIndex, endIndex));
    }, [currentPage]);

    return (<>
    <div className="col-12 mb-4">

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

            <div className="row m-0 p-2 justify-content-end align-items-center">
                <p className="m-0 p-0 body-regular"
                style={{width: "max-content"}}>
                    {`Showing ${currentStartIndex + 1} to ${(currentStartIndex + listData.length)} of ${dataSize} Tasks`}
                </p>
                <div className="m-0"
                style={{width: "max-content"}}>
                    <div className="row p-0 m-0" 
                    style={{width: "max-content"}}>
                        <p className=" m-0 p-2 invite-end-aligned-text body-regular"
                        style={{width: "max-content"}}>
                            Sort by: 
                        </p>
                        <select 
                        className="m-0 p-0 bg-white body-bold"
                        onChange={(event) => {
                            const value = event.target?.value;
                            //toast.info(`Selected: ${value}`);
                            setSortBy(value);
                        }}
                        
                        style={{
                            width: "max-content",
                            borderStyle: "none",
                            borderRadius: "4px", 
                        }}
                        >
                            {
                                sortOptions.map( (sortOption, index) => <option 
                                key={index} 
                                value={sortOption}
                                className="m-0 p-1"
                                style={{
                                    backgroundColor: "var(--Background, #F5F5F5)",
                                    borderStyle: "none"
                                }}
                                >
                                    {sortOption}
                                </option>)
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="col-12">
                {
                    listData.map( (task, index: number) => <><div className="col-12" >
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

            <div className="row m-0 p-0 justify-content-center">
                {
                    pages.map( (pageNumber, index) => 
                        <div className=" body-medium p-2 m-2 text-align-center"
                        style={{color: " var(--Primary, #457900)", 
                        backgroundColor: ( (index + 1) == currentPage ) ? "var(--Accent, #DAFFE7)" : "#ffffff",
                        borderStyle: "none",
                        borderRadius: "8px",
                        width: "40px",
                        textAlign: "center"}}
                        
                        onClick={() => {
                            setCurrentPage(index + 1);
                        }}
                        >
                            {pageNumber}
                        </div>
                    )
                }

                <div className="col-1 m-0">
                    <button 
                    className="small-medium m-2"
                    style={{
                        color: "var(--cards-form-bg, #FFF)",
                        borderStyle: "none",
                        borderRadius: "8px",
                        padding: "8px",
                        backgroundColor: "var(--Primary, #457900)"
                    }}
                    onClick={handleMoveToNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default HomeTasks