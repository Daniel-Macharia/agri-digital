import React from 'react';
import { Modal, Button } from 'react-bootstrap';


interface AdvertisementCard {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  isVideo?: boolean;
}

interface PopupProps {
  show: boolean;
  onHide: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onHide }) => {
  const advertisements: AdvertisementCard[] = [
    {
      id: 1,
      title: "Farming Equipment Sale",
      content: "Content of the advert",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Farming Equipment Sale",
      content: "Content of the advert",
      imageUrl: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Farming Equipment Sale",
      content: "Content of the advert",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Farming Equipment Sale",
      content: "Content of the advert",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Farming Equipment Sale",
      content: "Content of the advert",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop",
      isVideo: true
    }
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="advertisement-popup"
    >
      <Modal.Header closeButton>
        <Modal.Title>Featured Advertisements</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#e8f5e8', padding: '20px' }}>
        <div className="row g-3">
          {advertisements.map((ad) => (
            <div key={ad.id} className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm" style={{ borderRadius: '12px', border: 'none' }}>
                <div className="position-relative">
                  <img
                    src={ad.imageUrl}
                    className="card-img-top"
                    alt={ad.title}
                    style={{ 
                      height: '150px', 
                      objectFit: 'cover',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px'
                    }}
                  />
                  {ad.isVideo && (
                    <div 
                      className="position-absolute top-0 end-0 m-2"
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#28a745',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="bi bi-play-fill text-white" style={{ fontSize: '12px' }}></i>
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 
                    className="card-title mb-2"
                    style={{ 
                      color: '#2d5a2d', 
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    {ad.title}
                  </h6>
                  <p 
                    className="card-text flex-grow-1"
                    style={{ 
                      color: '#6c757d', 
                      fontSize: '12px',
                      marginBottom: '10px'
                    }}
                  >
                    {ad.content}
                  </p>
                  <button 
                    className="btn btn-link p-0 text-decoration-none"
                    style={{ 
                      color: '#28a745', 
                      fontSize: '13px',
                      fontWeight: '500',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
