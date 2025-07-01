import "./index.css";
import BankPage from "./BankPage";
export default function Banks()
{

    const render = () =>{
        return (<>
        <div id="banks-page-content">
            <BankPage />
        </div>
        </>);
    };

    return render();
}