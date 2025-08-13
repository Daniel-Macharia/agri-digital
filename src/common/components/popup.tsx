import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Popup: React.FC = () => {
  const cardData = [
    { title: 'Farming Equipment Sale', content: 'Content of the advert', imageUrl: 'https://picsum.photos/150/150?random=1' },
    { title: 'Farming Equipment Sale', content: 'Content of the advert', imageUrl: 'https://picsum.photos/150/150?random=2' },
    { title: 'Farming Equipment Sale', content: 'Content of the advert', imageUrl: 'https://picsum.photos/150/150?random=3' },
    { title: 'Farming Equipment Sale', content: 'Content of the advert', imageUrl: 'https://picsum.photos/150/150?random=4' },
    { title: 'Farming Equipment Sale', content: 'Content of the advert', imageUrl: 'https://picsum.photos/150/150?random=5' },
  ];

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#e0f2e0',
    padding: '20px',
    display: 'flex',
    overflowX: 'auto',
    alignItems: 'center',
    msOverflowStyle: 'none',  
    scrollbarWidth: 'none', 
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#f0fff0',
    border: '1px solid #ccc',
    borderRadius: '15px',
    minWidth: '300px',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'row'
  };

  const imageStyle: React.CSSProperties = {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '15px 0 0 15px'
  }

  const linkStyle: React.CSSProperties = {
      color: 'green',
      textDecoration: 'none',
      fontWeight: 'bold'
  }

  return (
    <div style={containerStyle}>
      {cardData.map((card, index) => (
        <Card key={index} style={cardStyle}>
            <Card.Img style={imageStyle} variant="left" src={card.imageUrl} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.content}</Card.Text>
              <a href="#" style={linkStyle}>Register Now</a>
            </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Popup;
