import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiArrowLeft, FiCheck, FiPackage, FiTruck, FiHome } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartItem } from '../components/ShoppingCartModal';

export interface Order {
    id: string;
    items: CartItem[];
    totalAmount: number;
    orderDate: string;
    deliveryAddress: string;
    status: 'Processing' | 'In Transit' | 'Delivered' | 'Confirmed';
    trackingNumber: string;
    seller?: string;
    deliveryMethod?: string;
    paymentMethod?: string;
}

const TrackOrderPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialOrder = location.state?.order as Order;
    const [order, setOrder] = useState<Order>(initialOrder);
    
    // State to track which steps are checked (radio button behavior)
    const [checkedSteps, setCheckedSteps] = useState({
        confirmed: true,
        processing: true,
        inTransit: false,
        delivered: false
    });

    if (!order) {
        return (
            <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                {/* Back button at extreme left margin - for no order condition */}
                <div className="pt-3" style={{ paddingLeft: '15px' }}>
                    <Button 
                        variant="link" 
                        onClick={() => navigate(-1)} 
                        className="text-dark mb-3 p-0 d-flex align-items-center" 
                        style={{ textDecoration: 'none' }}
                    >
                        <FiArrowLeft className="me-2" /> Back
                    </Button>
                </div>
                <Container style={{paddingLeft: '100px'}}>
                    <div className="text-center py-5">
                        <h4>Order Not Found</h4>
                        <p className="text-muted">It seems you navigated to this page directly without an order. Please go back to the marketplace and try again.</p>
                        <Button variant="primary" onClick={() => navigate('../')}>
                            Go to Marketplace
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    const getStatusIcon = (stepStatus: string, isChecked: boolean) => {
        if (isChecked) {
            return (
                <div 
                    className="bg-success rounded-circle d-flex align-items-center justify-content-center" 
                    style={{ 
                        width: '32px', 
                        height: '32px',
                        cursor: stepStatus === 'Delivered' ? 'default' : 'pointer'
                    }}
                    onClick={() => stepStatus !== 'Delivered' && handleStepClick(stepStatus)}
                >
                    <FiCheck size={16} color="white" />
                </div>
            );
        }
        return (
            <div 
                className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center bg-white" 
                style={{ 
                    width: '32px', 
                    height: '32px', 
                    cursor: stepStatus === 'Delivered' ? 'default' : 'pointer'
                }}
                onClick={() => stepStatus !== 'Delivered' && handleStepClick(stepStatus)}
            >
                {stepStatus === 'Processing' && <FiPackage size={16} color="#6c757d" />}
                {stepStatus === 'In Transit' && <FiTruck size={16} color="#6c757d" />}
                {stepStatus === 'Delivered' && <FiHome size={16} color="#6c757d" />}
            </div>
        );
    };

    const handleStepClick = (stepStatus: string) => {
        // Only allow clicking on In Transit and Delivered steps
        if (stepStatus === 'In Transit') {
            setCheckedSteps(prev => ({
                ...prev,
                inTransit: !prev.inTransit
            }));
        } else if (stepStatus === 'Delivered') {
            setCheckedSteps(prev => ({
                ...prev,
                delivered: !prev.delivered
            }));
        }
    };

    const getConnectorColor = (fromChecked: boolean, toChecked: boolean) => {
        return fromChecked && toChecked ? '#28a745' : '#dee2e6';
    };

    const handleConfirmDelivery = () => {
        // Mark delivered step as checked when button is clicked
        setCheckedSteps(prev => ({
            ...prev,
            delivered: true
        }));
        
        // Update order status to confirmed
        setOrder(prevOrder => ({
            ...prevOrder,
            status: 'Confirmed'
        }));
        alert('Order delivery confirmed successfully! Thank you for your purchase.');
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Back button at extreme left margin - for main content */}
            <div className="pt-3" style={{ paddingLeft: '15px' }}>
                <Button 
                    variant="link" 
                    onClick={() => navigate(-1)} 
                    className="text-dark mb-3 p-0 d-flex align-items-center" 
                    style={{ textDecoration: 'none' }}
                >
                    <FiArrowLeft className="me-2" /> Back
                </Button>
            </div>
            
            <Container>
                <Card className="mb-4 pt-0" style={{width:'100%'}}>
                    <Card.Body className="p-4" style={{width:'100%'}}>
                        <div className="mb-4">
                            <h4 className="text-success mb-0"></h4>
                        </div>
                        
                        {/* Order confirmed step */}
                        <div className="d-flex align-items-center mb-4">
                            <div className="d-flex align-items-center me-3 ">
                                <div 
                                    className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" 
                                    style={{ width: '32px', height: '32px' }}
                                >
                                    <FiCheck size={16} color="white" />
                                </div>
                                <div>
                                    <h6 className="mb-1 text-success">Order confirmed</h6>
                                    <p className="text-muted small mb-0">Your order has been confirmed</p>
                                </div>
                            </div>
                        </div>

                        {/* Connector line after order confirmed */}
                        <div className="d-flex mb-4">
                            <div style={{ width: '32px', display: 'flex', justifyContent: 'center' }}>
                                <div 
                                    className="bg-success" 
                                    style={{ width: '2px', height: '30px' }} 
                                />
                            </div>
                        </div>

                        {/* Processing step */}
                        <div className="d-flex align-items-center mb-4">
                            <div className="d-flex align-items-center me-3">
                                <div 
                                    className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" 
                                    style={{ width: '32px', height: '32px' }}
                                >
                                    <FiCheck size={16} color="white" />
                                </div>
                                <div>
                                    <h6 className="mb-1 text-success">Processing</h6>
                                    <p className="text-muted small mb-0">Seller is preparing your order</p>
                                </div>
                            </div>
                        </div>

                        {/* Connector line after processing */}
                        <div className="d-flex mb-4">
                            <div style={{ width: '32px', display: 'flex', justifyContent: 'center' }}>
                                <div 
                                    style={{ 
                                        width: '2px', 
                                        height: '30px',
                                        backgroundColor: getConnectorColor(checkedSteps.processing, checkedSteps.inTransit)
                                    }} 
                                />
                            </div>
                        </div>

                        {/* In Transit step */}
                        <div className="d-flex align-items-center mb-4">
                            <div className="d-flex align-items-center me-3">
                                {getStatusIcon('In Transit', checkedSteps.inTransit)}
                                <div className="ms-3">
                                    <h6 className={`mb-1 ${checkedSteps.inTransit ? 'text-success' : ''}`}>In Transit</h6>
                                    <p className="text-muted small mb-0">Your order is on the way</p>
                                    {checkedSteps.inTransit && (
                                        <div className="mt-2">
                                            <p className="text-muted small mb-1">📍 Current Location</p>
                                            <p className="text-muted small mb-1">⏰ Expected arrival by 10:30am today</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Connector line after in transit */}
                        <div className="d-flex mb-4">
                            <div style={{ width: '32px', display: 'flex', justifyContent: 'center' }}>
                                <div 
                                    style={{ 
                                        width: '2px', 
                                        height: '30px',
                                        backgroundColor: getConnectorColor(checkedSteps.inTransit, checkedSteps.delivered)
                                    }} 
                                />
                            </div>
                        </div>

                        {/* Delivered step */}
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                {getStatusIcon('Delivered', checkedSteps.delivered)}
                                <div className="ms-3">
                                    <h6 className={`mb-1 ${checkedSteps.delivered ? 'text-success' : ''}`}>Delivered</h6>
                                    <p className="text-muted small mb-0">Your order has been delivered</p>
                                </div>
                            </div>
                            <Button 
                                variant="outline-success" 
                                size="sm"
                                onClick={handleConfirmDelivery}
                                className="fw-bold py-2 text-start fit-content text-nowrap"
                                style={{ maxWidth: '150px' }}
                            >
                                Confirm Delivery
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="mb-4" style={{ width: '100%',}}>
                    <Card.Body className="p-4" style={{width: '100%'}}>
                        <h5 className="mb-4 text-success" style={{ width: '100%'}}>Order Details</h5>
                        
                        {/* Product items */}
                        <div className="mb-4">
                            <h6 className="text-muted mb-3">Product</h6>
                            {order.items.map(item => (
                                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <span className="fw-medium">{item.name}</span>
                                        <span className="text-muted ms-2">({item.quantity}{item.unit})</span>
                                    </div>
                                    <span className="fw-medium">KES {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        <hr />
                        
                        {/* Order information grid */}
                        <Row className="g-4">
                            <Col xs={12} sm={6}>
                                <div>
                                    <p className="text-muted mb-1 small">Seller</p>
                                    <p className="mb-0 fw-medium">
                                        {order.seller || order.items[0]?.seller || 'AgriFarmer Limited'}
                                    </p>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div>
                                    <p className="text-muted mb-1 small">Delivery</p>
                                    <p className="mb-0 fw-medium">
                                        {order.trackingNumber || 'KAA 111A'}
                                    </p>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div>
                                    <p className="text-muted mb-1 small">Order Date</p>
                                    <p className="mb-0 fw-medium">
                                        {order.orderDate || new Date().toLocaleDateString('en-GB')}
                                    </p>
                                </div>
                            </Col>
                            <Col xs={12} sm={6}>
                                <div>
                                    <p className="text-muted mb-1 small">Total Fee</p>
                                    <p className="mb-0 fw-bold text-success">
                                        KES {order.totalAmount.toFixed(2)}
                                    </p>
                                </div>
                            </Col>
                            {order.deliveryMethod && (
                                <Col xs={12} sm={6}>
                                    <div>
                                        <p className="text-muted mb-1 small">Delivery Method</p>
                                        <p className="mb-0 fw-medium text-capitalize">
                                            {order.deliveryMethod.replace('-', ' ')}
                                        </p>
                                    </div>
                                </Col>
                            )}
                            {order.paymentMethod && (
                                <Col xs={12} sm={6}>
                                    <div>
                                        <p className="text-muted mb-1 small">Payment Method</p>
                                        <p className="mb-0 fw-medium text-capitalize">
                                            {order.paymentMethod}
                                        </p>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            <style>{`
                @media (max-width: 576px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    .card-body {
                        padding: 1.5rem !important;
                    }
                    
                    .d-flex.align-items-center .me-3 {
                        margin-right: 1rem !important;
                    }
                    
                    h4 {
                        font-size: 1.25rem;
                    }
                    
                    h5 {
                        font-size: 1.1rem;
                    }
                    
                    h6 {
                        font-size: 0.95rem;
                    }
                    
                    .btn-sm {
                        font-size: 0.8rem;
                        padding: 0.375rem 0.75rem;
                        min-width: 110px !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .d-flex.justify-content-between.align-items-center {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }
                    
                    .d-flex.justify-content-between.align-items-center .btn {
                        margin-top: 1rem;
                        align-self: flex-end;
                    }
                    
                    /* Special styling for delivered step on mobile */
                    .d-flex.justify-content-between:last-child {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }
                    
                    .d-flex.justify-content-between:last-child .btn {
                        margin-top: 1rem;
                        align-self: flex-end;
                    }
                }
                
                .btn-link {
                    text-decoration: none;
                }
                
                .btn-link:hover {
                    text-decoration: underline;
                }
                
                /* Hover effect for clickable icons */
                [style*="cursor: pointer"]:hover {
                    transform: scale(1.05);
                    transition: transform 0.2s ease;
                }
                
                /* No hover effect for disabled delivered icon */
                [style*="cursor: default"]:hover {
                    transform: none;
                }
            `}</style>
        </div>
    );
};

export default TrackOrderPage;