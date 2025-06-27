import { useNavigate } from 'react-router-dom';
import ReusableLandingPage from '../../Shared/ReusableLandingPage';



const FeedingLandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('feeds'); 
  };

  return (
    <ReusableLandingPage
      title="No Records Yet"
      text="Start by registering your livestock."
      buttonText="Get Started"
      onButtonClick={handleGetStarted}
    />
  );
};

export default FeedingLandingPage;