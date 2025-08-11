import DataTable from "react-data-table-component";
import { HomeTaskItemProps } from "../home-model";

const columns = [
    {
        name: "Title",
        selector: (row: {title: string}) => row.title,
        sortable: true
    },
    {
        name: "Stage",
        selector: (row: { stage: string; }) => row.stage,
        sortable: true
    },
    {
        name: "Notes",
        selector: (row: {notes: string}) => row.notes,
        sortable: true
    },
];

const HomeTasksOverview: React.FC = () => {

    const tasks: HomeTaskItemProps[] = [
        {
            title: "Soil testing", 
            stage: "Soil testing", 
            notes: "Check for pH and nutrients."
        },
        {
            title: "Ploughing", 
            stage: "Harvest", 
            notes: "Use tractor for efficiency."
        },
        {
            title: "Seed planting", 
            stage: "Planting", 
            notes: "Ensure correct spacing."
        },  
        {
            title: "Fertilizer application", 
            stage: "Management", 
            notes: "Use organic fertilizers."
        },
        {
            title: "Selling Maize", 
            stage: "Sales", 
            notes: "Connect with buyers early."
        }
    ];

    return (<>
    <div className="col-12">
        <p className="h3-semibold primary-text">
            Today's Tasks
        </p>

        <div className="col-12">
            <DataTable
            columns={columns}
            data={tasks}
            selectableRows
            />

        </div>
        
    </div>
    </>);
};

export default HomeTasksOverview;