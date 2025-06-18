import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="73" height="73" viewBox="0 0 73 73" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M70.4892 49.8795C70.4892 62.5869 63.0009 70.0751 50.2936 70.0751H22.6421C9.90233 70.0751 2.41406 62.5869 2.41406 49.8795V22.1956C2.41406 9.48826 7.08207 2 19.7894 2H26.8887C29.4395 2 31.8415 3.20099 33.372 5.24167L36.6137 9.5531C38.1476 11.5898 40.5474 12.7897 43.097 12.7948H53.1462C65.886 12.7948 70.5864 19.2781 70.5864 32.2448L70.4892 49.8795Z" stroke="#333333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.4023 45.3728H53.4723" stroke="#333333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

interface LandingPageProps {
  title: string;
  text: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ title, text }) => {
  return (
    <Container 
      fluid 
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <Card 
        className="text-center p-4 shadow-sm"
        style={{ width: '25rem', border: 'none', borderRadius: '1rem' }}
      >
        <Card.Body>
          <div className="mb-4">
            <FolderIcon />
          </div>
          <Card.Title as="h3" className="mb-3 fw-semibold">
            {title}
          </Card.Title>
          <Card.Text className="mb-4 text-muted body-medium">
            {text}
          </Card.Text>
          <Button 
            variant="success" 
            className="body-bold"
            size="lg" 
            style={{ backgroundColor: '#457900', borderColor: '#457900', padding: '0.75rem 1.5rem' }}
          >
            Get Started
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LandingPage;
