import { ManagementSummaryProps } from "../crops-models";
import "./management-summary.css";


export default function ManagementSummary( summary: ManagementSummaryProps ){
    const render = ()=>{
        return (<>
        <div className="col-sm-12 card" >
            <div className="row " 
            style={{
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center"
                }}
                >
                <p className="summary-col-item col-sm-8 small-semibold"
                >
                    {summary.title}
                </p>

                <img src="/assets/images/edit.svg" 
                id="edit-icon" 
                className="" alt="edit"
                style={{justifySelf: "flex-start", alignSelf: "start"}}/>
            </div>

            {
                summary.items.map( item => (
                    <div className="row summary-row">
                <p className="summary-col-item col-sm-6 small-regular">
                    {item.label}
                </p>
                <p className="summary-col-item summary-col-item-value col-sm-6 small-semibold">
                    {item.value}
                </p>
            </div>
                ))
            }

        </div>
        </>);
    };

    return render();
};