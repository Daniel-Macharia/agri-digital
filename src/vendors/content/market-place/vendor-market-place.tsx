import { useLocation } from "react-router-dom";
import MarketplacePage from "../../../farmer/content/market-place/pages/MarketplacePage";


const VendorMarketplace: React.FC = () => {

    const backUrl = useLocation().state;

    console.log(backUrl);
    
    return (<>
        <div className="col-12">
            <MarketplacePage />
        </div>
    </>);
};

export default VendorMarketplace;