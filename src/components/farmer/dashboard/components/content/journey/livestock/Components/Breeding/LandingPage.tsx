import { useNavigate } from 'react-router-dom';
import ReusableLandingPage from '../../Shared/ReusableLandingPage';



const FeedingLandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('erus'); 
  };

  return (
    <ReusableLandingPage
      title="Breeding & Reproduction"
      text="Track and manage your livestock's nutrition easily."
      buttonText="Get Started"
      onButtonClick={handleGetStarted}
    />
  );
};

export default FeedingLandingPage;