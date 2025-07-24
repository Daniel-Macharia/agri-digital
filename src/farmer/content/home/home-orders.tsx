import { useNavigate } from "react-router-dom";
import { HomeOrderItemProps } from "./home-model";


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

    let pendingOrders: HomeOrderItemProps[] = [
        {
            customerName: "AgriFarmers",
            itemName: "Manure",
            itemUnitCount: 15,
            itemUnitName: "Kg",
            orderStatus: "pending",
            itemCost: 12000,
            itemImageUrl: "/assets/images/home/order_image.svg"
        },
        {
            customerName: "Kiambu Wholesalers",
            itemName: "Coffee Seeds",
            itemUnitCount: 150,
            itemUnitName: "Kg",
            orderStatus: "pending",
            itemCost: 8000,
            itemImageUrl: "/assets/images/home/order_image.svg"
        }
    ];

    let completedOrders: HomeOrderItemProps[] = [
        {
            customerName: "Limuru EPZ",
            itemName: "Wool",
            itemUnitCount: 500,
            itemUnitName: "Kg",
            orderStatus: "complete",
            itemCost: 9876,
            itemImageUrl: "/assets/images/home/order_image.svg"
        },
        {
            customerName: "Sheila's Hotel",
            itemName: "Eggs",
            itemUnitCount: 100,
            itemUnitName: "Trays",
            orderStatus: "complete",
            itemCost: 9876,
            itemImageUrl: "/assets/images/home/order_image.svg"
        },
        {
            customerName: "New Farm",
            itemName: "Cattle",
            itemUnitCount: 10,
            itemUnitName: "",
            orderStatus: "complete",
            itemCost: 9876,
            itemImageUrl: "/assets/images/home/order_image.svg"
        },
        {
            customerName: "Cate's Milk Bar",
            itemName: "Milk",
            itemUnitCount: 200,
            itemUnitName: "Ltr",
            orderStatus: "complete",
            itemCost: 12000,
            itemImageUrl: "/assets/images/home/order_image.svg"
        }
    ];

    const handleGoBackHome = () => {
        alert("going back Home");
        navigate("/farmer/home");
    };

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

            <div className="col-12">
                {
                    pendingOrders.map( (order, index: number) => <><HomeOrderItem 
                    customerName={order.customerName}
                    itemName={order.itemName}
                    itemUnitCount={order.itemUnitCount}
                    itemUnitName={order.itemUnitName}
                    itemImageUrl={order.itemImageUrl}
                    itemCost={order.itemCost}
                    orderStatus={order.orderStatus}
                    />

                    {(index < (pendingOrders.length - 1) ) ? <hr/> : ""}
                    </>)
                }
            </div>
        </div>

        <div className="col-12 farmer-home-container bg-white mt-4 p-4">
            <p className="col-12 h3-semibold primary-text">
                Completed Orders
            </p>

            <div className="col-12">
                {
                    completedOrders.map( (order, index: number) => <><HomeOrderItem 
                    customerName={order.customerName}
                    itemName={order.itemName}
                    itemUnitCount={order.itemUnitCount}
                    itemUnitName={order.itemUnitName}
                    itemImageUrl={order.itemImageUrl}
                    itemCost={order.itemCost}
                    orderStatus={order.orderStatus}
                    />
                    {(index < (completedOrders.length - 1) ) ? <hr/> : ""}
                </>
                )
                }
            </div>
        </div>
    </div>
    </>)
};

export default HomeOrders;