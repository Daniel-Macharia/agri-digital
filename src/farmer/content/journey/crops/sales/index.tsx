import { useRef, useState } from "react";
import { SalesNotificationItemProps, SalesOfferProps } from "../crops-models";
import CropsNotification from "../crops-notification/crops-notification";
import SalesOffer from "./sales-offer";
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

    const salesOffers: SalesOfferProps[] = [
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

    const myCrops = {
      name: "Tomatoes" ,
      variety: "Money Maker",
      quantity: 400,
      unitPrice: 40,
      harvestingDate: new Date().toDateString(),
      quality: "Grade 1 (export)",
      storageMethod: "Cold Storage"
    };

    const myProducts = {
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
        productPrice: "",
        previewUrl: null
    };

    const validationSchema = Yup.object({
        productName: Yup.string().required("required"),
        productQuantity: Yup.number().required("required").typeError("quantity must be a number"),
        productType: Yup.string().required("required"),
        productPrice: Yup.number().required("required").typeError("price must be a number"),
        previewUrl: Yup.string().required("select product image")
    });

    const handleAddProductAction = (product: typeof initialValues) => {
        console.log(product);
        alert(product);
    };

    
    return (<>
    <div className="col-12 mx-0"
    >
        <div className="col-12 my-3" >
            <CropsNotification 
            iconUrl={"/assets/images/warning.svg"} 
            message={"Tomato prices in Mombasa just rose by 10%"} />
        </div>

        <div className="col-12 crops-container m-0">
            <div className="row ">
                <div className="col-12 col-md-8 mx-0 px-0 ">
                    <div className="row mx-0 px-1 pe-md-3">
                        <div className="col-12 crops-container bg-white">
                            <div className="col-12" >
                                <h3 className="h3-bold primary-text crops-start-aligned-text col-12 my-0">
                                    My crops
                                </h3>
                            </div>

                            <div className="row"
                            >
                                <div className="col-12 col-md-5 order-1 mt-2">
                                    <img
                                    className="col-12 m-0"
                                    src="/assets/images/organic_tomatoes_main.png"
                                    />
                                </div>
                                <div className="col-12 col-md-7 order-0 mt-2">
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Crop Name
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            {myCrops.name}
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Variety 2
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            {myCrops.variety}
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Quantity (Qty)
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            {myCrops.quantity} Kg
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Price Per Unit 4
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            Ksh {myCrops.unitPrice}
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Total Price
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            Ksh {myCrops.unitPrice * myCrops.quantity}
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Harvesting Date
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            {myCrops.harvestingDate}
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Quality
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            {myCrops.quality}
                                        </p>
                                    </div>
                                    <div className="row my-1">
                                        <p className="crops-start-aligned-text col-6 m-0 body-regular secondary-text">
                                            Storage Method
                                        </p>
                                        <p className="crops-end-aligned-text col-6 m-0 body-bold primary-text">
                                            {myCrops.storageMethod}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-12 crops-container bg-white mt-3">
                            <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={ handleAddProductAction }

                            >

                                {
                                    ({setFieldValue}) => (
                                        <Form className="col-12" >
                                            <div className="col-12 m-0"
                                            >
                                                <p className="col-12 crops-start-aligned-text body-bold "
                                                style={{color: "var(--Primary, #457900)"}}
                                                >
                                                    Upload Photo
                                                </p>
                                                <div className="col-12 form-control jusitify-content-center"
                                                style={{borderStyle: 'dashed',
                                                    borderWidth: '1px', 
                                                    marginTop: '0px'}}
                                                
                                                onClick={handleSelectFileAction}
                                                >
                                                    <input
                                                    name="previewUrl"
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    style={{display: "none" }}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        const file = event.target.files?.[0];

                                                        if( file )
                                                        {
                                                            console.log("loaded file ", file.name);

                                                            setPreviewUrl( URL.createObjectURL(file) );
                                                            setFieldValue("previewUrl", file.name);
                                                        }
                                                        else{
                                                            console.log("Failed to load file!");
                                                        }
                                                    }}
                                                    />
                                                    <div className="col-12 d-flex justify-content-center">
                                                        <img src={previewUrl || "/assets/images/upload_photo.svg"} 
                                                        className={previewUrl ? "col-12" : "col-sm-1"}
                                                        style={{
                                                            maxWidth: previewUrl ? "40%" : "10%"
                                                        }}
                                                        />
                                                    </div>
                                                    <p className="body-regular secondary-text text-center" >
                                                        Upload Photo of the Product
                                                        <br/>
                                                        <span className="small-regular secondary-text">
                                                            PDF, PNG, JPG up to 10MB
                                                        </span>
                                                    </p>
                                                    <div className="text-danger small">
                                                        <ErrorMessage name="previewUrl" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 m-0 px-0" >
                                                <div className="row m-0 mx-0 px-0 p-0 mb-2" 
                                                >
                                                    <div className="col-12 col-md-6 order-0 px-0 px-md-1" >
                                                        <label className="col-12 crops-start-aligned-text body-regular primary-text m-0" 
                                                        htmlFor="productName">
                                                            Product Name
                                                        </label>
                                                        <div className="col-12" >
                                                            <Field
                                                            name="productName"
                                                            placeholder="Maize"
                                                            type="text"
                                                            className="col-12 form-control body-regular"
                                                            />
                                                            <div className="text-danger small col-12 m-0 crops-start-aligned-text m-0" 
                                                            >
                                                                <ErrorMessage name="productName" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6 order-1 px-0 px-md-1">
                                                        <label className="col-12 crops-start-aligned-text body-regular primary-text m-0" 
                                                        htmlFor="productQuantity"
                                                        >
                                                            Quantity
                                                        </label>
                                                        <div className="col-12">
                                                            <Field
                                                            name="productQuantity"
                                                            placeholder="140Kg"
                                                            type="text"
                                                            className="col-12 form-control body-regular"
                                                            />
                                                            <div className="text-danger small col-12 m-0 crops-start-aligned-text" >
                                                                <ErrorMessage name="productQuantity" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row m-0 p-0 mb-0 ">
                                                    <div className="col-12 col-md-6 order-0 px-0 px-md-1">
                                                        <label className="col-12 crops-start-aligned-text body-regular primary-text m-0" 
                                                        htmlFor="productPrice"
                                                        >
                                                            Price
                                                        </label>
                                                        <div className="col-12">
                                                            <Field
                                                            name="productPrice"
                                                            placeholder="Ksh 120/Kg"
                                                            type="text"
                                                            className="col-12 form-control body-regular"
                                                            />
                                                            <div className="text-danger small col-12 m-0 crops-start-aligned-text" >
                                                                <ErrorMessage name="productPrice" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-6 order-1 px-0 px-md-1"
                                                    >
                                                        <label className="col-12 crops-start-aligned-text body-regular primary-text m-0" 
                                                        htmlFor="productType"
                                                        >
                                                            Type
                                                        </label>
                                                        <div className="col-12 p-0" >
                                                            <Field
                                                            name="productType"
                                                            placeholder="Maize"
                                                            type="text"
                                                            className="col-12 form-control body-regular"
                                                            />
                                                            <div className="text-danger small col-12 m-0 crops-start-aligned-text"  >
                                                                <ErrorMessage name="productType" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-start mt-2 px-1">
                                                <button
                                                type="submit"
                                                className="col-6 col-md-4 m-0 crops-accept-button body-semibold"
                                                >
                                                    Add Product
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                }

                            </Formik>
                        </div>

                        <div className="col-12 crops-container bg-white mt-3">
                            <h3 className="col-12 my-1 crops-start-aligned-text h3-bold primary-text">
                                Market Insights
                            </h3>

                            <div className="col-12"
                            >
                                <SalesLineChart />
                            </div>

                            <div className="col-12 card m-1 p-3" >
                                <div className="'col-12">
                                    <div className="row" >
                                        <div className="col-2 d-flex col-md-1 p-0 pe-2 m-0 justify-content-end"
                                        >
                                            <img src="/assets/images/notification_bell_icon.svg" 
                                            className="p-0 m-0"
                                            style={{width: "24px", height: "24px"}}
                                            />
                                        </div>

                                        <div className="col-10 p-0 m-0">
                                            <h3 className="col-12 crops-start-aligned-text body-bold primary-text"
                                            >
                                                Market Updates
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12" >
                                    {
                                        marketInsights.map( insight => <div className="col-12">
                                            <SalesNotificationItem 
                                            iconUrl={insight.iconUrl}
                                            itemName={insight.itemName}
                                            itemDescription={insight.itemDescription}
                                            timeReceived={insight.timeReceived}
                                            />
                                        </div>)
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 mt-2 mt-md-0 px-0">
                    <div className="row mx-0 px-1 ps-md-2">
                        <div className="col-12 crops-container bg-white">
                            <h3 className="col-12 my-1 crops-start-aligned-text h3-bold primary-text">
                                My Products
                            </h3>
                            <div className="col-12">
                                <img
                                className="col-12"
                                src="/assets/images/organic_tomatoes_side.png" />

                                <div className="col-12" >
                                    <div className="row">
                                        <p className="crops-start-aligned-text col-6 my-0 mx-0 body-regular secondary-text">
                                            Crop Name
                                        </p>
                                        <p className="crops-end-aligned-text col-6 my-0 mx-0 body-bold primary-text">
                                            {myProducts.name}
                                        </p>
                                    </div>

                                    <div className="row">
                                        <p className="crops-start-aligned-text col-6 my-0 mx-0 body-regular secondary-text">
                                            Variety
                                        </p>
                                        <p className="crops-end-aligned-text col-6 my-0 mx-0 body-bold primary-text">
                                            {myProducts.variety}
                                        </p>
                                    </div>

                                    <div className="row">
                                        <p className="crops-start-aligned-text col-6 my-0 mx-0 body-regular secondary-text">
                                            Quantity (Kg)
                                        </p>
                                        <p className="crops-end-aligned-text col-6 my-0 mx-0 body-bold primary-text">
                                            {myProducts.quantity}Kg
                                        </p>
                                    </div>

                                    <div className="row">
                                        <p className="crops-start-aligned-text col-6 my-0 mx-0 body-regular secondary-text">
                                            Price per Unit
                                        </p>
                                        <p className="crops-end-aligned-text col-6 my-0 mx-0 body-bold primary-text">
                                            {myProducts.unitPrice}/Kg
                                        </p>
                                    </div>

                                    <div className="row">
                                        <p className="crops-start-aligned-text col-6 my-0 mx-0 body-regular secondary-text">
                                            Quality</p>
                                        <p className="crops-end-aligned-text col-6 my-0 mx-0 body-bold primary-text">
                                            {myProducts.quality}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12"
                                >
                                    <button
                                    type="button"
                                    className="col-12 mx-0 crops-accept-button"
                                    >
                                        Post to Market Place
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 crops-container bg-white mt-2" >
                            <div className="col-12 p-0 d-flex my-2">
                                {/* <div className="row p-0 m-0"> */}
                                    <div className="col-6 m-0">
                                        <div className="row justify-content-start m-0">
                                            <h3 className="h3-semibold primary-text crops-start-aligned-text m-0 px-0">
                                                Buyer Offers
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="col-6 m-0">
                                        <div className="row justify-content-end m-0">
                                            <button className="body-regular crops-end-aligned-text bg-white m-0 px-0"
                                            style={{
                                                color: "var(--Primary, #457900)",
                                                borderStyle: "none"
                                                }}
                                                
                                                onClick={() => {console.log("viewing all offers")}}
                                                >
                                                View all Offers
                                            </button>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>

                            {
                                salesOffers.map( (offer, index) => <div className={`col-12 card ${index !== 0 ? "mt-2" : "mt-0"}`}>
                                    <SalesOffer 
                                    customerName={offer.customerName}
                                    negotiationStatus={offer.negotiationStatus}
                                    buyerType={offer.buyerType}
                                    deliveryMethod={offer.deliveryMethod}
                                    orderRequest={offer.orderRequest}
                                    quantity={offer.quantity}
                                    proposedPrice={offer.proposedPrice}
                                    />
                                
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
}

export default Sales;