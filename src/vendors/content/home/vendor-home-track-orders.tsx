import { useNavigate } from "react-router-dom";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";
import { VendorKeyValuePair, VendorOrderItemProps, VendorOrderStatusViewProps } from "./vendor-home-models";
import { VendorOrderStatus } from "./vendor-home-enums";
import React, { useState } from "react";


const VendorOrderItem: React.FC<VendorOrderItemProps> = (data: VendorOrderItemProps) => {

    return (<>
        <div className="col-12 card m-0 p-2 my-2">
            <div className="col-12 d-flex" >
                <div className="col-7 m-0">
                    <p className="m-0 body-semibold primary-text">
                        {data.buyerName}
                    </p>
                    <p className=" m-0 my-1 small-regular "
                    style={{color: " var(--Remember-me-Links, #2966FF)"}}>
                        {data.productName}
                    </p>
                    <p className=" m-0 body-regular secondary-text ">
                        {data.location}
                    </p>
                </div>

                <div className="col-5 m-0 p-0 align-content-center">
                    <label className="border-solid rounded-pill small-medium text-center col-12 p-2 m-0"
                    style={{
                        color: "var(--cards-form-bg, #FFF)",
                        backgroundColor: `${(data.orderStatus === VendorOrderStatus.CONFIRMED) ? "var(--Remember-me-Links, #2966FF)" : (data.orderStatus === VendorOrderStatus.IN_TRANSIT) ? "var(--yellow, #F8C813)" : (data.orderStatus === VendorOrderStatus.DELIVERED) ? "var(--Primary, #457900)" : "var(--red, #F25C5E)"}`
                    }}>
                        {data.orderStatus}
                    </label>
                </div>
            </div>
        </div>
    </>);
};

const VendorOrderStatusView: React.FC<VendorOrderStatusViewProps> = ( data: VendorOrderStatusViewProps) => {

    return (<>
    <div className="col-12 mb-4 pb-4">
        <div className="col-12 d-flex align-items-center justify-content-center">
            <img
            src={"/assets/images/vendor/track-order/check_circle.svg"}
            className="m-0 p-0"
            style={{
                width: "24px",
            }}
            />
        </div>

        <p className="text-center body-medium primary-text my-0">
            {`${data.orderStatus}`}
        </p>
        <p className="text-center small-regular secondary-text my-0">
            {`${data.dateChanged.toDateString()}`}
        </p>
    </div>
    </>);
};


const VendorOrderDetail: React.FC<VendorKeyValuePair> = (data: VendorKeyValuePair) => {

    return (<>
    <div className="col-12 my-2">
        <p className="col-12 body-regular secondary-text my-0">
            {data.entryLabel}
        </p>

        <p className="col-12 body-regular primary-text my-0">
            {data.entryValue}
        </p>
    </div>
    </>);
};

const VendorTrackOrder: React.FC = () => {
    const navigate = useNavigate();

    const [selectedOrderItemIndex, setSelectedOrderItemIndex] = useState<number>(0);

    type VendorOrderItemDetails = VendorKeyValuePair[];

    const activeOrderItems: VendorOrderItemProps[] = [
        {
            buyerName: "Joe Farmer",
            productName: "Fertilizer",
            location: "Nakuru",
            orderStatus: VendorOrderStatus.DELIVERED
        },
        {
            buyerName: "Kiptoo",
            productName: "Molases",
            location: "Kakamega",
            orderStatus: VendorOrderStatus.IN_TRANSIT
        },
        {
            buyerName: "Sarah Simiyu",
            productName: "Milk",
            location: "Mumias",
            orderStatus: VendorOrderStatus.CONFIRMED
        },
        
        {
            buyerName: "Kim John",
            productName: "Bacon",
            location: "Kisii",
            orderStatus: VendorOrderStatus.PROCESSING
        },
    ];

    const orderItemDetails: VendorOrderItemDetails[] = [
        [
            {entryLabel: "Product", entryValue: "Fertilizer"},
            {entryLabel: "Quantity", entryValue: "4"},
            {entryLabel: "", entryValue: "Kg"},
            {entryLabel: "Seller", entryValue: "AgriFarmer Limited"},
            {entryLabel: "Delivery", entryValue: "KAA 111A"},
            {entryLabel: "Order Date", entryValue: new Date().toDateString()},
            {entryLabel: "Total Fee", entryValue: "10,000"}
        ],
        [
            {entryLabel: "Product", entryValue: "Molases"},
            {entryLabel: "Quantity", entryValue: "80"},
            {entryLabel: "Unit Name", entryValue: "Kg"},
            {entryLabel: "Seller", entryValue: "Farmers Association"},
            {entryLabel: "Delivery", entryValue: "KWS 123A"},
            {entryLabel: "Order Date", entryValue: new Date().toDateString()},
            {entryLabel: "Total Fee", entryValue: "30,000"}
        ],
        [
            {entryLabel: "Product", entryValue: "Milk"},
            {entryLabel: "Quantity", entryValue: "400"},
            {entryLabel: "Unit Name", entryValue: "Ltr"},
            {entryLabel: "Seller", entryValue: "Umoja Sacco"},
            {entryLabel: "Delivery", entryValue: "KMT 254K"},
            {entryLabel: "Order Date", entryValue: new Date().toDateString()},
            {entryLabel: "Total Fee", entryValue: "50,000"}
        ],
        [
            {entryLabel: "Product", entryValue: "Bacon"},
            {entryLabel: "Quantity", entryValue: "490"},
            {entryLabel: "Unit Name", entryValue: "Kg"},
            {entryLabel: "Seller", entryValue: "Kisii Pig Farmers Ltd"},
            {entryLabel: "Delivery", entryValue: "KBQ 224K"},
            {entryLabel: "Order Date", entryValue: new Date().toDateString()},
            {entryLabel: "Total Fee", entryValue: "500,000"}
        ]
    ];

    const handleGoBackHome = () => {
        navigate(VENDOR_HOME_ROUTES.FULL.HOME_FULL);
    };

    return (<>
    <div className="col-12">

        <div className="col-6 d-flex justify-content-start">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="row vendor-item-container my-3 ps-3">
            <div className="col-12 col-md-5 p-0 pe-md-2">
                <div className="col-12 vendor-item-container bg-white m-0 p-3">
                    <p className="col-12 text-start h3-semibold primary-text">
                        Order Tracking
                    </p>

                    <div className="col-12 px-3">
                        <p className="col-12 h3-semibold primary-text my-0">
                            Active Orders
                        </p>

                        <div className="col-12">
                            {
                                activeOrderItems.map((orderItem, index) => <div key={index} className="col-12 m-0 p-0"
                                onClick={ () => setSelectedOrderItemIndex(index)}>
                                    <VendorOrderItem 
                                    buyerName={orderItem.buyerName} 
                                    productName={orderItem.productName} 
                                    location={orderItem.location} 
                                    orderStatus={orderItem.orderStatus}                                
                                />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-12 col-md-7 m-0 p-0 ps-md-2 mt-3 mt-md-0">
                <div className="col-12 vendor-item-container bg-white m-0 p-3">
                    <div className="col-12">
                        <div className="col-12 d-flex justify-content-end">
                            <label className="rounded-pill px-4 py-2 small-medium"
                            style={{
                                color: "var(--cards-form-bg, #FFF)",
                                backgroundColor: `${(activeOrderItems[selectedOrderItemIndex].orderStatus === VendorOrderStatus.CONFIRMED) ? "var(--Remember-me-Links, #2966FF)" 
                                    : (activeOrderItems[selectedOrderItemIndex].orderStatus === VendorOrderStatus.IN_TRANSIT) ? "var(--yellow, #F8C813)" 
                                    : (activeOrderItems[selectedOrderItemIndex].orderStatus === VendorOrderStatus.DELIVERED) ? "var(--Primary, #457900)" : "var(--red, #F25C5E)"}`
                            }}
                            >
                                {activeOrderItems[selectedOrderItemIndex].orderStatus}
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <VendorOrderStatusView
                                orderStatus={VendorOrderStatus.CONFIRMED}
                                dateChanged={new Date()}
                                />
                            </div>

                            <div className="col-12 col-md-3">
                                <VendorOrderStatusView
                                orderStatus={VendorOrderStatus.PROCESSING}
                                dateChanged={new Date()}
                                />
                            </div>

                            <div className="col-12 col-md-3">
                                <VendorOrderStatusView
                                orderStatus={VendorOrderStatus.IN_TRANSIT}
                                dateChanged={new Date()}
                                />
                            </div>

                            <div className="col-12 col-md-3">
                                <VendorOrderStatusView
                                orderStatus={VendorOrderStatus.DELIVERED}
                                dateChanged={new Date()}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 ">
                        <p className="h3-bold my-0"
                        style={{
                            color: "var(--Primary, #457900)"
                        }}>
                            Order details
                        </p>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-6 col-md-6">
                                    <VendorOrderDetail 
                                    entryLabel={orderItemDetails[selectedOrderItemIndex][0].entryLabel} 
                                    entryValue={orderItemDetails[selectedOrderItemIndex][0].entryValue} />
                                </div>
                                <div className="col-6 col-md-6">
                                    <VendorOrderDetail 
                                    entryLabel={orderItemDetails[selectedOrderItemIndex][1].entryLabel} 
                                    entryValue={`${orderItemDetails[selectedOrderItemIndex][1].entryValue}${orderItemDetails[selectedOrderItemIndex][2].entryValue}`} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6 col-md-6">
                                    <VendorOrderDetail 
                                    entryLabel={orderItemDetails[selectedOrderItemIndex][3].entryLabel} 
                                    entryValue={orderItemDetails[selectedOrderItemIndex][3].entryValue} />
                                </div>
                                <div className="col-6 col-md-6">
                                    <VendorOrderDetail 
                                    entryLabel={orderItemDetails[selectedOrderItemIndex][4].entryLabel} 
                                    entryValue={orderItemDetails[selectedOrderItemIndex][4].entryValue} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6 col-md-6">
                                    <VendorOrderDetail 
                                    entryLabel={orderItemDetails[selectedOrderItemIndex][5].entryLabel} 
                                    entryValue={orderItemDetails[selectedOrderItemIndex][5].entryValue} />
                                </div>
                                <div className="col-6 col-md-6">
                                    <VendorOrderDetail 
                                    entryLabel={orderItemDetails[selectedOrderItemIndex][6].entryLabel} 
                                    entryValue={orderItemDetails[selectedOrderItemIndex][6].entryValue} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
};

export default VendorTrackOrder;