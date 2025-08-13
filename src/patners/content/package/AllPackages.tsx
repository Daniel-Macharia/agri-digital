import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';


const AllPackages: React.FC = () => {
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

  const packages = [

    {
      title: 'Advertisement Package',
      description: 'Perfect for getting started with basic farm management',
      price: 'From KES 2000',
      period: '/Per AD',
      features: [
        'High visibility placements',
        'Targeted audience reach',
        'Performance analytics',
        'Custom ad designs',
        'Flexible duration options',
      ],
      buttonText: 'Create Advert',
      buttonVariant: 'light-green',
    },
    {
      title: 'Incentive Packages',
      description: 'Reward your customers with exciting incentives and boost engagement.',
      price: 'From KES 2000',
      period: '/month',
      features: [
        'Digital reward cards',
        'Customizable incentive programs',
        'Performance tracking',
        'Easy distribution',
        'Customer analytics',
      ],
      buttonText: 'Get Incentive',
      buttonVariant: 'light-green',
    },
    {
      title: 'SMS Package',
      description: 'Send bulk SMS messages to your customers with our reliable SMS service.',
      price: 'From KES 5000',
      period: '/month',
      features: [
        'High delivery rate',
        'Customizable sender ID',
        'Detailed delivery reports',
        'Schedule messages',
        'Lorem Ipsum',
      ],
      buttonText: 'Buy Package',
      buttonVariant: 'light-green',
    },
  ];

  return (
    <div className="p-3 bg-light">
    <Alert 
  className="d-flex justify-content-between align-items-center custom-alert"
>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" 
         className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" 
         viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    Please note: Advertisement packages require approval. You'll need to submit your advert details for verification before activation.
  </div>
  <Button variant="outline-dark" size="sm" onClick={() => navigate('/farmer/package/advertisements')}>Create Now</Button>
</Alert>


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
        {packages.map((pkg, index) => (
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
                <Button variant={pkg.buttonVariant} className="mt-auto" style={{ backgroundColor: '#e0f8e0', color: '#457900', border: 'none' }}
                  onClick={pkg.buttonText === 'Create Advert' ? () => navigate('/farmer/package/advertisements') : undefined}
                >
                  {pkg.buttonText}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

       {/* Floating Action Buttons - You might need custom CSS for positioning */}
       <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button variant="success" className="rounded-circle" style={{ width: '50px', height: '50px', backgroundColor: '#457900' }}>
                {/* Placeholder for icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-cash" viewBox="0 0 16 16">
                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
                </svg>
            </Button>
            <Button variant="light" className="rounded-circle border" style={{ width: '50px', height: '50px' }}>
                {/* Placeholder for icon */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#457900" className="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.93 17.93 0 0 0 4.168 6.608 17.93 17.93 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
                </svg>
            </Button>
        </div>
    </div>
  );
};

export default AllPackages;