import BankPage from "../../../farmer/content/banks/Pages/BankPage";
import { LoanData } from "../../../farmer/content/banks/type";



const VendorBanks: React.FC = () => {
    return (<>
    <div className="col-12">
        <BankPage 
        onViewMore={function (loanData?: LoanData): void {
                throw new Error("Function not implemented.");
            } } 
            activeTab={""} 

            onTabChange={function (tab: string): void {
                throw new Error("Function not implemented.");
            } } />
    </div>
    </>);
};

export default VendorBanks;