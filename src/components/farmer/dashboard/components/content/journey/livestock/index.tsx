import { Route, Routes } from "react-router-dom";
import "./index.css";
import HousingNutrition from "./Feeds&Nuitrition";

export default function Livestock(){

    const render = ()=>{
        return (<>
        <div id="livestock-content-div" >
            <Routes>
                <Route path="" element={<HousingNutrition />} />
                <Route path="housing" element={<HousingNutrition />} />
                <Route path="nutrition" element={<HousingNutrition />} />
            </Routes>
        </div>
        </>);
    };


    return render();
}