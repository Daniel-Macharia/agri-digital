import { useNavigate } from 'react-router-dom';
import ReusableLandingPage from '../../Shared/ReusableLandingPage';
import NavBar from '../../Shared/NavBar';



const FeedingLandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('erus'); 
  };

  return (
    <>
      <NavBar />
      <ReusableLandingPage
        title="Breeding & Reproduction"
        text="Track and manage your livestock's nutrition easily."
        buttonText="Get Started"
        onButtonClick={handleGetStarted}
      />
    </>
  );
};

export default FeedingLandingPage;