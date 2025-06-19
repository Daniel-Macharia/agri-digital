import { useNavigate } from 'react-router-dom';
import LandingPage from '../ReusableLandingPage/ReusableLandingPage';


const FeedingLandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/feeds'); 
  };

  return (
    <LandingPage
      title="No Records Yet"
      text="Start by registering your livestock."
      buttonText="Get Started"
      onButtonClick={handleGetStarted}
    />
  );
};

export default FeedingLandingPage;