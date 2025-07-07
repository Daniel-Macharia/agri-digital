import { useRef, useState } from "react";
import { SalesNotificationItemProps, SalesOfferProps } from "../crops-models";
import CropsNotification from "../crops-notification/crops-notification";
import "./index.css";
import SalesOffer from "./sales-offer";
import "/src/index.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SalesNotificationItem from "./sales-notification-item";

import * as Yup from "yup";
import SalesLineChart from "./line-chart";

const Sales: React.FC = ()=>{

    const [previewUrl, setPreviewUrl] = useState<string|null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleSelectFileAction = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if( file )
        {
            console.log("loaded file ", file.name);

            setPreviewUrl( URL.createObjectURL(file) )
        }
        else{
            console.log("Failed to load file!");
        }
    };

    let salesOffers: SalesOfferProps[] = [
        {
            "customerName": "Global Foods Inc.",
            "buyerType": "Wholesale distributor",
            "orderRequest": "pending",
            "negotiationStatus": false,
            "proposedPrice": 60,
            "quantity": 2000,
            "deliveryMethod": "Buyer pickup"
        },
        {
            "customerName": "Local Markets Ltd",
            "buyerType": "Regional distributor",
            "orderRequest": "Completed",
            "negotiationStatus": true,
            "proposedPrice": 83,
            "quantity": 1500,
            "deliveryMethod": "Farmer Delivery"
        }
    ];

    let myCrops = {
      name: "Tomatoes" ,
      variety: "Money Maker",
      quantity: 400,
      unitPrice: 40,
      harvestingDate: new Date().toDateString(),
      quality: "Grade 1 (export)",
      storageMethod: "Cold Storage"
    };

    let myProducts = {
        name: "Tomatoes",
        variety: "Roma VF",
        quantity: 500,
        unitPrice: 85,
        quality: "Grade 1 (export)"
    };

    const marketInsights: SalesNotificationItemProps[] = [
        { "iconUrl" : "/assets/images/increase_icon.svg", "itemName" : "Price Update", "itemDescription": "28.5% price increase in the past month", "timeReceived" : "1 hour"},
        { "iconUrl" : "/assets/images/location_icon.svg", "itemName" : "Regional Demand", "itemDescription": "Nairobi has a high demand in tomatoes", "timeReceived" : "5 hours"},
        { "iconUrl" : "/assets/images/export_icon.svg", "itemName" : "Export Market", "itemDescription": "EU Market offers KES 100/Kg for organically grown tomatoes", "timeReceived" : "1 day"}
    ];

    const initialValues = {
        productName: "",
        productQuantity: "",
        productType: "",
        productPrice: ""
    };

    const validationSchema = Yup.object({
        productName: Yup.string().required("required"),
        productQuantity: Yup.number().required("required").typeError("quantity must be a number"),
        productType: Yup.string().required("required"),
        productPrice: Yup.number().required("required").typeError("price must be a number")
    });

    const handleAddProductAction = (product: typeof initialValues) => {
        console.log(product);
        alert(product);
    };

    const render = ()=>{
        return (<>
        <div className="row col-sm-12"
        style={{paddingTop: "20px"}} 
        >
            <CropsNotification 
            iconUrl={"/assets/images/warning.svg"} 
            message={"Tomato prices in Mombasa just rose by 10%"} />

            <div className="row flex-wrap col-sm-12 col-md-8">
                <div className="col-sm-12 sales-container">
                    <div className="col-sm-12" >
                        <h3 className="body-medium left-aligned-text col-sm-12">My crops</h3>
                    </div>

                    <div className="row col-sm-12"
                    style={{gap: "0px",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        padding: "0px",
                        minWidth: "100%"
                    }}
                    >
                        <img
                        className="col-sm-12 col-md-6 order-1"
                        src="/assets/images/organic_tomatoes_main.png"
                        style={{margin: "0px"}}
                        />
                        <div className="col-sm-12 col-md-6 order-0"
                        style={{margin: "0px"}}
                        >
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Crop Name</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myCrops.name}</p>
                            </div>
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Variety 2</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myCrops.variety}</p>
                            </div>
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Quantity (Qty)</p>
                                <p className="right-aligned-text col-sm-6  small-semibold">{myCrops.quantity} Kg</p>
                            </div>
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Price Per Unit 4</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">Ksh {myCrops.unitPrice}</p>
                            </div>
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Total Price</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">Ksh {myCrops.unitPrice * myCrops.quantity}</p>
                            </div>
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Harvesting Date</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myCrops.harvestingDate}</p>
                            </div>
                            <div className="key-value-text row-sm-12">
                                <p className="left-aligned-text col-sm-6 small-regular">Quality</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myCrops.quality}</p>
                            </div>
                            <div className="key-value-text row-sm-12 no-wrap">
                                <p className="left-aligned-text  col-sm-6 small-regular">Storage Method</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myCrops.storageMethod}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row col-sm-12 sales-container">
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={ handleAddProductAction }

                    >

                        {
                            ({}) => (
                                <Form className="col-sm-12" >
                                    <div className="col-sm-12 "
                                    style={{
                                        margin: '0px',
                                    }}
                                    >
                                        <p className="form-label row col-sm-12 left-aligned-text "
                                        style={{
                                            margin: '0px'
                                        }}
                                        >
                                            Upload Photo
                                        </p>
                                        <div className="col-sm-12 form-control"
                                        style={{borderStyle: 'dashed',
                                            borderWidth: '1px', 
                                            marginTop: '0px'}}
                                        
                                        onClick={handleSelectFileAction}
                                        >
                                            <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            style={{display: "none" }}
                                            onChange={handleFileChange}
                                            />
                                            <img src={previewUrl || "/assets/images/upload_photo.svg"} 
                                            className={previewUrl ? "col-sm-12" : "col-sm-1"}
                                            />
                                            <p className="small-semibold" style={{ color: "var(--primary)"}}>
                                                Upload Photo of the Product
                                                <br/>
                                                PDF, PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12" style={{margin: "0px", padding: "0px", marginBottom: "0px", gap: "12px"}}>
                                        <div className="row col-sm-12" 
                                        style={{
                                            margin: "0px", 
                                            padding: "0px",
                                            gap: "12px",
                                            marginBottom: "10px"}}>
                                            <div className="col-sm-12 col-md-6 order-1 sales-input-group" 
                                            style={{
                                                padding: "0px",
                                                alignSelf: "start"}}>
                                                <label className="col-sm-12 left-aligned-text form-label sales-input-label" htmlFor="productName"
                                                style={{marginBottom: "0px"}}>
                                                    Product Name
                                                </label>
                                                <div className="col-sm-12" >
                                                    <Field
                                                    name="productName"
                                                    placeholder="Maize"
                                                    type="text"
                                                    className="col-sm-12 sales-input-field form-control"
                                                    />
                                                    <div className="text-danger small col-sm-12" 
                                                    style={{margin: "0px", textAlign: "start"}} >
                                                        <ErrorMessage name="productName" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row col-sm-12 col-md-6 order-2 sales-input-group"
                                            style={{padding: "0px", alignSelf: "start", paddingLeft: "4px"}}>
                                                <label className="col-sm-12 left-aligned-text form-label sales-input-label" htmlFor="productQuantity"
                                                style={{marginBottom: "0px"}}
                                                >
                                                    Quantity
                                                </label>
                                                <div className="col-sm-12" style={{padding: "0px"}}>
                                                    <Field
                                                    name="productQuantity"
                                                    placeholder="140Kg"
                                                    type="text"
                                                    className="col-sm-12 sales-input-field form-control"
                                                    />
                                                    <div className="text-danger small col-sm-12" 
                                                    style={{margin: "0px", textAlign: "start"}} >
                                                        <ErrorMessage name="productQuantity" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row col-sm-12" 
                                        style={{margin: "0px", padding: "0px", gap: "12px", marginBottom: "10px"}}>
                                            <div className="col-sm-12 col-md-6 order-1 sales-input-group"
                                            style={{padding: "0px", alignSelf: "start"}}>
                                                <label className="sales-input-label col-sm-12 left-aligned-text form-label" htmlFor="productPrice"
                                                style={{marginBottom: "0px"}}
                                                >
                                                    Price
                                                </label>
                                                <div className="col-sm-12">
                                                    <Field
                                                    name="productPrice"
                                                    placeholder="Ksh 120/Kg"
                                                    type="text"
                                                    className="col-sm-12 sales-input-field form-control"
                                                    />
                                                    <div className="text-danger small col-sm-12" 
                                                    style={{margin: "0px", textAlign: "start"}} >
                                                        <ErrorMessage name="productPrice" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row col-sm-12 col-md-6 order-2 sales-input-group"
                                            style={{padding: "0px", alignSelf: "start", paddingLeft: '4px'}}
                                            >
                                                <label className="sales-input-label col-sm-12 left-aligned-text form-label" htmlFor="productType"
                                                style={{marginBottom: "0px"}}
                                                >
                                                    Type
                                                </label>
                                                <div className="col-sm-12" style={{padding: "0px"}}>
                                                    <Field
                                                    name="productType"
                                                    placeholder="Maize"
                                                    type="text"
                                                    className="col-sm-12 sales-input-field form-control"
                                                    />
                                                    <div className="text-danger small col-sm-12" 
                                                    style={{margin: "0px", textAlign: "start"}} >
                                                        <ErrorMessage name="productType" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <button
                                        type="submit"
                                        className="col-sm-4 small-semibold"
                                        >
                                            Add Product
                                        </button>

                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
                </div>

                <div className="row col-sm-12 sales-container">
                    <h3 className="col-sm-12">
                        Market Insights
                    </h3>

                    <div className="col-sm-12"
                    >
                        <SalesLineChart />
                    </div>

                    <div className="col-sm-12 card" style={{backgroundColor: ""}}>
                        <div className="row no-wrap col-sm-12" style={{backgroundColor: "", padding: "0px"}}>
                            <img src="/assets/images/notification_bell_icon.svg" 
                            className="sales-icon col-sm-2"
                            style={{backgroundColor: "", margin: "0px"}}
                            />
                            <h3 className="col-sm-10 left-aligned-text body-semibold"
                            style={{backgroundColor: "", margin: "0px"}}
                            >
                                Market Updates
                            </h3>
                        </div>

                        <div className="row col-sm-12" >
                            {
                                marketInsights.map( insight => <SalesNotificationItem 
                                iconUrl={insight.iconUrl}
                                itemName={insight.itemName}
                                itemDescription={insight.itemDescription}
                                timeReceived={insight.timeReceived}
                                />)
                            }
                        </div>

                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-4">
                <div className="col-sm-12 sales-container">
                    <h3 className="col-sm-12 left-aligned-text body-medium">My Products</h3>
                    <div className="col-sm-12">
                        <img
                        className="col-sm-12"
                        src="/assets/images/organic_tomatoes_side.png" />
                        <div className="col-sm-12" >
                            <div className="row col-sm-12 key-value-text">
                                <p className="left-aligned-text col-sm-6 small-regular">Crop Name</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myProducts.name}</p>
                            </div>

                            <div className="row col-sm-12 key-value-text">
                                <p className="left-aligned-text col-sm-6 small-regular">Variety</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myProducts.variety}</p>
                            </div>

                            <div className="row col-sm-12 key-value-text">
                                <p className="left-aligned-text col-sm-6 small-regular">Quantity (Kg)</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myProducts.quantity}Kg</p>
                            </div>

                            <div className="row col-sm-12 key-value-text">
                                <p className="left-aligned-text col-sm-6 small-regular">Price per Unit</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myProducts.unitPrice}/Kg</p>
                            </div>

                            <div className="row col-sm-12 key-value-text">
                                <p className="left-aligned-text col-sm-6 small-regular">Quality</p>
                                <p className="right-aligned-text col-sm-6 small-semibold">{myProducts.quality}</p>
                            </div>
                        </div>

                        <div className="col-sm-12"
                        style={{padding:'0px'}}
                        >
                            <button
                            type="button"
                            className="col-sm-12"
                            style={{margin:'0px'}}
                            >
                                Post to Market Place
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 sales-container" style={{
                    display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <h3 className="body-semibold left-aligned-text">Buyer Offers</h3>

                    {
                        salesOffers.map( offer => <SalesOffer 
                            customerName={offer.customerName}
                            negotiationStatus={offer.negotiationStatus}
                            buyerType={offer.buyerType}
                            deliveryMethod={offer.deliveryMethod}
                            orderRequest={offer.orderRequest}
                            quantity={offer.quantity}
                            proposedPrice={offer.proposedPrice}

                            
                            />)
                    }
                </div>
            </div>
        </div>
        </>);
    };
    return render();
}

export default Sales;