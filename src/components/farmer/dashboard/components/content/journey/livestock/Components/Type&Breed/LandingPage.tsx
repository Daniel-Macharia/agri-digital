import ReusableLandingPage from "../../Shared/ReusableLandingPage";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <ReusableLandingPage
      title="No Records Yet"
      text="Start by registering your first livestock"
      buttonText="Register Livestock"
      onButtonClick={() => navigate("form")}
    />
  );
};

export default LandingPage;