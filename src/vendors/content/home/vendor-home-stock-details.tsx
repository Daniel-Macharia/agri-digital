import { useNavigate } from "react-router-dom";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";
import { VendorStockItemProps } from "./vendor-home-models";
import { VendorStockBarGraph } from "./vendor-home-stock-overview";
import { ProductQuality } from "./vendor-home-enums";
import { useEffect, useState } from "react";

export function VendorDetailedStockItem(data: VendorStockItemProps){


    return (<>
    <div className="p-0 m-0 d-flex"
    style={{
        width: "max-content"
    }}>
        <p className="col-2 p-0 me-1 my-0 body-semibold primary-text text-start"
        style={{ minWidth: "120px"}}>
            {data.itemName}
        </p>

        <p className="col-2 p-0 me-1 my-0 small-regular secondary-text text-start"
        style={{ minWidth: "120px"}}>
            {data.itemQuantity}
        </p>

        <p className="col-2 p-0 me-1 my-0 small-regular secondary-text text-start"
        style={{ minWidth: "120px"}}>
            {`KES ${data.itemSellingPrice}`}
        </p>

        <p className="col-2 p-0 me-1 my-0 small-regular secondary-text text-start"
        style={{ minWidth: "120px"}}>
            {`KES ${data.itemBuyingPrice}`}
        </p>

        <p className="col-2 p-0 me-1 my-0 small-regular secondary-text text-start"
        style={{ minWidth: "120px"}}>
            {data.itemExpiryDate.toLocaleDateString()}
        </p>

        <p className="col-2 p-0 me-1 my-0 small-regular secondary-text text-start"
        style={{ minWidth: "120px"}}>
            {`${data.manufacturingDate.toLocaleDateString()}`}
        </p>

        <p className="col-2 p-0 me-1 my-0 small-regular secondary-text text-start"
        style={{ minWidth: "120px"}}>
            {data.quality}
        </p>
    </div>
    </>);
};

const VendorHomeStockSalesAndLevelDetails: React.FC = () => {
    const navigate = useNavigate();

    const columnLabels: string[] = [
        "Product Name", "Quantity", "Selling Price", "Buying Price", "Expiry Date", "Manufacturing Date", "Quality"
    ];

    const stockItems: VendorStockItemProps[] = [];

    const handleGoBackHome = () => {
        navigate(VENDOR_HOME_ROUTES.FULL.HOME_FULL);
    };


    /* ----------- handle pagination logic --------------------- */

    const [listData, setListData] = useState<VendorStockItemProps[]>(stockItems);
    const sortOptions: string[] = ["Product 1", "Product 2", "Product 3"];
    const [sortBy, setSortBy] = useState<string>(sortOptions[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);

    for( let i = 0; i < 45; i++ )
    {
        stockItems.push(
            {
            itemName: `Stock Item ${i + 1}`,
            itemQuantity: 223,
            itemBuyingPrice: 300,
            itemSellingPrice: 400,
            itemExpiryDate: new Date(),
            manufacturingDate: new Date(),
            quality: ProductQuality.GRADE_1
            }
        )
    }

    let dataSize: number = stockItems.length;
    let pageSize: number = dataSize >= 10 ? 10 : dataSize;

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
        dataSize = listData.length;
        //setCurrentStartIndex(0);
        pageSize = dataSize >= 10 ? 10 : dataSize;
    }, [listData]);

    useEffect(() => {
    //toast("sort altered");
    setListData(listData.sort(() => {
        switch(sortBy)
        {
            case "Product 1"://fill list with items of type product 1
                    return 1;
            case "Product 2"://fill list with items of type product 2
                    return 1;
            default:
                return 0;
        }
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

        setListData(stockItems.slice( startIndex, endIndex));
    }, [currentPage]);

    return (<>
    <div className="col-12 mx-4">

        <div className="col-6 d-flex justify-content-start mb-4">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="col-12 vendor-item-container bg-white p-3">
        
            <div className="col-12">
                <p className="col-12 m-0 p-2 h3-semibold primary-text">
                    Stock Sales
                </p>
                <VendorStockBarGraph />
            </div>

            <div className="col-12">
                <p className="col-12 m-0 p-0 h3-semibold primary-text">
                    Stock Level
                </p>



                <div className="col-12 m-0 p-0 overflow-auto">
                    <div className="row m-0 p-2 justify-content-end align-items-center">
                        <p className="m-0 p-0 body-regular"
                        style={{width: "max-content"}}>
                            {`Showing ${currentStartIndex + 1} to ${ currentStartIndex + listData.length} of ${dataSize} Users`}
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
                                className="m-0 p-0 body-bold"
                                onChange={(event) => {
                                    const value = event.target?.value;
                                    //toast.info(`Selected: ${value}`);
                                    setSortBy(value);
                                }}
                                
                                style={{
                                    width: "max-content",
                                    backgroundColor: "#FFFFFF",
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
                                            backgroundColor: "#FFFFFF",
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

                    <div className="d-flex m-0"
                    style={{width: "max-content"}}>
                        { 
                            columnLabels.map((label, index) => <p 
                            key={index}
                            className="col-2 p-0 me-1 text-start"
                            style={{ minWidth: "120px"}}>
                                {label}
                            </p>)
                        }
                    </div>
                    <hr className="mt-0"/>

                    <div className="col-12">
                        {
                            listData.map((item, index) => <div 
                            key={index}
                            className="mt-2 p-2"
                            style={{
                                backgroundColor: `${(index % 2 == 0) ? "var(--Background, #F5F5F5)" : "rgba(245, 245, 245, 0.50)"}`,
                                borderRadius: "6px",
                            }} >
                                <VendorDetailedStockItem 
                                itemName={item.itemName} 
                                itemQuantity={item.itemQuantity} 
                                itemBuyingPrice={item.itemBuyingPrice} 
                                itemSellingPrice={item.itemSellingPrice} 
                                itemExpiryDate={item.itemExpiryDate} 
                                manufacturingDate={item.itemExpiryDate} 
                                quality={item.quality} 
                                />
                            </div>)
                        }
                    </div>

                    <div className="row m-0 p-0 justify-content-center">
                        {
                            pages.map( (pageNumber, index) => 
                                <div key={index} className=" body-medium p-2 m-2 text-align-center"
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
        </div>
    </div>
    </>);
};

export default VendorHomeStockSalesAndLevelDetails;