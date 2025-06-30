
import './NavBar.css';

const navItems = [
  {
    label: 'Type & Breed',
    img: '/assets/images/group.svg',
    active: true,
  },
  {
    label: 'Housing',
    img: '/assets/images/home.svg',
  },
  {
    label: 'Feeding',
    img: '/assets/images/package.svg',
  },
  {
    label: 'Health Management',
    img: '/assets/images/quality_score.svg',
  },
  {
    label: 'Breeding',
    img: '/assets/images/journey.svg',
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
  return (
    <div className="livestock-navbar">
      {navItems.map((item, idx) => (
        <div key={item.label} className="nav-item">
          <div
            className={`nav-img-circle${item.active ? ' active' : ''}`}
          >
            <img src={item.img} alt={item.label} className="nav-img" />
          </div>
          <div
            className={`nav-label${item.active ? ' active' : ''}`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavBar;