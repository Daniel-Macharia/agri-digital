import { Route, Routes } from "react-router-dom";
import Health from "./Health-Management";
import Housing from "./Housing";
import TypesBreeds from "./Type&Breed";
import FeedsNutrition from "./Feeds&Nuitrition/Index";




export default function Livestock(){

    const render = ()=>{
        return (<>
        <div id="livestock-content-div" >
            <Routes>
                <Route path="feeds" element={<FeedsNutrition />} />
                <Route path="health" element={<Health />} />
                <Route path="housing" element={<Housing />} />
                <Route path="types" element={<TypesBreeds />} />       
               
            </Routes>
        </div>
        </>);
    };


    return render();
}