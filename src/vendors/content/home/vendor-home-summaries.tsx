import { useNavigate } from "react-router-dom";
import { VendorHomeSummaryItemProps, VendorProfitItemProps } from "./vendor-home-models";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";
import { VENDOR_ROUTES } from "../../vendor-routes";



const VendorHomeSummaryItem: React.FC<VendorHomeSummaryItemProps> = ( data: VendorHomeSummaryItemProps) => {

    return (<>
    <div className="col-12 p-3 vendor-item-container bg-white "
    style={{height: "100%"}}
    onClick={() => data.navigate(data.detailsUrl, {state: data.backUrl})}
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

    return (<>
        <div className="col-12 p-3 vendor-item-container bg-white "
        style={{height: "100%"}}
        onClick={() => profitSummary.navigate(profitSummary.detailsUrl)}
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
    const navigate = useNavigate();


    const profitSummary: VendorProfitItemProps = {
        totalProfit: 200000,
        percentageDifference: 12,
        differenceIndicator: "/assets/images/vendor/home/up_arrow.svg",
        detailsUrl: `${VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_STOCK_SALES_FULL}`,
        navigate: navigate
    };

    const summaryItems: VendorHomeSummaryItemProps[] = [
        {
            itemTitle: "Pending Orders",
            itemCount: 2,
            itemDesc: "You pending orders awaiting",
            backUrl: VENDOR_HOME_ROUTES.FULL.HOME_FULL,
            detailsUrl: VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_ORDERS_FULL,
            navigate: navigate
        },
        {
            itemTitle: "Order Tracking",
            itemCount: 4,
            itemDesc: "You have four orders in transit",
            detailsUrl: `${VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_TRACK_ORDER_FULL}`,
            backUrl: VENDOR_HOME_ROUTES.FULL.HOME_FULL,
            navigate: navigate
        },
        {
            itemTitle: "Quality Score",
            itemCount: 4.8,
            itemDesc: "Your rating is average. Improve to grow business",
            detailsUrl: VENDOR_ROUTES.FULL.VENDOR_QUALITY_SCORE_FULL,
            backUrl: VENDOR_HOME_ROUTES.FULL.HOME_FULL,
            navigate: navigate
        }
    ];

    return (<>
    <div className="row m-0 p-0">
        {summaryItems.map((summaryItem, index) => 
        <div className="col-12 col-md-3 d-md-flex m-0 p-0"  key={index}>
            {(index !== 2) ? <></> : 
            <div
            className={`col-12  m-0 vendor-item-container mt-3 mt-md-0 px-0 px-md-2`} >
            <VendorProfitSummaryItem 
            totalProfit={profitSummary.totalProfit}
            percentageDifference={profitSummary.percentageDifference}
            differenceIndicator={profitSummary.differenceIndicator}
            detailsUrl={profitSummary.detailsUrl}
            navigate={profitSummary.navigate}
            />
            </div>}
            <div 
            className={`col-12 m-0 vendor-item-container mt-3 mt-md-0 px-0 ${(index === 0) ? "ps-0" : ( (index === 2) ? "pe-0" : "ps-md-2")} `} >
                <VendorHomeSummaryItem
                itemTitle={summaryItem.itemTitle} 
                itemCount={summaryItem.itemCount} 
                itemDesc={summaryItem.itemDesc} 
                detailsUrl={summaryItem.detailsUrl}
                navigate={summaryItem.navigate}
                backUrl={summaryItem.backUrl}
                />
            </div>
            
        </div>)
        }
    </div>
    </>);
};

export default VendorHomeSummaries;