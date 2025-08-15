import React, { useEffect, useState } from "react";
import { VendorStockItemProps } from "./vendor-home-models";
import OverviewHeader from "../../../farmer/content/home/overview/overview-header";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KeyValuePair } from "../../../farmer/content/journey/crops/crops-models";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";
import { ProductQuality } from "./vendor-home-enums";


export function VendorStockBarGraph(){

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

    const minValue = 0;
    const maxValue = 60;

    const yScale = [0,10,20,30,40,50,60];

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
                        value: ( 1 + (Math.random() * maxValue))
                    })
                )
                break;
            case SelectedPeriod.MONTHLY:
                months.map((month) => 
                newData.push(
                    {
                        period: month.slice(0,3),
                        value: ( 1 + (Math.random() * maxValue))
                    })
                );
                break;
            case SelectedPeriod.YEARLY:
                years.map((year) => 
                newData.push(
                    {
                        period: year,
                        value: ( 1 + (Math.random() * maxValue))
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
                        className={`m-0 mx-1 p-0 ${ (period == SelectedPeriod.WEEKLY) ? "vendor-selected-tab-button" : "vendor-tab-button"}`}
                        onClick={() => {
                            console.log("clicked weekly");
                            setPeriod(SelectedPeriod.WEEKLY);
                        }}
                        >
                            Weekly
                        </button>
                        <button
                        className={`m-0 mx-1 p-0 ${ (period == SelectedPeriod.MONTHLY) ? "vendor-selected-tab-button" : "vendor-tab-button"}`}
                        onClick={() => {
                            console.log("clicked Monthly");
                            setPeriod(SelectedPeriod.MONTHLY);
                        }}
                        >
                            Monthly
                        </button>
                        <button
                        className={`m-0 mx-1 p-0 ${ (period == SelectedPeriod.YEARLY) ? "vendor-selected-tab-button" : "vendor-tab-button"}`}
                        onClick={() => {
                            console.log("clicked Yearly");
                            setPeriod(SelectedPeriod.YEARLY);
                        }}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
                <div className="col-6 d-flex col-md-2 align-items-center">
                    <p className="col-5 caption-medium secondary-text text-end m-0 p-0">
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
                            (stockItems).map((item, index) =>
                            <option 
                            key={index}
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

            <div className="col-12 m-0 p-0 m-2">
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
                    <YAxis domain={[ minValue, maxValue]}  ticks={yScale}/>

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

export function VendorStockItem(data: VendorStockItemProps){


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

const VendorHomeStockSalesAndLevelOverview: React.FC = () => {

    const columnLabels: string[] = [
        "Product Name", "Quantity", "Selling Price", "Buying Price", "Expiry Date"
    ];

    const stockItems: VendorStockItemProps[] = [
        {
            itemName: "Needles",
            itemQuantity: 230,
            itemBuyingPrice: 5,
            itemSellingPrice: 20,
            itemExpiryDate: new Date(),
            manufacturingDate: new Date(),
            quality: ProductQuality.GRADE_1
        },
        {
            itemName: "Pesticides",
            itemQuantity: 230,
            itemBuyingPrice: 500,
            itemSellingPrice: 750,
            itemExpiryDate: new Date(),
            manufacturingDate: new Date(),
            quality: ProductQuality.GRADE_1
        },
        {
            itemName: "Horse pipes",
            itemQuantity: 250,
            itemBuyingPrice: 50,
            itemSellingPrice: 80,
            itemExpiryDate: new Date(),
            manufacturingDate: new Date(),
            quality: ProductQuality.GRADE_1
        },
        {
            itemName: "Hay",
            itemQuantity: 2500,
            itemBuyingPrice: 60,
            itemSellingPrice: 90,
            itemExpiryDate: new Date(),
            manufacturingDate: new Date(),
            quality: ProductQuality.GRADE_1
        },
        {
            itemName: "Jembe",
            itemQuantity: 223,
            itemBuyingPrice: 300,
            itemSellingPrice: 400,
            itemExpiryDate: new Date(),
            manufacturingDate: new Date(),
            quality: ProductQuality.GRADE_1
        }
    ];

    return (<>
    <div className="col-12">
         <OverviewHeader
         overviewTitle="Stock Sales & Level"
         viewMoreUrl={VENDOR_HOME_ROUTES.FULL.VENDOR_HOME_STOCK_SALES_FULL}
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
                        columnLabels.map((label, index) => <p 
                        key={index}
                        className="col-2 p-0 m-0"
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
                        key={index}
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
                            manufacturingDate={item.manufacturingDate} 
                            quality={item.quality} 
                            />
                        </div>)
                    }
                </div>

            </div>
        </div>
    </div>
    </>);
};

export default VendorHomeStockSalesAndLevelOverview;