import { useNavigate } from "react-router-dom";
import { VENDOR_HOME_ROUTES } from "./vendor-home-routes";



const VendorHomeStockSalesAndLevelDetails: React.FC = () => {
    const navigate = useNavigate();

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

        <p>
            Here is the stock level and sales details.
        </p>
    </div>
    </>);
};

export default VendorHomeStockSalesAndLevelDetails;