import LandingPage from './LandingPage';
<<<<<<< HEAD
import TypeBreedForm from './TypeBreedForm';
import RequestForm from './RequestForm';
import { Routes, Route } from 'react-router-dom';
=======
import RequestForm from './RequestForm';
import { Routes, Route } from 'react-router-dom';
import TypeBreedForm from './TypeBreedForm';
import NavBar from './NavBar';
import LivestockRecord from './LivestockRecord';

// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => {
  return (
    <>
      <NavBar />
      <Component />
    </>
  );
};
>>>>>>> bill

const TypeBreed = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
<<<<<<< HEAD
      <Route path="form" element={<TypeBreedForm />} />
      <Route path="form/request" element={<RequestForm />} /> 
    </Routes>
  );
}

export default TypeBreed



=======
      <Route path="form" element={WithNavBar(TypeBreedForm)} />
      <Route path="form/request" element={<RequestForm />} />
      <Route path="form/records" element={<LivestockRecord />} />
      
    </Routes>
  );
};

export default TypeBreed;
>>>>>>> bill
