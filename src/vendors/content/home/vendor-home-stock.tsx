import React, { useEffect, useState } from "react";
import { VendorStockItemProps } from "./vendor-home-models";
import OverviewHeader from "../../../farmer/content/home/overview/overview-header";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KeyValuePair } from "../../../farmer/content/journey/crops/crops-models";


const VendorStockBarGraph: React.FC = () => {

    enum SelectedPeriod{
        MONTHLY = 1,
        WEEKLY = 2,
        YEARLY = 3
    };

    const [period, setPeriod] = useState<SelectedPeriod>(SelectedPeriod.MONTHLY);

    const [data, setData] = useState<KeyValuePair[]>([]);

    const months: string[] = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek: string[] = ["Monday", "Tuesday", "Wednesday","Thursday", "Friday",
        "Saturday", "Sunday"
    ];

    const years: string[] = ["2023", "2024", "2025"];

    const stockItems: string[] = ["Needles", "Pesticides", "Horse pipes", "Hay", "Jembe"];
    
    const [stockItem, setStockItem] = useState<string>(stockItems[0]);
    useEffect( () => {

        if(stockItem === "")
            return;
        
        const newData: KeyValuePair[] = [];
        switch( period )
        {
            case SelectedPeriod.WEEKLY:
                daysOfWeek.map((day) => 
                newData.push(
                    {
                        period: day.slice(0,3),
                        value: (Math.random() + 1)
                    })
                )
                break;
            case SelectedPeriod.MONTHLY:
                months.map((month) => 
                newData.push(
                    {
                        period: month.slice(0,3),
                        value: (Math.random() + 1)
                    })
                );
                break;
            case SelectedPeriod.YEARLY:
                years.map((year) => 
                newData.push(
                    {
                        period: year,
                        value: (Math.random() + 1)
                    })
                )
                break;
        }

        setData(newData);
    }, [period, stockItem]);

    return (<>
    <div className="col-12">
            <div className="col-12 d-flex m-0 p-0"
            style={{
                justifyContent: "space-between"
            }}>
                <div className="col-6">
                    <div className="d-flex m-0 p-0">
                        <button
                        className="m-0 mx-1 p-0 vendor-tab-button vendor-selected-tab-button"
                        onClick={() => {
                            console.log("clicked weekly");
                            setPeriod(SelectedPeriod.WEEKLY);
                        }}
                        >
                            Weekly
                        </button>
                        <button
                        className={`m-0 mx-1 p-0 vendor-tab-button ${ (period == SelectedPeriod.MONTHLY) ? "vendor-bargraph-tab" : ""}`}
                        onClick={() => {
                            console.log("clicked Monthly");
                            setPeriod(SelectedPeriod.MONTHLY);
                        }}
                        >
                            Monthly
                        </button>
                        <button
                        className="m-0 mx-1 p-0 vendor-tab-button "
                        onClick={() => {
                            console.log("clicked Yearly");
                            setPeriod(SelectedPeriod.YEARLY);
                        }}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
                <div className="col-5 d-flex col-md-2 align-items-center">
                    <p className="col-5 caption-medium secondary-text m-0 p-0">
                        Sort by:
                    </p>
                    <select
                    className="caption-medium col-7 m-0 p-0"
                    onChange={(event) => {
                        const val = event.target?.value;

                        console.log(`Clicked ${val}`);
                        setStockItem(val);
                    }}
                    style={{
                        color: "var(--Primary, #457900)",
                        borderStyle: "none"
                    }}
                    >
                        {
                            (stockItems).map((item) =>
                            <option 
                            className="caption-medium col-12 m-0 p-0" 
                            value={item}
                            style={{
                                color: "var(--Primary, #457900)"
                            }}>
                                {item}
                            </option>)
                        }
                    </select>
                </div>
            </div>

            <div className="col-12 m-0 p-0 my-2">
                <p className="m-0 p-0 caption-medium secondary-text">
                    Sales
                </p>
            </div>
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
                    
                    onClick={(data:unknown) => {
                        console.log(`Value: ${(data as KeyValuePair).period}`);
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
    </>);
};

const VendorStockItem: React.FC<VendorStockItemProps> = (data: VendorStockItemProps) => {


    return (<>
    <div className="col-12 d-flex">
        <p className="col-2 p-0 m-0 body-semibold primary-text"
        style={{ minWidth: "120px"}}>
            {data.itemName}
        </p>

        <p className="col-2 p-0 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {data.itemQuantity}
        </p>

        <p className="col-2 p-0 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {`KES ${data.itemSellingPrice}`}
        </p>

        <p className="col-2 p-0 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {`KES ${data.itemBuyingPrice}`}
        </p>

        <p className="col-2 p-0 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {data.itemExpiryDate.toLocaleDateString()}
        </p>
    </div>
    </>);
};

const VendorHomeStockSalesAndLevel: React.FC = () => {

    const columnLabels: string[] = [
        "Product Name", "Quantity", "Selling Price", "Buying Price", "Expiry Date"
    ];

    const stockItems: VendorStockItemProps[] = [
        {
            itemName: "Needles",
            itemQuantity: 230,
            itemBuyingPrice: 5,
            itemSellingPrice: 20,
            itemExpiryDate: new Date()
        },
        {
            itemName: "Pesticides",
            itemQuantity: 230,
            itemBuyingPrice: 500,
            itemSellingPrice: 750,
            itemExpiryDate: new Date()
        },
        {
            itemName: "Horse pipes",
            itemQuantity: 250,
            itemBuyingPrice: 50,
            itemSellingPrice: 80,
            itemExpiryDate: new Date()
        },
        {
            itemName: "Hay",
            itemQuantity: 2500,
            itemBuyingPrice: 60,
            itemSellingPrice: 90,
            itemExpiryDate: new Date()
        },
        {
            itemName: "Jembe",
            itemQuantity: 223,
            itemBuyingPrice: 300,
            itemSellingPrice: 400,
            itemExpiryDate: new Date()
        }
    ];

    return (<>
    <div className="col-12">
         <OverviewHeader
         overviewTitle="Stock Sales & Level"
         viewMoreUrl="#"
         />

        <VendorStockBarGraph />

        <div className="col-12">
            <p className="col-12 m-0 p-0 h3-semibold primary-text">
                Stock Level
            </p>

            <div className="col-12 m-0 p-0 overflow-auto">
                <div className="d-flex m-0"
                style={{width: "max-content"}}>
                    { 
                        columnLabels.map((label) => <p className="col-2 p-0 m-0"
                        style={{ minWidth: "120px"}}>
                            {label}
                        </p>)
                    }
                </div>
                <hr className="mt-0"/>

                <div className="col col-md-12"
                style={{minWidth: "max-content"}}>
                    {
                        stockItems.map((item, index) => <div 
                        className="mt-2 p-2"
                        style={{
                            backgroundColor: `${(index % 2 == 0) ? "var(--Background, #F5F5F5)" : "rgba(245, 245, 245, 0.50)"}`,
                            borderStyle: "none",
                            borderRadius: "6px",
                            width: "100%"
                        }} >
                            <VendorStockItem 
                            itemName={item.itemName} 
                            itemQuantity={item.itemQuantity} 
                            itemBuyingPrice={item.itemBuyingPrice} 
                            itemSellingPrice={item.itemSellingPrice} 
                            itemExpiryDate={item.itemExpiryDate} 
                            />
                        </div>)
                    }
                </div>

            </div>
        </div>
    </div>
    </>);
};

export default VendorHomeStockSalesAndLevel;