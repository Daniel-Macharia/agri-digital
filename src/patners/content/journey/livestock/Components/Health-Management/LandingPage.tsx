import { useNavigate } from "react-router-dom";
import ReusableLandingPage from "../../Shared/ReusableLandingPage";
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
  const navigate = useNavigate()
  return (
    <>
      <NavBar navItems={navItems} />
      <ReusableLandingPage
        title="Health Management"
        text="Track and manage your livestock's health"
        buttonText="Get Started"
        onButtonClick={() => navigate("diseases")}
      />
    </>
  );
};

export default LandingPage;

