
import { useNavigate } from "react-router-dom";
import ReusableLandingPage from "../../Shared/ReusableLandingPage";



const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <ReusableLandingPage
    title="Health Management"
    text="Track and manage your livestock's health"
    buttonText="Get Started"
    onButtonClick={() => navigate("diseases")}
    />
  );
};

export default LandingPage;

