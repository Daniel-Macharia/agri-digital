import OverviewHeader from "../../../farmer/content/home/overview/overview-header";
import { VendorServiceItemProps } from "./vendor-home-models";


export function VendorServiceItem(data: VendorServiceItemProps) {
    const handleSeeMoreAction = () => {
        console.log("see more info");
    };
    
    return (<>
    <div className="col-12 card p-0"
    style={{
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px"
    }}
    >
        <div className="col-12 p-0">
            <img src={data.serviceImageUrl} alt="image"
            className="col-12 m-0"
            style={{borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderStyle: "none"
            }}
            />
        </div>
        
        <div className="col-12 p-2">
            <p className="col-12 px-0 my-0 body-medium primary-text">
                {data.serviceName}
            </p>

            <div className="col-12 d-flex align-items-center" >
                <img
                src="/assets/images/vendor/home/time.svg"
                alt="duration"
                className="m-0 p-0"
                style={{
                    width: "16px",
                    height: "16px"
                }}
                />
                <p className=" mx-0 px-0 ps-2 my-0 small-regular"
                style={{
                    color: "var(--Primary, #457900)"
                }}>
                    {`${data.serviceDuration} ${data.serviceUnitName}`}
                </p>
            </div>

            <p className="h3-bold primary-text my-2">
                {`KES ${data.serviceCost}`}
            </p>

        </div>

        <div className="col-12 p-2">
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

const VendorHomeMyServices: React.FC = () => {

    const myServices: VendorServiceItemProps[] = [
        {
            serviceName: "Soil Testing", 
            serviceCost: 120, 
            serviceDuration: 1,
            serviceUnitName: "hour", 
            serviceImageUrl: "/assets/images/vendor/home/soil_testing_service.svg"},

        {
            serviceName: "Veterinary Service",
            serviceCost: 70, 
            serviceDuration: 1,
            serviceUnitName: "hour", 
            serviceImageUrl: "/assets/images/vendor/home/vet_service.svg"},

        {
            serviceName: "Veterinary Service", 
            serviceCost: 120, 
            serviceDuration: 1,
            serviceUnitName: "hour", 
            serviceImageUrl: "/assets/images/vendor/home/soil_testing_service.svg"}
    ];

    return (<>
    <div className="col-12">

        <OverviewHeader
        overviewTitle="My Services"
        viewMoreUrl="/vendor/my-services"
        />

        <div className="col-12">
            <div className="row">
                {
                    myServices.map((service) => <div className="col-12 col-md-4">
                        <VendorServiceItem
                        serviceImageUrl={service.serviceImageUrl} 
                        serviceName={service.serviceName} 
                        serviceDuration={service.serviceDuration} 
                        serviceCost={service.serviceCost} 
                        serviceUnitName={service.serviceUnitName}                        />
                    </div>)
                }
            </div>
        </div>
    </div>
    </>);
};

export default VendorHomeMyServices;