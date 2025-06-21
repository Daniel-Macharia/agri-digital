
import { useNavigate } from "react-router-dom";
import ReusableLandingPage from "../../Shared/ReusableLandingPage";



const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <ReusableLandingPage
    title="Set Up Your First Housing Unit"
    text="Start by creating your first livestock housing unit"
    buttonText="Get Started"
    onButtonClick={() => navigate("ventilation")}
    />
  );
};

export default LandingPage;

