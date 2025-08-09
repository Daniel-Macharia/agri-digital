import React, { useState } from 'react';
import { Table, Button, Form, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const ads = [
  {
    image: '/assets/images/home/avatar.svg',
    title: 'Lorem ipsum dolor sit amet',
    audience: 'Poultry Farmer',
    status: 'Live',
    statusColor: '#26a65b',
    statusBg: '#e0f8e0',
    date: '2025/05/20',
    duration: '10 Days',
    action: 'View More',
  },
  {
    image: '/assets/images/home/cow_home.svg',
    title: 'Lorem ipsum dolor sit amet',
    audience: 'Poultry Farmer',
    status: 'Awaiting Payment',
    statusColor: '#2966ff',
    statusBg: '#e1eeff',
    date: '2025/05/20',
    duration: '10 Days',
    action: 'View More',
  },
  {
    image: '/assets/images/home/home_livestock_article.svg',
    title: 'Lorem ipsum dolor sit amet',
    audience: 'Poultry Farmer',
    status: 'Rejected',
    statusColor: '#f25c5e',
    statusBg: '#fff1e9',
    date: '2025/05/20',
    duration: '10 Days',
    action: 'View More',
  },
  {
    image: '/assets/images/home/tomatoes_home.svg',
    title: 'Lorem ipsum dolor sit amet',
    audience: 'Poultry Farmer',
    status: 'Live',
    statusColor: '#26a65b',
    statusBg: '#e0f8e0',
    date: '2025/05/20',
    duration: '10 Days',
    action: 'View More',
  },
  {
    image: '/assets/images/home/seeds_marketplace_home.svg',
    title: 'Lorem ipsum dolor sit amet',
    audience: 'Poultry Farmer',
    status: 'Awaiting Approval',
    statusColor: '#f8c813',
    statusBg: '#fff5d1',
    date: '2025/05/20',
    duration: '10 Days',
    action: 'View More',
  },
  {
    image: '/assets/images/home/manure_marketplace_home.svg',
    title: 'Lorem ipsum dolor sit amet',
    audience: 'Poultry Farmer',
    status: 'Rejected',
    statusColor: '#f25c5e',
    statusBg: '#fff1e9',
    date: '2025/05/20',
    duration: '10 Days',
    action: 'View More',
  },
];

const statusStyle = (color: string, bg: string) => ({
  backgroundColor: bg,
  color,
  borderRadius: 20,
  padding: '2px 18px',
  fontWeight: 500,
  fontSize: 14,
  display: 'inline-block',
});

const MyAds: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/subscribed')) return 'subscribed-packages';
    if (path.includes('/myads')) return 'my-advertisements';
    return 'all-packages';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const handleTabClick = (tabKey: string | null) => {
    if (!tabKey) return;
    setActiveTab(tabKey);
    switch (tabKey) {
      case 'all-packages':
        navigate('/farmer/package');
        break;
      case 'subscribed-packages':
        navigate('/farmer/package/subscribed');
        break;
      case 'my-advertisements':
        navigate('/farmer/package/myads');
        break;
    }
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold mb-0">My Advertisements</h5>
        <Button 
          style={{ background: '#457900', border: 'none', borderRadius: 8, padding: '8px 28px', fontWeight: 600 }}
          onClick={() => navigate('/farmer/package/advertisements')}
        >
          Create New AD
        </Button>
      </div>
      
      {/* Navigation Tabs */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <Nav variant="pills" activeKey={activeTab} onSelect={handleTabClick}>
          <Nav.Item>
            <Nav.Link eventKey="all-packages" style={activeTab === 'all-packages' ? { backgroundColor: '#457900', color: 'white' } : { color: 'black', backgroundColor: 'transparent' }}>All Packages</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="subscribed-packages" style={activeTab === 'subscribed-packages' ? { backgroundColor: '#457900', color: 'white' } : { color: 'black', backgroundColor: 'transparent' }}>Subscribed Packages</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my-advertisements" style={activeTab === 'my-advertisements' ? { backgroundColor: '#457900', color: 'white' } : { color: 'black', backgroundColor: 'transparent' }}>My Advertisements</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="d-flex align-items-center">
          <Form.Control type="search" placeholder="Search" className="me-2" />
          <Button variant="outline-secondary">Filter</Button>
        </div>
      </div>

      <div className="d-flex mb-3 gap-2">
        <Form.Control type="search" placeholder="Search" style={{ maxWidth: 220 }} />
        <Button variant="outline-secondary" style={{ borderRadius: 8, fontWeight: 500, background: '#fff' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#457900" className="me-2" viewBox="0 0 16 16"><path d="M6.5 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 1a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm3.354-2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708z"/></svg>
          Filter
        </Button>
      </div>

      <div className="bg-white rounded-4 p-3 shadow-sm">
        <Table responsive borderless hover className="align-middle mb-0">
          <thead style={{ background: '#f5f5f5' }}>
            <tr style={{ fontWeight: 600, color: '#333', fontSize: 15 }}>
              <th>Image</th>
              <th>Advert Title</th>
              <th>Target Audience</th>
              <th>Status</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #ececec' }}>
                <td>
                  <img src={ad.image} alt="ad" style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }} />
                </td>
                <td style={{ fontWeight: 500, color: '#333' }}>{ad.title}</td>
                <td style={{ color: '#777' }}>{ad.audience}</td>
                <td>
                  <span style={statusStyle(ad.statusColor, ad.statusBg)}>{ad.status}</span>
                </td>
                <td style={{ color: '#777' }}>{ad.date}</td>
                <td style={{ color: '#777' }}>{ad.duration}</td>
                <td>
                  <a href="#" style={{ color: '#457900', fontWeight: 500, textDecoration: 'none' }}>View More</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyAds;
