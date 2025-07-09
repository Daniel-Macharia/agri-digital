import { useNavigate } from "react-router-dom";
import ReusableLandingPage from "../../Shared/ReusableLandingPage";
import NavBar from '../../Shared/NavBar';



const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <NavBar />
      <ReusableLandingPage
        title="No Records Yet"
        text="Start by registering your first livestock production"
        buttonText="Get Started"
        onButtonClick={() => navigate("produce")}
      />
    </>
  );
};

export default LandingPage;
  
