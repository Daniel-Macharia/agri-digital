
import FeedsForm from './Feeds';
import LandingPage from './LandingPage';

import { Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';

import FeedingWeight from './Weight';
import FeedingSchedule from './FeedingSchedule';
import RequestForm from './RequestForm';
import Results from './Results';


// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => (
  <>
    <NavBar />
    <Component />
  </>
); 

const FeedsNutrition = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="feeds" element={WithNavBar(FeedsForm)} />      
      <Route path="weight" element={WithNavBar(FeedingWeight)} />
      <Route path="schedule" element={WithNavBar(FeedingSchedule)} />
      <Route path="form" element={WithNavBar(RequestForm)} />   
      <Route path="results" element={<Results />}  />  
    </Routes>
  );
}

export default FeedsNutrition


