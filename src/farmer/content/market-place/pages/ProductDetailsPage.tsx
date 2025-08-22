import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailsPageProps {
  products?: Product[];
}

// Mock product data 
const mockProducts: Product[] = [
  { id: 1, name: 'Bulls', seller: 'Peter Bloom', price: 80000, unit: 'per Bull', rating: 4, image: 'https://images.unsplash.com/photo-1516640000-9951e17c051d?w=600&auto=format&fit=crop', category: 'livestock' },
  { id: 2, name: 'Planting Laborer', seller: 'Peter Bloom', price: 250, unit: 'per hr', rating: 4, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'services' },
  { id: 3, name: 'Tractor Rental', seller: 'Peter Bloom', price: 2500, unit: 'per day', rating: 4, image: 'https://images.unsplash.com/photo-1429991889170-afd56b2a1210?w=600&auto=format&fit=crop', category: 'equipment' },
  { id: 4, name: 'Fresh Carrots', seller: 'Mary Garden', price: 180, unit: 'per kg', rating: 5, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop', category: 'vegetables' },
  { id: 5, name: 'Organic Tomatoes', seller: 'AgriFarmers', price: 150, unit: 'per kg', rating: 4, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop', category: 'vegetables' },
];

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ products = mockProducts }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showNegotiateModal, setShowNegotiateModal] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [negotiateMessage, setNegotiateMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setProposedPrice(foundProduct.price.toString());
      }
    }
  }, [id, products]);

  const handleProceedToPayment = () => {
    if (product) {
      // Navigate to checkout with this specific product
      navigate('/farmer/market-place/checkout', { 
        state: { 
          cartItems: [{ ...product, quantity: 1 }] 
        } 
      });
    }
  };

  const handleNegotiate = () => {
    setShowNegotiateModal(true);
  };

  const handleSubmitOffer = () => {
    // Handle offer submission logic here
    console.log('Offer submitted:', {
      productId: product?.id,
      proposedPrice,
      message: negotiateMessage
    });
    
    setShowNegotiateModal(false);
    setAlertMessage('Your offer has been submitted successfully!');
    setShowAlert(true);
    
    // Auto-hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleQualityScoreClick = () => {
    navigate('/farmer/projects');
  };

  const getProductDescription = (productName: string) => {
    const descriptions: { [key: string]: string } = {
      'Organic Tomatoes': 'Our tomatoes are cultivated without synthetic fertilizers or pesticides, ensuring a healthy and natural taste. Perfect for salads, sauces, and everyday cooking. Enjoy farm-fresh quality straight from our fields to your table.',
      'Bulls': 'High-quality breeding bulls with excellent genetics. Perfect for improving herd quality and livestock breeding programs.',
      'Planting Laborer': 'Experienced agricultural workers skilled in planting, cultivation, and farm maintenance services.',
      'Tractor Rental': 'Well-maintained tractors available for daily rental. Includes operator and fuel for efficient farm operations.',
      'Fresh Carrots': 'Crisp, sweet carrots harvested fresh from our organic farms. Rich in vitamins and perfect for cooking.',
      'default': 'High-quality agricultural product sourced from trusted local farmers. Perfect for your farming and agricultural needs.'
    };
    return descriptions[productName] || descriptions['default'];
  };

  if (!product) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '100vh', backgroundColor: '#EEEEEE' }}>
        <h3>Product not found</h3>
        <Button variant="primary" onClick={handleBack}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#EEEEEE', minHeight: '100vh' }}>
      <Container fluid className="py-3" style={{backgroundColor: '#EEEEEE'}}>
        {/* Alert for successful offer submission */}
        {showAlert && (
          <Alert variant="success" className="position-fixed" style={{ top: '20px', right: '20px', zIndex: 1050 }}>
            {alertMessage}
          </Alert>
        )}

        {/* Header */}
        <Row className="mb-3">
          <Col xs={12}>
            <Button 
              variant="link" 
              className="text-dark text-decoration-none p-0 d-flex align-items-center mb-2"
              onClick={handleBack}
            >
              <FiArrowLeft size={20} className="me-2" />
              Back
            </Button>
          </Col>
        </Row>

        {/* Product Details */}
        <Row>
          <Col xs={12}>
            <Card className="border-0 shadow-sm">
              {/* Product Image */}
              <div className="position-relative" style={{ height: '300px', overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x300?text=No+Image';
                  }}
                />
              </div>

              <Card.Body className="p-4">
                {/* Product Title and Seller */}
                <div className="mb-3">
                  <h2 className="fw-bold mb-1 text-start">{product.name}</h2>
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          size={16} 
                          fill={i < product.rating ? '#ffc107' : 'none'} 
                          color="#ffc107"
                        />
                      ))}
                    </div>
                    <span className="text-muted">{/*({product.rating}/5)*/}</span>
                  </div>
                  <p className="text-muted mb-0 text-start">Sold by {product.seller}</p>
                </div>

                {/* Details Section */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Details</h5>
                    <span 
                      className="text-primary small quality-score-link"
                      onClick={handleQualityScoreClick}
                      style={{ cursor: 'pointer' }}
                    >
                      Check Cop Quality Score
                    </span>
                  </div>
                  <p className="text-muted mb-0 text-start">
                    {getProductDescription(product.name)}
                  </p>
                </div>

                {/* Pricing Section */}
                <div className="mb-4 pb-0">
                  <h5 className="mb-2 pb-1 text-start">Pricing</h5>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="fs-3 fw-bold text-success">
                      KES {product.price.toLocaleString()}
                    </span>
                    <span className="text-muted">{product.unit}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Button 
                      variant="success" 
                      size="lg" 
                      className="w-100 fw-semibold"
                      onClick={handleProceedToPayment}
                      style={{ backgroundColor: '#556B2F', borderColor: '#556B2F' }}
                    >
                      Purchase Now
                    </Button>
                  </Col>
                  <Col xs={12} md={6}>
                    <Button 
                      variant="outline-warning" 
                      size="lg" 
                      className="w-100 fw-semibold"
                      onClick={handleNegotiate}
                    >
                      Negotiate
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Negotiate Modal */}
        <Modal show={showNegotiateModal} onHide={() => setShowNegotiateModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Make an Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col xs={4}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                />
              </Col>
              <Col xs={8}>
                <h6 className="mb-1">{product.name}</h6>
                <p className="text-muted small mb-1">Sold by {product.seller}</p>
                <p className="small mb-0">
                  <strong>Current price: KES {product.price.toLocaleString()}</strong> {product.unit}
                </p>
              </Col>
            </Row>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Proposed Price</Form.Label>
                <Form.Control 
                  type="text" 
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  placeholder="KES 120 PER KG"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={negotiateMessage}
                  onChange={(e) => setNegotiateMessage(e.target.value)}
                  placeholder="Make your offer to the seller..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="success" 
              onClick={handleSubmitOffer}
              className="w-100"
              style={{ backgroundColor: '#556B2F', borderColor: '#556B2F' }}
            >
              Submit Offer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <style>{`
        .btn-success:hover {
          background-color: #4a5d2a !important;
          border-color: #4a5d2a !important;
        }
        
        .quality-score-link:hover {
          color: #556B2F !important;
        }
        
        @media (max-width: 768px) {
          .fs-3 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;