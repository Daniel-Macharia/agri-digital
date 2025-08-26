import React from "react";
import { Route, Routes } from "react-router-dom";
import Programs from "./components/Programs";
import AddPrograms from "./components/AddPrograms";

const PatnersProgramsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<Programs />} />
            <Route path="/add" element={<AddPrograms />} />
        </Routes>
    );
};

export default PatnersProgramsRouter;  