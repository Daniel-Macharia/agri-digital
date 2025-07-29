import FeedsForm from "./Feeds";
import LandingPage from "./LandingPage";

import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";

import FeedingWeight from "./Weight";
import FeedingSchedule from "./FeedingSchedule";
import RequestForm from "./RequestForm";
import Results from "./Results";
import { FEED_ROUTES } from "./Feeds.Route";

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
      <Route path={FEED_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={FEED_ROUTES.FEEDS} element={WithNavBar(FeedsForm)} />
      <Route path={FEED_ROUTES.WEIGHT} element={WithNavBar(FeedingWeight)} />
      <Route path={FEED_ROUTES.SCHEDULE} element={WithNavBar(FeedingSchedule)} />
      <Route path={FEED_ROUTES.FORM} element={WithNavBar(RequestForm)} />
      <Route path={FEED_ROUTES.RESULTS} element={<Results />} /> 

     
    </Routes>
  );
};

export default FeedsNutrition;
