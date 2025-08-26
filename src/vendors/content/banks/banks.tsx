import BankPage from "../../../farmer/content/banks/Pages/BankPage";
import { LoanData } from "../../../farmer/content/banks/type";



const VendorBanks: React.FC = () => {
    return (<>
    <div className="col-12">
        <BankPage 
        onViewMore={function (loanData?: LoanData): void {
                console.log("Function not implemented.", loanData);
            } } 

            activeTab={""} 

            onTabChange={function (tab: string): void {
                console.log("Function not implemented.", tab);
            } } />
    </div>
    </>);
};

export default VendorBanks;