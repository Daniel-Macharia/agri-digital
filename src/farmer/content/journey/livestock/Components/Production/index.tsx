import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import NavBar from "../../Shared/NavBar";
import Livestockproduce from "./Livestockproduce";
import Meat from "./Meat";
import Productionrecords from "./Productionrecords";


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

// Helper to wrap pages with NavBar
const WithNavBar = (Component: React.FC) => (   
  <>
    <NavBar navItems={navItems} />
    <Component />
  </>
);  

const Production = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="produce" element={WithNavBar(Livestockproduce)} />
      <Route path="meat" element={WithNavBar(Meat)} />
      <Route path="production-records" element={WithNavBar(Productionrecords)} />      
    </Routes> 
  )
}

export default Production
