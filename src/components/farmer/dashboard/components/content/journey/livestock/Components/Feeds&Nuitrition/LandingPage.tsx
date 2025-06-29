import { useNavigate } from 'react-router-dom';
import ReusableLandingPage from '../../Shared/ReusableLandingPage';
import NavBar from '../../Shared/NavBar';



const FeedingLandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('feeds'); 
  };

  return (
    <>
      <NavBar />
      <ReusableLandingPage
        title="No Records Yet"
        text="Start by registering your livestock."
        buttonText="Get Started"
        onButtonClick={handleGetStarted}
      />
    </>
  );
};

export default FeedingLandingPage;