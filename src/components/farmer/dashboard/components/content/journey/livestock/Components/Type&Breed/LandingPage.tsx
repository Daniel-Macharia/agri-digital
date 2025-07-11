import ReusableLandingPage from "../../Shared/ReusableLandingPage";
import { useNavigate } from "react-router-dom";
import NavBar from '../../Shared/NavBar';

const navItems = [
  {
    label: 'Type & Breed',
    img: '/assets/images/livestockmenu/One Cow.svg',   
    path: 'typebreed',
  },
  {
    label: 'Housing',
    img: '/assets/images/livestockmenu/cow shed.svg',
    path: 'housing',
  },
  {
    label: 'Feeding',
    img: '/assets/images/livestockmenu/cow feed.svg',
    path: 'feeds',
  },  
  {
    label: 'Health Management',
    img: '/assets/images/livestockmenu/cow with black vet.svg',
    path: 'health',
  },
  {
    label: 'Breeding',
    img: '/assets/images/livestockmenu/cow breeding.svg',
    path: 'breeding',
  },
  {
    label: 'Production',
    img: '/assets/images/livestockmenu/sale.svg',
    path: 'production',

  },
  {
    label: 'Sales',
    img: '/assets/images/livestockmenu/milk from a cow.svg', 
    path: 'sales',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navItems={navItems} />
      <ReusableLandingPage
        title="No Records Yet"
        text="Start by registering your first livestock"
        buttonText="Register Livestock"
        onButtonClick={() => navigate("form")}
      />
    </>
  );
};

export default LandingPage;