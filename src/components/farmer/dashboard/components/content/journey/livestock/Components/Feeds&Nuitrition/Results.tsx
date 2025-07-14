
import NavBar from '../../Shared/NavBar';
import FeedingStock from './FeedingStock';
import WeightandFeedingSchedule from './WeightandFeedingSchedule';
import Activities from './Activities';


const navItems = [
  {
    label: 'Type & Breed',
    img: '/assets/images/livestockmenu/One Cow.svg',   
    path: '/farmer/projects/livestock/typebreed',
  },
  {
    label: 'Housing',
    img: '/assets/images/livestockmenu/cow shed.svg',
    path: '/farmer/projects/livestock/housing',
  },
  {
    label: 'Feeding',
    img: '/assets/images/livestockmenu/cow feed.svg',
    path: '/farmer/projects/livestock/feeds',
  },  
  {
    label: 'Health Management',
    img: '/assets/images/livestockmenu/cow with black vet.svg',
    path: '/farmer/projects/livestock/health',
  },
  {
    label: 'Breeding',
    img: '/assets/images/livestockmenu/cow breeding.svg',
    path: '/farmer/projects/livestock/breeding',
  },
  {
    label: 'Production',
    img: '/assets/images/livestockmenu/sale.svg',
    path: '/farmer/projects/livestock/production',

  },
  {
    label: 'Sales',
    img: '/assets/images/livestockmenu/milk from a cow.svg', 
    path: '/farmer/projects/livestock/sales',
  },
];


const Results = () => {
  // Placeholder data for tables
  const feedStockData = Array(8).fill({
    feedName: 'Lorem Ipsum',
    feedType: 'Lorem Ipsum',
    feedVariety: 'Lorem Ipsum',
    feedWeight: 'Lorem Ipsum',
    quantity: 'Lorem Ipsum',
    date: 'Lorem Ipsum',
    status: 'Lorem Ipsum',
  });
  const livestockData = [
    { id: 1, name: 'J. Smith' },
    { id: 2, name: 'J. Alex' },
    { id: 3, name: 'J. Alex' },
    { id: 4, name: 'J. Alex' },
    { id: 5, name: 'J. Alex' },
    { id: 6, name: 'J. Alex' },
    { id: 7, name: 'J. Alex' },
    { id: 8, name: 'J. Alex' },
  ];

  return (

    <>

    <NavBar navItems={navItems}/>


     <div className="container-fluid py-4 px-0">    
      <FeedingStock />  
      <WeightandFeedingSchedule /> 
      <Activities />
    </div>
    </>
   
  );
};

export default Results;