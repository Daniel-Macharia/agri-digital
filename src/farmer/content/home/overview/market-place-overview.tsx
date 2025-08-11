import React from "react";
import { HomeMarketplaceItemProps } from "../home-model";
import OverviewHeader from "./overview-header";


const HomeMarketProductItem: React.FC<HomeMarketplaceItemProps> = (data: HomeMarketplaceItemProps) => {
    const handleSeeMoreAction = () => {
        console.log("see more info");
    };
    
    return (<>
    <div className="col-12 p-2">
        <div className="col-12">
            <img src={data.productImageUrl} alt="image"
            className="col-12 "
            style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}
            />
        </div>
        
        <div className="col-12">
            <div className="col-12 ">
                <p className="col-12 body-bold primary-text my-0">
                    {data.productName}
                </p>
            </div>

            <div className="col-12">
                <p className="col-12 body-regular my-0"
                style={{color: "var(--Primary, #457900)"}}>
                    {`${data.productSeller}`}
                </p>
            </div>

            <div className="col-12 ">
                <p className="col-12 my-2">
                    <span className="h3-bold primary-text">
                        {`KES ${data.productPrice}`}
                    </span>
                    <span className="body-regular primary-text">
                        {`${(data.unitName == "") ? "" : " per " + data.unitName }`}
                    </span>
                </p>
            </div>
            
        </div>

        <div className="col-12">
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

const MarketPlaceOverview: React.FC = () => {
    const myProducts: HomeMarketplaceItemProps[] = [
        {productName: "Organic Tomatoes", 
            productSeller: "Agri Farmers", 
            productPrice: 150, 
            unitName: "Kg", 
            productImageUrl: "/assets/images/home/tomatoes_marketplace_home.svg"},

        {productName: "Manure", 
            productSeller: "Agri Farmer", 
            productPrice: 150, 
            unitName: "Kg", 
            productImageUrl: "/assets/images/home/manure_marketplace_home.svg"},

        {productName: "Seeds", 
            productSeller: "Agri Farmers", 
            productPrice: 150, 
            unitName: "Kg", 
            productImageUrl: "/assets/images/home/seeds_marketplace_home.svg"}
    ];

    return (<>
    <div className="col-12">
        <OverviewHeader overviewTitle="Market Place" viewMoreUrl="/farmer/market-place" />

        <div className="col-12">
            <div className="row">
                {
                    myProducts.map((product) => <div className="col-12 col-md-4">
                        <HomeMarketProductItem 
                        productImageUrl={product.productImageUrl} 
                        productName={product.productName} 
                        productSeller={product.productSeller} 
                        productPrice={product.productPrice} 
                        unitName={product.unitName}                        />
                    </div>)
                }
            </div>
        </div>
    </div>
    </>);
};

export default MarketPlaceOverview;