import { Route, Routes } from "react-router-dom";
import "./index.css"
import Projects from "./projects";
import ProjectInfo from "./project-info";
import JourneyHome from "./journey-home";
import AddNewProject from "./add-new-project";

export default function Journey()
{
    const render = ()=>{
        return (<>
        
        <Routes>
            <Route path="" element={<JourneyHome /> } />
            <Route path="/all" element={<Projects /> } />
            <Route path="/info" element={<ProjectInfo /> } />
            <Route path="/add" element={<AddNewProject />} />
        </Routes>
        </>);
    };

    return render();
}