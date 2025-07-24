import React, { useState } from 'react';
import { Alert, Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface PaymentData {
    paymentMethod: string;
    mpesaPhone?: string;
    cardNumber?: string;
    cardholderName?: string;
    expiryDate?: string;
    cvv?: string;
    barterDescription?: string;
}

interface PaymentPageProps {
    onPaymentSuccess: (paymentData: PaymentData) => void;
    total: number;
    title?: string;
    description?: string;
    onCancel?: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ 
    onPaymentSuccess, 
    total,
    title = "Payment",
    description,
    onCancel
}) => {
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('');
    const [mpesaPhone, setMpesaPhone] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: ''
    });
    const [barterDescription, setBarterDescription] = useState('');
    const [error, setError] = useState('');

    const handlePaymentSelect = (method: string) => {
        setSelectedPayment(method);
        setError('');
    };

    const validateForm = () => {
        if (!selectedPayment) {
            setError('Please select a payment method');
            return false;
        }

        if (selectedPayment === 'mpesa') {
            if (!mpesaPhone) {
                setError('Please enter your M-Pesa phone number');
                return false;
            }
            // Kenya phone number validation (supports 07xx, 01xx, +254xxx formats)
            const phoneRegex = /^(\+254|0)(7|1)[0-9]{8}$/;
            if (!phoneRegex.test(mpesaPhone)) {
                setError('Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)');
                return false;
            }
        }

        if (selectedPayment === 'card') {
            if (!cardDetails.cardNumber || !cardDetails.cardholderName || !cardDetails.expiryDate || !cardDetails.cvv) {
                setError('Please fill in all card details');
                return false;
            }

            // Card number validation (remove spaces and check for 16 digits)
            const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, '');
            if (!/^\d{16}$/.test(cleanCardNumber)) {
                setError('Please enter a valid 16-digit card number');
                return false;
            }

            // CVV validation
            if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
                setError('Please enter a valid CVV (3 or 4 digits)');
                return false;
            }

            // Expiry date validation (MM/YY format)
            if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardDetails.expiryDate)) {
                setError('Please enter a valid expiry date (MM/YY format)');
                return false;
            }

            // Check if card is not expired
            const [month, year] = cardDetails.expiryDate.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
            const currentMonth = currentDate.getMonth() + 1;
            
            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                setError('Card has expired. Please use a valid card');
                return false;
            }

            // Cardholder name validation
            if (cardDetails.cardholderName.length < 2) {
                setError('Please enter a valid cardholder name');
                return false;
            }
        }

        if (selectedPayment === 'barter') {
            if (!barterDescription.trim()) {
                setError('Please describe what you are offering for barter');
                return false;
            }
            if (barterDescription.trim().length < 10) {
                setError('Please provide a more detailed description of your barter offer (at least 10 characters)');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const paymentData: PaymentData = {
            paymentMethod: selectedPayment,
            ...(selectedPayment === 'mpesa' && { mpesaPhone }),
            ...(selectedPayment === 'card' && cardDetails),
            ...(selectedPayment === 'barter' && { barterDescription })
        };

        // Call the success handler
        onPaymentSuccess(paymentData);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            navigate(-1); // Go back to previous page
        }
    };

    const formatCardNumber = (value: string) => {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');
        // Add spaces every 4 digits
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formatted;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        if (formatted.replace(/\s/g, '').length <= 16) {
            setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
        }
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setCardDetails(prev => ({ ...prev, expiryDate: value }));
    };

    const renderPaymentOption = (method: string, icon: React.ReactNode, label: string, brandIcon?: React.ReactNode) => (
        <div 
            key={method}
            className={`payment-option ${selectedPayment === method ? 'selected' : ''}`}
            onClick={() => handlePaymentSelect(method)}
        >
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div 
                        className={`payment-radio me-2 me-sm-3 ${selectedPayment === method ? 'selected' : ''}`}
                    />
                    <div className="me-2 me-sm-3 payment-icon">
                        {icon}
                    </div>
                    <span className="payment-label">{label}</span>
                </div>
                {brandIcon && (
                    <div className="brand-icon">
                        {brandIcon}
                    </div>
                )}
            </div>
        </div>
    );

    const MpesaIcon = () => (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 2C13.5 2 12 3.5 12 5.5c0 1.26.64 2.4 1.69 3.07L12 16l-1.69-7.43C11.36 7.9 12 6.76 12 5.5 12 3.5 10.5 2 8.5 2S5 3.5 5 5.5c0 1.26.64 2.4 1.69 3.07L8 16h8l1.31-7.43C18.36 7.9 19 6.76 19 5.5 19 3.5 17.5 2 15.5 2z"/>
        </svg>
    );

    const CreditCardIcon = () => (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>
    );

    const WalletIcon = () => (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .89-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            <circle cx="16" cy="12" r="1.5"/>
        </svg>
    );

    const BarterIcon = () => (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
        </svg>
    );

    const FriendIcon = () => (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-1.02-1.3-1.37-2.46-1.37s-2.12.35-2.46 1.37L12.5 16H15v6h5zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9.5l-2.54-7.63A1.99 1.99 0 004.5 6c-.8 0-1.54.5-1.85 1.26l-1.92 5.63c-.22.64.16 1.33.84 1.33.38 0 .72-.24.84-.61l1.4-4.11L7.5 22h2z"/>
        </svg>
    );

    return (
        <div className="full-page-payment">
            <Container fluid className="px-2 px-sm-3 py-2">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8 col-xl-6">
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-3 pb-0 px-3 px-sm-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="payment-title mb-0">{title}</h4>
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm"
                                        onClick={handleCancel}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                                {description && (
                                    <p className="text-muted mt-2 mb-0 small">{description}</p>
                                )}
                            </Card.Header>
                            
                            <Card.Body className="pt-2 px-3 px-sm-4 pb-3">
                                <div className="text-center mb-3">
                                    <h5 className="payment-amount">
                                        Total Amount: <span className="text-success fw-bold">KES {total.toFixed(2)}</span>
                                    </h5>
                                </div>

                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError('')} className="error-alert">
                                        {error}
                                    </Alert>
                                )}

                                <div className="payment-options">
                                    {renderPaymentOption(
                                        'mpesa',
                                        <MpesaIcon />,
                                        'M-Pesa',
                                        <div className="mpesa-brand">
                                            M-PESA
                                        </div>
                                    )}

                                    {renderPaymentOption(
                                        'card',
                                        <CreditCardIcon />,
                                        'Credit Card',
                                        <div className="d-flex gap-1">
                                            <div className="visa-brand">
                                                VISA
                                            </div>
                                            <div className="mastercard-brand">
                                                MC
                                            </div>
                                        </div>
                                    )}

                                    {renderPaymentOption(
                                        'wallet',
                                        <WalletIcon />,
                                        'Wallet',
                                        <div className="wallet-brand">
                                            W
                                        </div>
                                    )}

                                    {renderPaymentOption(
                                        'barter',
                                        <BarterIcon />,
                                        'Barter Wallet',
                                        <div className="barter-icon">
                                            🔄
                                        </div>
                                    )}

                                    {renderPaymentOption(
                                        'friend',
                                        <FriendIcon />,
                                        'Ask a Friend to Pay',
                                        <div className="friend-icon">
                                            👥
                                        </div>
                                    )}
                                </div>

                                {/* Payment Details Forms */}
                                {selectedPayment === 'mpesa' && (
                                    <div className="payment-form">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Enter phone number (e.g., 0712345678)"
                                                value={mpesaPhone}
                                                onChange={(e) => setMpesaPhone(e.target.value)}
                                                className="form-input"
                                                required
                                            />
                                            <Form.Text className="form-text">
                                                Enter your M-Pesa registered phone number
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                )}

                                {selectedPayment === 'card' && (
                                    <div className="payment-form">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">Card Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                value={cardDetails.cardNumber}
                                                onChange={handleCardNumberChange}
                                                className="form-input"
                                                maxLength={19} // 16 digits + 3 spaces
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">Cardholder Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="John Doe"
                                                value={cardDetails.cardholderName}
                                                onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value.toUpperCase() }))}
                                                className="form-input"
                                                required
                                            />
                                        </Form.Group>
                                        <div className="row">
                                            <div className="col-6">
                                                <Form.Group>
                                                    <Form.Label className="form-label">Expiry Date</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        value={cardDetails.expiryDate}
                                                        onChange={handleExpiryDateChange}
                                                        className="form-input"
                                                        maxLength={5}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="col-6">
                                                <Form.Group>
                                                    <Form.Label className="form-label">CVV</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="123"
                                                        value={cardDetails.cvv}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 4) {
                                                                setCardDetails(prev => ({ ...prev, cvv: value }));
                                                            }
                                                        }}
                                                        className="form-input"
                                                        maxLength={4}
                                                        required
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'wallet' && (
                                    <div className="payment-form">
                                        <Form.Group>
                                            <Form.Label className="form-label">Wallet Balance</Form.Label>
                                            <Form.Select className="form-input">
                                                <option>Current Balance: KES 2,500.00</option>
                                                <option>Use partial balance</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                )}

                                {selectedPayment === 'barter' && (
                                    <div className="payment-form">
                                        <Form.Group>
                                            <Form.Label className="form-label">Barter Details</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                placeholder="Describe what you're offering in exchange (e.g., 5kg of maize, farm labor for 2 days, etc.)"
                                                value={barterDescription}
                                                onChange={(e) => setBarterDescription(e.target.value)}
                                                className="form-input"
                                                style={{ resize: 'vertical' }}
                                                required
                                            />
                                        </Form.Group>
                                    </div>
                                )}

                                {selectedPayment === 'friend' && (
                                    <div className="mt-3">
                                        <div className="text-center mb-3">
                                            <p className="fw-bold mb-2">Payment Amount: KES {total.toFixed(0)}</p>
                                        </div>
                                        <div className="d-grid mb-3 d-flex justify-content-center mt-3 col-12">
                                            <Button 
                                                variant="success" 
                                                className="text-nowrap fw-bold btn btn-primary w-50"
                                                style={{ whiteSpace: 'nowrap'}}
                                            >
                                                Share to friends
                                            </Button>
                                        </div>
                                        <div className="d-flex justify-content-around">
                                            <div className="text-center">
                                                <div className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                     style={{ width: '40px', height: '40px', backgroundColor: '#25D366', color: 'white', border: 'none' }}>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.542"/>
                                                    </svg>
                                                </div>
                                                <small className="d-block text-muted">WhatsApp</small>
                                            </div>
                                            <div className="text-center">
                                                <div className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                     style={{ width: '40px', height: '40px', backgroundColor: '#0084FF', color: 'white', border: 'none' }}>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0z"/>
                                                    </svg>
                                                </div>
                                                <small className="d-block text-muted">Messenger</small>
                                            </div>
                                            <div className="text-center">
                                                <div className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                     style={{ width: '40px', height: '40px', backgroundColor: '#34B7F1', color: 'white', border: 'none' }}>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                                    </svg>
                                                </div>
                                                <small className="d-block text-muted">SMS</small>
                                            </div>
                                            <div className="text-center">
                                                <div className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                     style={{ width: '40px', height: '40px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                                    </svg>
                                                </div>
                                                <small className="d-block text-muted">Copy link</small>
                                            </div>
                                            <div className="text-center">
                                                <div className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                     style={{ width: '40px', height: '40px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                                    </svg>
                                                </div>
                                                <small className="d-block text-muted">More</small>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                {selectedPayment && (
                                    <div className="d-grid gap-2 mt-4">
                                        <Button 
                                            variant="success" 
                                            onClick={handleSubmit}
                                            className="process-payment-btn"
                                            size="lg"
                                        >
                                            Process Payment
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>

            <style>{`
                .full-page-payment {
                    min-height: 100vh;
                    background-color: #f8f9fa;
                }

                .payment-title {
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #28a745;
                }

                @media (max-width: 576px) {
                    .payment-title {
                        font-size: 1.1rem;
                    }
                }

                .payment-amount {
                    font-size: 1.1rem;
                    margin-bottom: 0;
                }

                @media (max-width: 576px) {
                    .payment-amount {
                        font-size: 1rem;
                    }
                }

                .cancel-btn {
                    border-radius: 20px;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.875rem;
                }

                .cancel-btn:hover {
                    background-color: #dc3545;
                    border-color: #dc3545;
                    color: white;
                }

                .error-alert {
                    font-size: 0.875rem;
                    margin-bottom: 1rem;
                }

                .payment-options {
                    margin-bottom: 1rem;
                }

                .payment-option {
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    padding: 10px 12px;
                    cursor: pointer;
                    margin-bottom: 10px;
                    background-color: white;
                    transition: all 0.2s ease;
                }

                @media (max-width: 576px) {
                    .payment-option {
                        padding: 8px 10px;
                        margin-bottom: 8px;
                    }
                }

                .payment-option:hover {
                    background-color: #f8f9fa;
                    border-color: #28a745;
                }

                .payment-option.selected {
                    border: 2px solid #28a745;
                    background-color: #f8fff9;
                }

                .payment-option.selected:hover {
                    background-color: #f8fff9;
                }

                .payment-radio {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #dee2e6;
                    border-radius: 50%;
                    background-color: transparent;
                    flex-shrink: 0;
                }

                .payment-radio.selected {
                    border: 6px solid #28a745;
                    background-color: white;
                }

                .payment-icon {
                    color: #6c757d;
                    font-size: 18px;
                    flex-shrink: 0;
                }

                .payment-label {
                    font-weight: 500;
                    font-size: 1rem;
                    color: #333;
                }

                .brand-icon {
                    font-size: 20px;
                }

                .mpesa-brand {
                    background-color: #28a745;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: bold;
                }

                .visa-brand {
                    background-color: #1a1f71;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 10px;
                    font-weight: bold;
                }

                .mastercard-brand {
                    background-color: #eb001b;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 10px;
                    font-weight: bold;
                }

                .wallet-brand {
                    background-color: #ff6600;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: bold;
                }

                .barter-icon {
                    color: #ff6600;
                    font-size: 16px;
                }

                .friend-icon {
                    color: #333;
                    }
                }
            `}</style>
        </div>
    );
};

export default  PaymentPage;