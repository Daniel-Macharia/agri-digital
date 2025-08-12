import { HomeProductItemProps } from "../../../farmer/content/home/home-model";
import { HomeProductItem } from "../../../farmer/content/home/overview/my-products-overview";
import OverviewHeader from "../../../farmer/content/home/overview/overview-header";


const VendorHomeMyProducts: React.FC= () => {

    const myProducts: HomeProductItemProps[] = [
        {productName: "needles", 
            productQuantity: 200, 
            productPrice: 120, 
            unitName: "", 
            productImageUrl: "/assets/images/vendor/home/soil_testing_service.svg"},

        {productName: "Pesticide", 
            productQuantity: 3500, 
            productPrice: 70, 
            unitName: "Ltr", 
            productImageUrl: "/assets/images/vendor/home/product_pesticide.svg"},

        {productName: "needles", 
            productQuantity: 200, 
            productPrice: 120, 
            unitName: "", 
            productImageUrl: "/assets/images/vendor/home/soil_testing_service.svg"}
    ];


    return (<>
    <div className="col-12">

        <OverviewHeader
        overviewTitle="My Products"
        viewMoreUrl="/vendor/my-products"
        />

        <div className="col-12">
            <div className="row">
                {
                    myProducts.map((product, index) => <div
                        key={index}
                        className="col-12 col-md-4" style={{height: "100%"}}>
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

export default VendorHomeMyProducts;