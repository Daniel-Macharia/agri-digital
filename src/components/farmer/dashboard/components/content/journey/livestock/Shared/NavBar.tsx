import { useLocation, useNavigate } from 'react-router-dom';

type NavItem = {
  label: string;
  img: string;
  path: string;
};

type NavBarProps = {
  navItems: NavItem[]; 
};

const NavBar: React.FC<NavBarProps> = ({ navItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the current subpath after /livestock/
  const match = location.pathname.match(/livestock\/(\w+)/);
  const current = match ? match[1] : '';

  return (
    <div className="d-flex flex-row align-items-center justify-content-between rounded-4 px-4 py-3 gap-3 overflow-auto my-3" style={{ backgroundColor: '#FFF' }}>
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
            <small className={`small-bold ${isActive ? 'text-success fw-bold' : 'text-dark'}`}>
              {item.label}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
