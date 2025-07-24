import { useState } from "react";
import { SalesNegotiationProductProps, SalesOfferProps } from "../crops-models";
import ConfirmAcceptanceModal from "./confirm-acceptance-modal";
import NegotiateOfferModal from "./negotiate-offer-modal";

const SalesOffer: React.FC<SalesOfferProps> = (sale: SalesOfferProps) => {

    const [showAcceptanceModal, setShowAcceptanceModal] = useState<boolean>(false);

    const [showNegotiateModal, setShowNegotiateModal] = useState<boolean>(false);

    let negotiatedProduct: SalesNegotiationProductProps = {
        "productImageUrl" : "/assets/images/organic_tomatoes_side.png",
        "productName": "Organic Tomatoes",
        "productSeller": "My Products",
        "productUnitPrice": "150",
        "productUnitName": "Kg",
        "show": showNegotiateModal,
        "setShow": setShowNegotiateModal
    };
    
    const handleAcceptAction = () => {
        console.log("confirming acceptance");
        setShowAcceptanceModal(true);
    };

    const handleNegotiateAction = () => {
        console.log("negitating deal");
        setShowNegotiateModal(true);
    };

    
    return (<>
    <div className="col-12 p-1" >

        <div className="row py-0">
            <div className="col-2 py-0">
                <img src="/assets/images/user_icon.svg" className="sales-icon" 
                style={{width: "24px", height: "24px"}}/>
            </div>
            <div className="col-10 py-0">
                <p className="body-bold primary-text crops-start-aligned-text col-12 my-0 " >
                    {sale.customerName}
                </p>
            </div>
        </div>
        
        <div className="col-12" >
            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Buyer Type
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.buyerType}
                </p>
            </div>
            
            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Order Request
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.orderRequest}
                </p>
            </div>

            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Negotitation Status
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.negotiationStatus ? "Completed" : "Pending"}
                </p>
            </div>

            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Proposed Price
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.proposedPrice}
                </p>
            </div>

            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Quantity
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.quantity}
                </p>
            </div>

            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Total Price
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.quantity * sale.proposedPrice}
                </p>
            </div>

            <div className="row">
                <p className="crops-start-aligned-text body-regular secondary-text col-6 order-0 mx-0 my-1">
                    Delivery Method
                </p>
                <p className="crops-end-aligned-text body-bold primary-text col-6 order-1 mx-0 my-1">
                    {sale.deliveryMethod}
                </p>
            </div>
        </div>

        {sale.negotiationStatus ? "" : (<div className="col-12" >
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="row pe-1 justify-content-start">
                                <button
                                type="button"
                                className="col-12 mx-0 crops-accept-button"
                                onClick={handleAcceptAction}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                        
                        <div className="col-12 col-md-6">
                            <div className="row ps-1 justify-content-end" >
                                <button
                                type="button"
                                className="col-12 other-button mx-0 crops-other-button"
                                onClick={handleNegotiateAction}
                                >
                                    Negotiate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
    </div>

    <ConfirmAcceptanceModal show={showAcceptanceModal} setShow={setShowAcceptanceModal} />

    <NegotiateOfferModal 
    productImageUrl={negotiatedProduct.productImageUrl} 
    productName={negotiatedProduct.productName} 
    productSeller={negotiatedProduct.productSeller} 
    productUnitPrice={negotiatedProduct.productUnitPrice} 
    productUnitName={negotiatedProduct.productUnitName} 
    show={negotiatedProduct.show} 
    setShow={negotiatedProduct.setShow} />
    </>);
}

export default SalesOffer;