import { useState } from "react";
import { SalesNegotiationProductProps, SalesOfferProps } from "../crops-models";
import "./sales-offer.css";
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

    const render = () => {
        return (<>
        <div className="col-sm-12 card" >
            <div className="row no-wrap col-sm-12 sales-offer-title">
                <img src="/assets/images/user_icon.svg" className="col-sm-2 sales-icon" />
                <p className="small-semibold left-aligned-text col-sm-10 " >
                    {sale.customerName}
                </p>
            </div>
            <div className="col-sm-12" style={{padding: '0px'}} >
                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regularjk col-sm-6">
                        Buyer Type
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.buyerType}
                    </p>
                </div>
                
                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regular col-sm-6">
                        Order Request
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.orderRequest}
                    </p>
                </div>

                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regular col-sm-6">
                        Negotitation Status
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.negotiationStatus ? "Completed" : "Pending"}
                    </p>
                </div>

                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regular col-sm-6">
                        Proposed Price
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.proposedPrice}
                    </p>
                </div>

                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regular col-sm-6">
                        Quantity
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.quantity}
                    </p>
                </div>

                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regular col-sm-6">
                        Total Price
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.quantity * sale.proposedPrice}
                    </p>
                </div>

                <div className="key-value-text row col-sm-12">
                    <p className="left-aligned-text small-regular col-sm-6">
                        Delivery Method
                    </p>
                    <p className="right-aligned-text small-semibold col-sm-6">
                        {sale.deliveryMethod}
                    </p>
                </div>
            </div>

            {sale.negotiationStatus ? "" : (<div className="row col-sm-12" 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0px"
                        }}>
                        <button
                        type="button"
                        className="col-sm-6"

                        style={{margin: "0px"}}

                        onClick={handleAcceptAction}
                        
                        >
                            Accept
                        </button>

                        <button
                        type="button"
                        className="col-sm-6 other-button"
                        
                        style={{margin: "0px"}}

                        onClick={handleNegotiateAction}
                        >
                            Negotiate
                        </button>
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
    };

    return render();
}

export default SalesOffer;