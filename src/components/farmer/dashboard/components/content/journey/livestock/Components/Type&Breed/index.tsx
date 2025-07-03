import LandingPage from './LandingPage';

import RequestForm from './RequestForm';
import { Routes, Route } from 'react-router-dom';
import TypeBreedForm from './TypeBreedForm';
import NavBar from './NavBar';



// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => (   
  <>
    <NavBar />
    <Component />
  </>
);  

const TypeBreed = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="form" element={WithNavBar(TypeBreedForm)} />
      <Route path="form/request" element={<RequestForm />} /> 
    </Routes>
  );
}

export default TypeBreed
   





