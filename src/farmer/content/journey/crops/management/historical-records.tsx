import DataTable from "react-data-table-component";



interface HistoricalRecordProps{
    date: string,
    ph: number,
    moisture: string,
    npk: string,
    height: number,
    stage: string
};

const HistoricalRecords: React.FC = () => {

    const columns = [
        {
            name: "Date",
            selector: (row: { date: string; }) => row.date,
            sortable: true
        },
        {
            name: "pH",
            selector: (row: { ph: number; }) => row.ph,
            sortable: true
        },
        {
            name: "Moisture",
            selector: (row: { moisture: string; }) => row.moisture,
            sortable: true
        },
        {
            name: "N-P-K Status",
            selector: (row: { npk: string; }) => row.npk,
            sortable: true
        },
        {
            name: "Height",
            selector: (row: { height: number; }) => row.height,
            sortable: true
        },
        {
            name: "Stage",
            selector: (row: { stage: string; }) => row.stage,
            sortable: true
        }
    ];

    const data: HistoricalRecordProps[] = [
        {date: new Date().toDateString(), ph: 7, moisture: "45%", npk: "N: High, P: Medium, K: Low", height: 75, stage: "Early Vegetative"},
        {date: new Date().toDateString(), ph: 7, moisture: "45%", npk: "N: Medium, P: Medium, K: Medium", height: 55, stage: "Seeding"},
        {date: new Date().toDateString(), ph: 7, moisture: "45%", npk: "N: Low, P: Medium, K: Medium", height: 45, stage: "Germination"}
    ];

    return (<>
    <div className="col-12 m-0 bg-white mb-3">
        <DataTable
        className="col-12 mx-0"
        title={"Historical Records"}
        columns={columns}
        data={data}
        pagination
        
        
        />
    </div>
    </>);
};

export default HistoricalRecords;