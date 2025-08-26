import { useLocation, useNavigate } from "react-router-dom";
import { HomeOrderItemProps } from "./home-model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const HomeOrderItem: React.FC<HomeOrderItemProps> = (data: HomeOrderItemProps) => {
    const handleAcceptOrderAction = () => {
        console.log("accpeted order");
    };

    const handleRejectOrderAction = () => {
        console.log("reject order");
    };

    return (<>
    <div className="col-12">
        <div className="row my-4">
            <div className="col-12 col-md-2">
                <img src={data.itemImageUrl}
                alt="item image"
                className="col-12"
                style={{borderRadius: "20px"}}
                />
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0">
                <p className="col-12 my-0 body-semibold"
                style={{color: " var(--Primary, #457900)"}}>
                    {data.customerName}
                </p>
                <p className="col-12 my-0 body-regular primary-text">
                    {data.itemName}
                </p>
                <p className="col-12 my-0 body-bold primary-text">
                    {`${data.itemUnitCount}${data.itemUnitName}`}
                </p>
                <p className="col-12 my-0 h3-semibold"
                style={{color: " var(--Primary, #457900)"}}>
                    {`KES ${data.itemCost}`}
                </p>
            </div>
            <div className="col-12 col-md-4 mt-2 mt-md-0 align-content-center">
                {
                    (data.orderStatus == "pending" ) ? <>
                    <div className="row">
                        <div className="col-6">
                            <button
                            className="farmer-home-accept-button"
                            onClick={handleAcceptOrderAction}
                            >
                                Accept Order
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                            className="farmer-home-other-button"
                            onClick={handleRejectOrderAction}
                            >
                                Reject Order
                            </button>
                        </div>
                    </div>
                    </> 
                    :
                     <>
                     <div className="col-12 d-flex justify-content-center">
                        <div className="col-2">
                            <img src={ data.orderStatus == "complete" ? "/assets/images/home/accept_order_icon.svg" : "/assets/images/home/accept_order_icon.svg"}
                            alt=""
                            className=""
                            
                            />
                        </div>
                        <div className="col-10">
                            <p className="col-12 h3-semibold" style={{color: " var(--Primary, #457900)"}}>
                                {(data.orderStatus == "complete") ? "complete" : "rejected"}
                            </p>
                        </div>
                     </div>
                     </>
                }
            </div>
        </div>
    </div>
    </>);
};


const HomeOrders: React.FC = () => {

    const navigate = useNavigate();
    const backUrl: string = useLocation().state;

    const pendingOrders: HomeOrderItemProps[] = [];

    const completedOrders: HomeOrderItemProps[] = [];

   useEffect(() => {
        for( let i = 0; i < 22; i++ )
        {
            pendingOrders.push(
            {
                customerName: ( i % 2 === 0) ? "Kiambu Wholesalers" : "New Traders",
                itemName: ( i % 2 === 0 ) ? "Coffee Seeds" : "Milk Powder",
                itemUnitCount: 150,
                itemUnitName: "Kg",
                orderStatus: "pending",
                itemCost: 8000,
                itemImageUrl: "/assets/images/home/order_image.svg"
            }
        );
        }

        for( let i = 0; i < 28; i++ )
        {
            completedOrders.push({
                customerName: (i % 2 == 0) ? `Shop ${i + 1 }` : `Shop ${i + 1 }`,
                itemName: (i % 2 == 0) ? "Milk" : "Butter",
                itemUnitCount: 50,
                itemUnitName: "Ltr",
                orderStatus: "complete",
                itemCost: 11960,
                itemImageUrl: "/assets/images/home/order_image.svg"
            });
        }
   }, []);

    const handleGoBackHome = () => {
        navigate(backUrl);
    };

    /* ------------------------- set effects and states for pending orders pagination ------------------------------- */
    const [pendingOrdersListData, setPendingOrdersListData] = useState<HomeOrderItemProps[]>(pendingOrders);
    const pendingOrdersSortOptions: string[] = ["item", "customer"];
    const [pendingOrdersSortBy, setPendingOrdersSortBy] = useState<string>(pendingOrdersSortOptions[0]);
    const [pendingOrdersCurrentPage, setPendingOrdersCurrentPage] = useState<number>(1);
    const [pendingOrdersCurrentStartIndex, setPendingOrdersCurrentStartIndex] = useState<number>(0);
    
    const pendingOrdersDataSize: number = pendingOrders.length;
    const pendingOrdersPageSize: number = pendingOrdersDataSize >= 2 ? 2 : pendingOrdersDataSize;

    let pendingOrdersNumberOfPages: number = Math.trunc(pendingOrdersDataSize / pendingOrdersPageSize);
    
    if( pendingOrdersNumberOfPages === 0 )
        pendingOrdersNumberOfPages = 1;
    else if( (pendingOrdersNumberOfPages * pendingOrdersPageSize) < pendingOrdersDataSize )
        pendingOrdersNumberOfPages = pendingOrdersNumberOfPages + 1;

    console.log(pendingOrdersNumberOfPages);
    const pendingOrdersPages: number[] = [];

    for( let count = 1; count <= pendingOrdersNumberOfPages; count++ )
    {
        pendingOrdersPages.push(count);
    }

    useEffect(() => {
        setPendingOrdersListData(pendingOrdersListData.sort((order1, order2) => {
            switch(pendingOrdersSortBy){
                case "item":
                    if( order1.itemName.valueOf() < order2.itemName.valueOf() )
                        return -1;
                    else if( order1.itemName.valueOf() === order2.itemName.valueOf() )
                        return 0;
                    else
                        return 1;
                case "customer":
                    if( order1.customerName.valueOf() < order2.customerName.valueOf() )
                        return -1;
                    else if( order1.customerName.valueOf() === order2.customerName.valueOf() )
                        return 0;
                    else
                        return 1;
                default:
                    return 0;
            }
        }
        ));
        setPendingOrdersCurrentPage(pendingOrdersCurrentPage);
    pendingOrdersListData.forEach(item => console.log(item));
    }, [pendingOrdersSortBy]);

    const handleMovePendingOrdersToNext = () => {
        console.log("moving to the next page");
        setPendingOrdersCurrentPage( (pendingOrdersCurrentPage < pendingOrdersNumberOfPages) ? (pendingOrdersCurrentPage + 1) : 1)
    }

    useEffect( () => {
        const startIndex: number = Math.trunc( pendingOrdersCurrentPage * pendingOrdersPageSize) - pendingOrdersPageSize;
        const endIndex: number = Math.trunc(pendingOrdersCurrentPage * pendingOrdersPageSize);

        setPendingOrdersCurrentStartIndex(startIndex);

        setPendingOrdersListData(pendingOrders.slice( startIndex, endIndex));
    }, [pendingOrdersCurrentPage]);

 /* ------------------- END setting effects and states for pending orders --------------------------------- */

 /* -------------------- Set effects and states for completed orders pagination ------------------------------ */

    const [completedOrdersListData, setCompletedOrdersListData] = useState<HomeOrderItemProps[]>(completedOrders);
    const completedOrdersSortOptions: string[] = ["item", "customer"];
    const [completedOrdersSortBy, setCompletedOrdersSortBy] = useState<string>(completedOrdersSortOptions[0]);
    const [completedOrdersCurrentPage, setCompletedOrdersCurrentPage] = useState<number>(1);
    const [completedOrdersCurrentStartIndex, setCompletedOrdersCurrentStartIndex] = useState<number>(0);
    
    const completedOrdersDataSize: number = completedOrders.length;
    const completedOrdersPageSize: number = completedOrdersDataSize >= 4 ? 4 : completedOrdersDataSize;

    let completedOrdersNumberOfPages: number = Math.trunc(completedOrdersDataSize / completedOrdersPageSize);
    
    if( completedOrdersNumberOfPages === 0 )
        completedOrdersNumberOfPages = 1;
    else if( (completedOrdersNumberOfPages * completedOrdersPageSize) < completedOrdersDataSize )
        completedOrdersNumberOfPages = completedOrdersNumberOfPages + 1;

    console.log(completedOrdersNumberOfPages);
    const completedOrdersPages: number[] = [];

    for( let count = 1; count <= completedOrdersNumberOfPages; count++ )
    {
        completedOrdersPages.push(count);
    }

    useEffect(() => {
        completedOrdersListData.sort((order1, order2) => {
            switch(completedOrdersSortBy){
                case "item":
                    if( order1.itemName < order2.itemName )
                        return -1;
                    else if( order1.itemName === order2.itemName )
                        return 0;
                    else
                        return 1;
                case "customer":
                    if( order1.customerName < order2.customerName )
                        return -1;
                    else if( order1.customerName === order2.customerName )
                        return 0;
                    else
                        return 1;
                default:
                    return 0;
            }
        }
        );
        setCompletedOrdersCurrentPage(completedOrdersCurrentPage);
    //completedOrdersListData.forEach(item => console.log(item));
    }, [completedOrdersSortBy]);

    const handleMoveCompletedOrdersToNext = () => {
        console.log("moving to the next page");
        setCompletedOrdersCurrentPage( (completedOrdersCurrentPage < completedOrdersNumberOfPages) ? (completedOrdersCurrentPage + 1) : 1)
    }

    useEffect( () => {
        const startIndex: number = Math.trunc( completedOrdersCurrentPage * completedOrdersPageSize) - completedOrdersPageSize;
        const endIndex: number = Math.trunc(completedOrdersCurrentPage * completedOrdersPageSize);

        setCompletedOrdersCurrentStartIndex(startIndex);

        setCompletedOrdersListData(completedOrders.slice( startIndex, endIndex));
    }, [completedOrdersCurrentPage]);

 /* --------------------- END setting effects and states for completed orders pagination --------------------------- */

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
            <p className="col-12 h3-semibold primary-text">
                Pending Orders
            </p>

            <div className="row m-0 p-2 justify-content-end align-items-center">
                <p className="m-0 p-0 body-regular"
                style={{width: "max-content"}}>
                    {`Showing ${pendingOrdersCurrentStartIndex + 1} to ${(pendingOrdersCurrentStartIndex + pendingOrdersListData.length)} of ${pendingOrdersDataSize} Tasks`}
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
                            toast.info(`Selected: ${value}`);
                            setPendingOrdersSortBy(value);
                        }}
                        
                        style={{
                            width: "max-content",
                            borderStyle: "none",
                            borderRadius: "4px", 
                        }}
                        >
                            {
                                pendingOrdersSortOptions.map( (sortOption, index) => <option 
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
                    pendingOrdersListData.map( (order, index: number) => <><HomeOrderItem 
                    customerName={order.customerName}
                    itemName={order.itemName}
                    itemUnitCount={order.itemUnitCount}
                    itemUnitName={order.itemUnitName}
                    itemImageUrl={order.itemImageUrl}
                    itemCost={order.itemCost}
                    orderStatus={order.orderStatus}
                    />

                    {(index < (pendingOrdersListData.length - 1) ) ? <hr/> : ""}
                    </>)
                }
            </div>

            <div className="row m-0 p-0 justify-content-center">
                {
                    pendingOrdersPages.map( (pageNumber, index) => 
                        <div className=" body-medium p-2 m-2 text-align-center"
                        style={{color: " var(--Primary, #457900)", 
                        backgroundColor: ( (index + 1) == pendingOrdersCurrentPage ) ? "var(--Accent, #DAFFE7)" : "#ffffff",
                        borderStyle: "none",
                        borderRadius: "8px",
                        width: "40px",
                        textAlign: "center"}}
                        
                        onClick={() => {
                            setPendingOrdersCurrentPage(index + 1);
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
                    onClick={handleMovePendingOrdersToNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

        <div className="col-12 farmer-home-container bg-white mt-4 p-4">
            <p className="col-12 h3-semibold primary-text">
                Completed Orders
            </p>

            <div className="row m-0 p-2 justify-content-end align-items-center">
                <p className="m-0 p-0 body-regular"
                style={{width: "max-content"}}>
                    {`Showing ${completedOrdersCurrentStartIndex + 1} to ${(completedOrdersCurrentStartIndex + completedOrdersListData.length)} of ${completedOrdersDataSize} Tasks`}
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
                            toast.info(`Selected: ${value}`);
                            setCompletedOrdersSortBy(value);
                        }}
                        
                        style={{
                            width: "max-content",
                            borderStyle: "none",
                            borderRadius: "4px", 
                        }}
                        >
                            {
                                completedOrdersSortOptions.map( (sortOption, index) => <option 
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
                    completedOrdersListData.map( (order, index: number) => <><HomeOrderItem 
                    customerName={order.customerName}
                    itemName={order.itemName}
                    itemUnitCount={order.itemUnitCount}
                    itemUnitName={order.itemUnitName}
                    itemImageUrl={order.itemImageUrl}
                    itemCost={order.itemCost}
                    orderStatus={order.orderStatus}
                    />
                    {(index < (completedOrdersListData.length - 1) ) ? <hr/> : ""}
                </>
                )
                }
            </div>

            

            <div className="row m-0 p-0 justify-content-center">
                {
                    completedOrdersPages.map( (pageNumber, index) => 
                        <div className=" body-medium p-2 m-2 text-align-center"
                        style={{color: " var(--Primary, #457900)", 
                        backgroundColor: ( (index + 1) == pendingOrdersCurrentPage ) ? "var(--Accent, #DAFFE7)" : "#ffffff",
                        borderStyle: "none",
                        borderRadius: "8px",
                        width: "40px",
                        textAlign: "center"}}
                        
                        onClick={() => {
                            setCompletedOrdersCurrentPage(index + 1);
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
                    onClick={handleMoveCompletedOrdersToNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>)
};

export default HomeOrders;