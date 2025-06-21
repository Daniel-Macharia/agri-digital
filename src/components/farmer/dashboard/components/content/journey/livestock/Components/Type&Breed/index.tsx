import LandingPage from './LandingPage';
import TypeBreedForm from './TypeBreedForm';
import RequestForm from './RequestForm';
import { Routes, Route } from 'react-router-dom';

const TypeBreed = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="form" element={<TypeBreedForm />} />
      <Route path="form/request" element={<RequestForm />} /> 
    </Routes>
  );
}

export default TypeBreed



