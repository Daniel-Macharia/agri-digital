import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Nav, Form, Button, Row, Col } from 'react-bootstrap';

const Subscribed: React.FC = () => {
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

  const subscribedPackages = [
    {
      title: 'Business',
      price: 'KES 9000',
      period: '/month',
      description: '2000 messages',
      features: [
        'Priority sending',
        'Advanced delivery reports',
        'Schedule messages',
        'Valid for 60 days',
        'Flexible duration options',
      ],
    },
    {
      title: 'Premium Rewards',
      price: 'KES 9000',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Custom reward programs',
        'Advanced analytics',
        'SMS & email notifications',
        'Up to 500 customers',
        'Customer segmentation',
        'Program templates',
      ],
    },
  ];

  return (
    <div className="p-3 bg-light">
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
      <Row>
        {subscribedPackages.map((pkg, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{pkg.title}</Card.Title>
                <Card.Text className="text-muted">{pkg.description}</Card.Text>
                <div className="my-3">
                  <span className="h4">{pkg.price}</span>
                  <span className="text-muted">{pkg.period}</span>
                </div>
                <ul className="list-unstyled">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="d-flex align-items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline-danger" className="mt-auto" style={{ borderColor: '#f25c5e', color: '#f25c5e' }}>
                  Unsubscribe
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Subscribed;
