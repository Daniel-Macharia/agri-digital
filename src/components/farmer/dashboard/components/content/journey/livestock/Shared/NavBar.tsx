import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    label: 'Type & Breed',
    img: '/assets/images/group.svg',

    
    path: 'typebreed',
  },
  {
    label: 'Housing',
    img: '/assets/images/home.svg',
    path: 'housing',
  },
  {
    label: 'Feeding',
    img: '/assets/images/package.svg',
    path: 'feeds',
  },
  {
    label: 'Health Management',
    img: '/assets/images/quality_score.svg',
    path: 'health',
  },
  {
    label: 'Breeding',
    img: '/assets/images/journey.svg',
    path: 'breeding',
  },
  {
    label: 'Production',
    img: '/assets/images/marketplace.svg',
  },
  {
    label: 'Sales',
    img: '/assets/images/success.svg',
  },
];

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the current subpath after /livestock/
  const match = location.pathname.match(/livestock\/(\w+)/);
  const current = match ? match[1] : '';

  return (
    <div className="d-flex flex-row align-items-center justify-content-between rounded-4 px-4 py-3 gap-3 overflow-auto bg-light my-3">
      {navItems.map((item) => {
        const isActive = current === item.path;
        return (
          <div
            key={item.label}
            className="d-flex flex-column align-items-center text-center min-w-80px"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`../${item.path}`)}
          >
            <div
              className={`d-flex justify-content-center align-items-center rounded-circle mb-1 ${isActive ? 'bg-success-subtle border border-success' : 'bg-secondary-subtle'} `}
              style={{ width: '56px', height: '56px' }}
            >
              <img src={item.img} alt={item.label} className="img-fluid" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
            </div>
            <small className={`fw-medium ${isActive ? 'text-success fw-bold' : 'text-dark'}`}>
              {item.label}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
