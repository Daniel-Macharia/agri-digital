import { useNavigate } from "react-router-dom";
import ReusableLandingPage from "../../Shared/ReusableLandingPage";
import NavBar from '../../Shared/NavBar';



const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <NavBar />
      <ReusableLandingPage
        title="Set Up Your First Housing Unit"
        text="Start by creating your first livestock housing unit"
        buttonText="Get Started"
        onButtonClick={() => navigate("ventilation")}
      />
    </>
  );
};

export default LandingPage;
  
