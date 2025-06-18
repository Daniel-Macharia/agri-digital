import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" fill="green" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439 5.53 7.47a.75.75 0 0 0-1.06 1.06l2.5 2.5z"/>
</svg>
);



const RequestSuccessful: React.FC = () => {
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
            Request Successfull
          </Card.Title>
          <Card.Text className="mb-4 text-muted body-medium">
           Your request was successfull. You can track the progress. 
          </Card.Text>
          <Button 
            variant="success" 
            className="body-bold"
            size="lg" 
            style={{ backgroundColor: '#457900', borderColor: '#457900', padding: '0.75rem 1.5rem' }}
          >
            Done
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RequestSuccessful;
