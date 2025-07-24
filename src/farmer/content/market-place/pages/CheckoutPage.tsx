import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2, FiCalendar, FiGift } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartItem, Order, PaymentData } from '../types';
import PaymentModal from '../components/PaymentModal';

export interface CheckoutFormData {
    deliveryMethod: 'self-delivery' | 'courier' | 'buyer-pickup';
    deliveryDate: string;
    tipAmount: string | number;
    deliveryAddress: string;
}

export interface GiftData {
    productName: string;
    recipient: string;
    recipientNumber: string;
    message: string;
}

interface ValidationErrors {
    deliveryAddress?: string;
    deliveryDate?: string;
    tipAmount?: string;
}

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartItems, setCartItems] = useState<CartItem[]>((location.state?.cartItems as CartItem[]) || []);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Check if this is a gift purchase
    const isGift = location.state?.isGift || false;
    const giftData = location.state?.giftData as GiftData | undefined;

    const [formData, setFormData] = useState<CheckoutFormData>({
        deliveryMethod: 'courier',
        deliveryDate: '',
        tipAmount: '',
        deliveryAddress: 'Your default address', // Default address
    });

    // Get today's date in YYYY-MM-DD format for date validation
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Validate form data
    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};

        // Validate delivery address
        if (!formData.deliveryAddress.trim()) {
            errors.deliveryAddress = 'Delivery address is required';
        } else if (formData.deliveryAddress.trim().length < 10) {
            errors.deliveryAddress = 'Please provide a more detailed address (at least 10 characters)';
        }

        // Validate delivery date if provided
        if (formData.deliveryDate) {
            const selectedDate = new Date(formData.deliveryDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                errors.deliveryDate = 'Delivery date cannot be in the past';
            }
        }

        // Validate tip amount
        if (formData.tipAmount !== '' && formData.tipAmount !== 0) {
            const tipValue = parseFloat(formData.tipAmount.toString());
            if (isNaN(tipValue) || tipValue < 0) {
                errors.tipAmount = 'Please enter a valid tip amount';
            } else if (tipValue > subtotal) {
                errors.tipAmount = 'Tip amount cannot exceed the subtotal';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear validation error for this field when user starts typing
        if (validationErrors[name as keyof ValidationErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleQuantityChange = (itemId: number, change: number) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + change;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            })
        );
    };

    const handleRemoveItem = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const calculateSubtotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const subtotal = calculateSubtotal();
    const deliveryFee = formData.deliveryMethod === 'courier' ? 200 : 0;
    const tip = parseFloat(formData.tipAmount.toString()) || 0;
    const total = subtotal + deliveryFee + tip;

    // Generate tracking number
    const generateTrackingNumber = () => {
        const prefix = 'KAA';
        const randomNum = Math.floor(Math.random() * 9000) + 1000; // 4 digit number
        const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
        return `${prefix} ${randomNum}${suffix}`;
    };

    // Generate estimated delivery date
    const getEstimatedDelivery = () => {
        if (formData.deliveryDate) {
            return formData.deliveryDate;
        }
        
        const deliveryDays = formData.deliveryMethod === 'courier' ? 3 : 1;
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);
        return estimatedDate.toISOString().split('T')[0];
    };

    const handleProceedToPayment = () => {
        if (validateForm()) {
            setIsSubmitting(true);
            setShowPaymentModal(true);
        }
    };

    const handlePaymentSuccess = (paymentData: PaymentData) => {
        // Create the complete order object
        const newOrder: Order = {
            id: Date.now().toString(), // Simple ID generation
            trackingNumber: generateTrackingNumber(),
            status: 'Processing', // Start with Processing status
            items: cartItems.map(item => ({
                ...item,
                seller: item.seller || 'AgriFarmer Limited' // Ensure seller is set
            })),
            totalAmount: total,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            tip: tip,
            deliveryMethod: formData.deliveryMethod,
            deliveryDate: formData.deliveryDate,
            estimatedDelivery: getEstimatedDelivery(),
            orderDate: new Date().toLocaleDateString('en-GB'),
            paymentMethod: paymentData.paymentMethod,
            paymentDetails: paymentData,
            deliveryAddress: formData.deliveryAddress,
            seller: cartItems[0]?.seller || 'AgriFarmer Limited',
            isGift: isGift,
            giftData: isGift ? giftData : undefined
        };
        
        console.log("Order created:", newOrder);
        
        // Navigate to track order page with the complete order data
        navigate('../track-order', { 
            state: { order: newOrder },
            replace: true 
        });
        
        // Show success message
        if (isGift) {
            console.log(`Gift sent successfully to ${giftData?.recipient}!`);
        } else {
            console.log("Order placed successfully!");
        }
    };

    const handlePaymentModalClose = () => {
        setShowPaymentModal(false);
        setIsSubmitting(false);
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <Container className="py-3 py-md-4">
                    <Button 
                        variant="link" 
                        onClick={() => navigate(-1)} 
                        className="col-1 text-dark mb-0 ps-0 d-flex align-items-start"
                        style={{ fontSize: '0.9rem' }}
                    >
                        <FiArrowLeft className="me-0" /> Back
                    </Button>
                    <div className="text-center py-4 py-md-5">
                        <h4 className="h5 h-md-4">Your cart is empty</h4>
                        <p className="text-muted mb-3">Add items to your cart to proceed with checkout</p>
                        <Button 
                            variant="primary" 
                            onClick={() => navigate('../')}
                            className="px-3 px-md-4"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Container className="py-3 py-md-4">
                <Button 
                    variant="link" 
                    onClick={() => navigate(-1)} 
                    className="col-1 text-dark mb-0 ps-0 d-flex align-items-start"
                    style={{ fontSize: '0.9rem' }}
                >
                    <FiArrowLeft className="item-start me-1" /> Back
                </Button>
                
                <div className="d-flex align-items-center mb-1 mb-md-1">
                    {isGift && <FiGift className="text-warning me-2" size={20} />}
                    <h4 className="mb-0 h5 h-md-4">
                        {isGift ? 'Complete Your Gift Purchase' : 'Complete Your Purchase'}
                    </h4>
                </div>

                {/* Gift Information Alert */}
                {isGift && giftData && (
                    <Alert variant="info" className="mb-3 mb-md-4">
                        <div className="d-flex align-items-start align-items-sm-center">
                            <FiGift className="me-2 mt-1 mt-sm-0 flex-shrink-0" />
                            <div className="small">
                                <strong>Gift Details:</strong>
                                <br />
                                <strong>Recipient:</strong> {giftData.recipient} ({giftData.recipientNumber})
                                <br />
                                <strong>Message:</strong> "{giftData.message}"
                            </div>
                        </div>
                    </Alert>
                )}

                {/* Cart Items */}
                <div className="mb-4">
                    <h5 className="mb-3 h6 h-md-5">
                        {isGift ? 'Gift Item' : ''}
                    </h5>
                    {cartItems.map((item) => (
                        <div key={item.id} className="d-flex align-items-start align-items-sm-center mb-3 pb-0 border-bottom">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="rounded me-2 me-sm-3 flex-shrink-0"
                                style={{ 
                                    width: '120px', 
                                    height: '120px', 
                                    objectFit: 'cover',
                                }}
                            />
                            
                            <div className="flex-grow-1 min-width-0">
                                <div className="d-flex align-items-center flex-wrap">
                                    <h6 className="mb-1 me-2 text-truncate" style={{ fontSize: '0.9rem' }}>
                                        {item.name}
                                    </h6>
                                    {isGift && <FiGift className="text-warning flex-shrink-0" size={16} />}
                                </div>
                                <p className="text-muted d-flex align-items-start mb-0 small text-truncate">{item.seller}</p>
                                <p className="text-dark mb-0 fw-semi-bold">
                                    KES {item.price.toFixed(2)} per {item.unit}
                                </p>
                                
                                <div className="d-flex align-items-center gap-0 flex-wrap">
                                    <div className="d-flex align-items-center gap-0 rounded-pill" style={{backgroundColor: '#cefae3' }}>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="rounded-circle d-flex align-items-center justify-content-center bg-white border-0"
                                            style={{ width: '18px', height: '18px', padding: 0, fontSize: '0.75rem' }}
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            disabled={isGift}
                                        >
                                            <FiMinus size={10} />
                                        </Button>
                                        
                                        <span className="fw-bold mx-2 small" style={{ minWidth: '20px', textAlign: 'center' }}>
                                            {item.quantity}
                                        </span>
                                        
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="rounded-circle d-flex align-items-center justify-content-center bg-white border-0"
                                            style={{ width: '18px', height: '18px', padding: 0, fontSize: '0.75rem' }}
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            disabled={isGift}
                                        >
                                            <FiPlus size={10} />
                                        </Button>
                                    </div>
                                    
                                    {!isGift && (
                                        <button
                                            className="btn btn-link text-danger p-0 ms-1"
                                            style={{ border: 'none', background: 'none' }}
                                            onClick={() => handleRemoveItem(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Fields Row */}
                <Row className="g-3 g-md-4 w-100">
                    <Col lg={6}>
                        {/* Delivery Address */}
                        <div className="mb-4">
                            <h5 className="mb-3 h6 h-md-5">
                                {isGift ? 'Recipient Address' : 'Delivery Address'}
                            </h5>
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="deliveryAddress"
                                    value={formData.deliveryAddress}
                                    onChange={handleInputChange}
                                    placeholder={isGift ? "Enter recipient's delivery address" : "Enter your delivery address"}
                                    required
                                    isInvalid={!!validationErrors.deliveryAddress}
                                    className="resize-none"
                                    style={{ fontSize: '0.9rem' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.deliveryAddress}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        {/* Delivery Options */}
                        <div className="mb-4">
                            <h5 className="mb-3 h6 h-md-5">
                                {isGift ? 'Delivery Option (for recipient)' : 'Delivery Option'}
                            </h5>
                            <Form.Group>
                                <Form.Select 
                                    name="deliveryMethod" 
                                    value={formData.deliveryMethod} 
                                    onChange={handleInputChange}
                                    className="mb-3"
                                    style={{ fontSize: '0.9rem' }}
                                >
                                    <option value="courier">Courier Delivery (+KES 200)</option>
                                    <option value="self-delivery">Self Delivery (Free)</option>
                                    <option value="buyer-pickup">
                                        {isGift ? 'Recipient Pickup (Free)' : 'Buyer Self-Pickup (Free)'}
                                    </option>
                                </Form.Select>
                            </Form.Group>
                            {isGift && formData.deliveryMethod === 'courier' && (
                                <small className="text-info d-block">
                                    The gift will be delivered directly to the recipient at their location.
                                </small>
                            )}
                        </div>

                        {/* Delivery Date */}
                        <div className="mb-4">
                            <h5 className="mb-3 h6 h-md-5">
                                {isGift ? 'Gift Delivery Date (Optional)' : 'Preferred Delivery Date (Optional)'}
                            </h5>
                            <Form.Group className="position-relative">
                                <Form.Control 
                                    type="date" 
                                    name="deliveryDate"
                                    value={formData.deliveryDate}
                                    onChange={handleInputChange}
                                    className="pe-5"
                                    min={getTodayDate()}
                                    isInvalid={!!validationErrors.deliveryDate}
                                    style={{ fontSize: '0.9rem' }}
                                />
                                <FiCalendar 
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" 
                                    size={18}
                                    style={{ pointerEvents: 'none' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationErrors.deliveryDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <small className="text-muted mt-2 d-block">
                                {isGift 
                                    ? "Leave blank for standard delivery timing to recipient."
                                    : "Leave blank for standard delivery timing."
                                }
                            </small>
                        </div>

                        {/* Tip Section - Optional for gifts */}
                        {!isGift && (
                            <div className="mb-4">
                                <h5 className="mb-3 h6 h-md-5">Add Tip (Optional)</h5>
                                <Form.Group>
                                    <Form.Control
                                        type="number"
                                        name="tipAmount"
                                        value={formData.tipAmount}
                                        onChange={handleInputChange}
                                        placeholder="Enter tip amount"
                                        min="0"
                                        step="0.01"
                                        isInvalid={!!validationErrors.tipAmount}
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.tipAmount}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        )}
                    </Col>
                    <Col lg={6} className="ms-auto">
                        <Card className="shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                            <Card.Body className="p-3 p-md-4">
                                <h5 className="mb-3 mb-md-4 h6 h-md-5">
                                    {isGift ? 'Gift Summary' : 'Order Summary'}
                                </h5>
                                <div className="mb-3">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="d-flex justify-content-between mb-2 small">
                                            <span className="d-flex align-items-center text-truncate me-2">
                                                <span className="text-truncate">
                                                    {item.name} x {item.quantity}
                                                </span>
                                                {isGift && <FiGift className="text-warning ms-1 flex-shrink-0" size={12} />}
                                            </span>
                                            <span className="text-nowrap">KES {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex justify-content-between small mb-1">
                                    <p className="mb-0">Subtotal</p>
                                    <p className="mb-0">KES {subtotal.toFixed(2)}</p>
                                </div>
                                <div className="d-flex justify-content-between small mb-1">
                                    <p className="mb-0">Delivery Fee</p>
                                    <p className="mb-0">KES {deliveryFee.toFixed(2)}</p>
                                </div>
                                {tip > 0 && (
                                    <div className="d-flex justify-content-between small mb-1">
                                        <p className="mb-0">Tip</p>
                                        <p className="mb-0">KES {tip.toFixed(2)}</p>
                                    </div>
                                )}
                                <hr className="my-2" />
                                <div className="d-flex justify-content-between fw-bold">
                                    <p className="mb-0">Total</p>
                                    <p className="mb-0">KES {total.toFixed(2)}</p>
                                </div>
                                
                                {isGift && giftData && (
                                    <div className="bg-light p-2 p-md-3 rounded my-3">
                                        <h6 className="text-muted mb-2 small">Gift Recipient:</h6>
                                        <p className="mb-1 fw-bold small text-truncate">{giftData.recipient}</p>
                                        <p className="mb-0 small text-muted text-truncate">{giftData.recipientNumber}</p>
                                    </div>
                                )}
                                
                                <div className="d-grid mt-3 mt-md-4">
                                    <Button 
                                        variant="success" 
                                        size="lg" 
                                        onClick={handleProceedToPayment}
                                        disabled={isSubmitting}
                                        className="fw-bold pt-03 pb-1 d-flex align-items-center fit-content w-100 justify-content-center py-2 py-sm-0"
                                        style={{ fontSize: '1.5rem' }}
                                    >
                                        {isGift && <FiGift className="me-2" size={16} />}
                                        {isSubmitting ? 'Processing...' : (isGift ? 'Complete Gift Payment' : 'Proceed to Payment')}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Order Summary Row - Always Below */}
                
            </Container>

            <PaymentModal 
                show={showPaymentModal}
                onHide={handlePaymentModalClose}
                onPaymentSuccess={handlePaymentSuccess}
                total={total}
            />
        </div>
    );
};

export default CheckoutPage;