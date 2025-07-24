import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import NavBar from "../../Shared/NavBar";
import Livestockproduce from "./Livestockproduce";
import Meat from "./Meat";
import Productionrecords from "./Productionrecords";
import { PRODUCTION_ROUTES } from "./Production.Route";


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

<Route path={PRODUCTION_ROUTES.LANDING} element={<LandingPage />} />
      <Route path={PRODUCTION_ROUTES. PRODUCTION_RECORDS} element={WithNavBar(Productionrecords)} />
      <Route path={PRODUCTION_ROUTES.PRODUCE} element={WithNavBar(Livestockproduce)} />
      <Route path={PRODUCTION_ROUTES.MEAT} element={WithNavBar(Meat)} />    
     
         
    </Routes> 
  )
}

export default Production
