import FarmerHome from "./home";
import "./index.css";

export default function Home()
{

    const render = () =>{
        return (<>
        <div id="home-page-content">
            <FarmerHome />
        </div>
        </>);
    };

    return render();
}