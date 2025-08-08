import React from "react";
import { HomeProductItemProps } from "../home-model";
import OverviewHeader from "./overview-header";


export function HomeProductItem(data: HomeProductItemProps) {
    const handleSeeMoreAction = () => {
        console.log("see more info");
    };
    
    return (<>
    <div className="col-12 card p-2"
    >
        <div className="col-12">
            <img src={data.productImageUrl} alt="image"
            className="col-12 "
            style={{borderRadius: "20px"}}
            />
        </div>
        
        <div className="col-12">
            <div className="row px-0">
                <div className="col-6 px-0 py-0">
                    <p className="col-12 px-0 ps-2 my-0 body-semibold primary-text">
                        {data.productName}
                    </p>
                </div>
                <div className="col-6 px-0 py-0">
                    <p className="col-12 mx-0 px-0 pe-2 my-0 body-regular secondary-text farmer-home-end-aligned-text">
                        {`KES ${data.productPrice}${(data.unitName == "") ? "" : "/" + data.unitName }`}
                    </p>
                </div>
            </div>
            <div className="col-12">
                <p className="body-bold my-3"
                style={{color: "var(--Primary, #457900)"}}>
                    {`${data.productQuantity}${data.unitName} Left`}
                </p>
            </div>
        </div>

        <div className="col-12 ">
            <button
            className="farmer-home-accept-button col-12"
            
            onClick={handleSeeMoreAction}
            >
                See More
            </button>
        </div>
    </div>
    </>);
};

const MyProductsOverview: React.FC = () => {
    let myProducts: HomeProductItemProps[] = [
        {productName: "Tomatoes", 
            productQuantity: 3500, 
            productPrice: 56, 
            unitName: "Kg", 
            productImageUrl: "/assets/images/home/tomatoes_home.svg"},

        {productName: "Milk", 
            productQuantity: 3500, 
            productPrice: 70, 
            unitName: "Ltr", 
            productImageUrl: "/assets/images/home/milk_home.svg"},

        {productName: "Cows", 
            productQuantity: 200, 
            productPrice: 120000, 
            unitName: "", 
            productImageUrl: "/assets/images/home/cow_home.svg"}
    ];

    return (<>
    <div className="col-12">

        <OverviewHeader
        overviewTitle="My Products"
        viewMoreUrl="/farmer/products"
        />

        <div className="col-12">
            <div className="row">
                {
                    myProducts.map((product) => <div className="col-12 col-md-4">
                        <HomeProductItem 
                        productImageUrl={product.productImageUrl} 
                        productName={product.productName} 
                        productQuantity={product.productQuantity} 
                        productPrice={product.productPrice} 
                        unitName={product.unitName}                        />
                    </div>)
                }
            </div>
        </div>
    </div>
    </>);
};

export default MyProductsOverview;