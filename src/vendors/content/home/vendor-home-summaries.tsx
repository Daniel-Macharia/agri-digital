import { VendorHomeSummaryItemProps, VendorProfitItemProps } from "./vendor-home-models";



const VendorHomeSummaryItem: React.FC<VendorHomeSummaryItemProps> = ( data: VendorHomeSummaryItemProps) => {

    return (<>
    <div className="col-12 p-3 vendor-item-container bg-white "
    style={{height: "100%"}}
    >

        <h1 className="body-semibold secondary-text my-0">
            {data.itemTitle}
        </h1>
        <p className="h2-bold primary-text my-2">
            {data.itemCount}
        </p>
        <p className="body-small secondary-text my-0">
            {data.itemDesc}
        </p>

    </div>
    </>);
};

const VendorProfitSummaryItem: React.FC<VendorProfitItemProps> = (profitSummary: VendorProfitItemProps) =>
{
    const profitFilterOptions: string[] = ["March"];

    const handleShowProfitsDetail = () => {
        console.log("profits..");
    };

    return (<>
        <div className="col-12 p-3 vendor-item-container bg-white "
        style={{height: "100%"}}
        onClick={handleShowProfitsDetail}
        >
            <div className="row m-0 p-0" >
                <h1 className="col-8 body-semibold secondary-text m-0 p-0">
                    Total profit
                </h1>
                <select
                className="col-4 p-0"
                onChange={(event) =>{
                    const val = event.target?.value;
                    console.log(`Selected: ${val}`);
                }}
                style={{
                    color: "var(--Primary, #457900)",
                    borderStyle: "none"
                }}>
                    {
                        profitFilterOptions.map((option, index) => <option key={index} value={option} 
                        className="col-12 m-0 p-1"
                        >
                            {option}
                        </option>)
                    }
                </select>
            </div>
            <p className="h2-bold primary-text my-2">
                {`KES ${profitSummary.totalProfit}`}
            </p>
            <div className="col-12 d-flex m-0 p-0 align-items-center">
                <img
                src={profitSummary.differenceIndicator}
                alt="up"
                className="m-0 p-0"
                style={{
                    width: "16px",
                    height: "16px"
                }}/>
                <p className="body-small secondary-text my-0">
                <span className="m-0 p-0"
                style={{color: "var(--Primary, #457900)"}}>
                    {`${profitSummary.percentageDifference}% `}
                </span>
                    vs last month
                </p>
            </div>

        </div>
    </>);
};

const VendorHomeSummaries: React.FC = () => {
    const profitSummary: VendorProfitItemProps = {
        totalProfit: 200000,
        percentageDifference: 12,
        differenceIndicator: "/assets/images/vendor/home/up_arrow.svg",
        detailsUrl: "#"
    };

    const summaryItems: VendorHomeSummaryItemProps[] = [
        {
            itemTitle: "Pending Orders",
            itemCount: 2,
            itemDesc: "You pending orders awaiting",
            detailsUrl: "#"
        },
        {
            itemTitle: "Order Tracking",
            itemCount: 4,
            itemDesc: "You have four orders in transit",
            detailsUrl: "#"
        },
        {
            itemTitle: "Quality Score",
            itemCount: 4.8,
            itemDesc: "Your rating is average. Improve to grow business",
            detailsUrl: "#"
        }
    ];

    return (<>
    <div className="row m-0 p-0">
        {summaryItems.map((summaryItem, index) => 
        <>
            {(index !== 2) ? <></> : 
            <div key={index} 
            className={`col-12 col-md-3 m-0 vendor-item-container mt-3 mt-md-0 px-0 px-md-2`} >
            <VendorProfitSummaryItem 
            totalProfit={profitSummary.totalProfit}
            percentageDifference={profitSummary.percentageDifference}
            differenceIndicator={profitSummary.differenceIndicator}
            detailsUrl={profitSummary.detailsUrl}
            />
            </div>}
            <div key={index} 
            className={`col-12 col-md-3 m-0 vendor-item-container mt-3 mt-md-0 px-0 ${(index === 0) ? "ps-0" : ( (index === 2) ? "pe-0" : "ps-md-2")} `} >
                <VendorHomeSummaryItem 
                itemTitle={summaryItem.itemTitle} 
                itemCount={summaryItem.itemCount} 
                itemDesc={summaryItem.itemDesc} 
                detailsUrl={summaryItem.detailsUrl} />
            </div>
            
        </>)
        }
    </div>
    </>);
};

export default VendorHomeSummaries;