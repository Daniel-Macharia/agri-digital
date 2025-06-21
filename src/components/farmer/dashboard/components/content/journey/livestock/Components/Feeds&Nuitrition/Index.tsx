import LandingPage from './LandingPage';

import { Routes, Route } from 'react-router-dom';

const FeedsNutrition = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />

   
    </Routes>
  );
}

export default FeedsNutrition


