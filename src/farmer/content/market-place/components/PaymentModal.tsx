import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentData } from '../types';

interface PaymentModalProps {
    show: boolean;
    onHide: () => void;
    onPaymentSuccess: (paymentData: PaymentData) => void;
    total: number;
    // Add these props to get order details
    orderData?: {
        cartItems: any[];
        deliveryMethod: string;
        deliveryDate: string;
        tipAmount: string | number;
        isGift?: boolean;
        giftData?: any;
    };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
    show, 
    onHide, 
    onPaymentSuccess, 
    total,
    orderData 
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

    const generateTrackingNumber = () => {
        const prefix = 'KAA';
        const random = Math.floor(Math.random() * 999) + 100;
        const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return `${prefix}${random}${suffix}`;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const paymentData: PaymentData = {
            paymentMethod: selectedPayment,
            ...(selectedPayment === 'mpesa' && { mpesaPhone }),
            ...(selectedPayment === 'card' && cardDetails),
            ...(selectedPayment === 'barter' && { barterDescription })
        };

        // Create complete order object for tracking
        const completeOrder = {
            id: Date.now(), // Generate unique order ID
            items: orderData?.cartItems || [],
            status: 'Processing' as const,
            totalAmount: total,
            orderDate: new Date().toLocaleDateString('en-GB'),
            trackingNumber: generateTrackingNumber(),
            paymentMethod: selectedPayment,
            deliveryMethod: orderData?.deliveryMethod || 'courier',
            deliveryDate: orderData?.deliveryDate || '',
            tipAmount: orderData?.tipAmount || 0,
            isGift: orderData?.isGift || false,
            giftData: orderData?.giftData || null,
            seller: orderData?.cartItems?.[0]?.seller || 'AgriFarmer Limited',
            deliveryAddress: 'Your default address', // You can get this from user profile
            estimatedDelivery: 'Within 2-3 business days',
            // Add payment details
            paymentDetails: paymentData
        };

        // Call the original success handler
        onPaymentSuccess(paymentData);
        
        // Close the modal
        onHide();
        
        // Show success message
        const message = orderData?.isGift 
            ? `Gift sent successfully to ${orderData.giftData?.recipient}!` 
            : "Order placed successfully!";
        
        // Navigate to track order page with complete order data
        setTimeout(() => {
            alert(message);
            navigate('../track-order', { 
                state: { order: completeOrder },
                replace: true 
            });
        }, 100);
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
            className={`pm-dialog-modal border rounded-2 p-3 mb-3 pm-cursor-pointer pm-transition-all ${
                selectedPayment === method 
                    ? 'border-success border-2 bg-light' 
                    : 'border-secondary-subtle'
            }`}
            onClick={() => handlePaymentSelect(method)}
            style={{ cursor: 'pointer' }}
        >
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div 
                        className={`rounded-circle me-2 me-sm-3 ${
                            selectedPayment === method 
                                ? 'border-success' 
                                : 'border-secondary'
                        }`}
                        style={{
                            width: '20px',
                            height: '20px',
                            border: selectedPayment === method ? '6px solid #198754' : '2px solid #6c757d',
                            backgroundColor: 'white'
                        }}
                    />
                    <div className="me-2 me-sm-3 text-secondary">
                        {icon}
                    </div>
                    <span className="fw-medium">{label}</span>
                </div>
                {brandIcon && (
                    <div>
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

    const VisaIcon = () => (
        <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <rect width="32" height="20" rx="2" fill="#1A1F71"/>
            <path d="M13.6 14L15.2 6H17.4L15.8 14H13.6ZM11.2 6L9.2 11.6L8.8 9.8L7.8 6.8C7.8 6.4 7.4 6 6.8 6H3L2.8 6.2C3.8 6.4 4.8 6.8 5.6 7.4L7.2 14H9.6L13 6H11.2ZM26.4 14H28.4L26.8 6H25C24.6 6 24.2 6.2 24 6.6L20.6 14H23L23.6 12.4H26.2L26.4 14ZM24.2 10.6L25.4 7.8L25.8 10.6H24.2ZM21.8 9.2C21.8 7.4 20.2 6.8 18.8 6.8C17.2 6.8 16 7.6 16 8.8C16 9.8 16.8 10.4 17.4 10.6C18 10.8 18.2 11 18.2 11.2C18.2 11.6 17.6 11.8 17 11.8C16.2 11.8 15.8 11.6 15.4 11.4L15 11.2L14.6 13C15 13.2 15.8 13.4 16.6 13.4C18.4 13.4 19.6 12.6 19.6 11.4C19.6 10.6 19 10 17.8 9.6C17.2 9.4 16.8 9.2 16.8 8.8C16.8 8.4 17.2 8 18 8C18.6 8 19 8.2 19.4 8.4L19.6 8.6L20 6.8C19.6 6.6 18.8 6.4 18 6.4" fill="white"/>
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

    if (!show) return null;

    return (
        <>
            <style>{`
                .pm-modal-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1050;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .pm-modal-dialog {
                    max-width: 500px;
                    width: 90%;
                    margin: 0;
                    position: relative;
                }
                
                .pm-cursor-pointer {
                    cursor: pointer;
                }
                
                .pm-transition-all {
                    transition: all 0.2s ease;
                }
                
                .pm-dialog-modal:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                
                @media (max-width: 768px) {
                    .pm-modal-dialog {
                        width: 95%;
                        margin: 10px;
                    }
                }
            `}</style>
            
            <div className="pm-modal-wrapper">
                <div className="pm-modal-dialog bg-white p-4 ">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title text-success fw-bold">Choose Payment Method</h5>
                            <button 
                                type="button" 
                                className="btn-close"
                                onClick={onHide}
                                aria-label="Close"
                            ></button>
                        </div>
                        
                        <div className="modal-body pt-2">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setError('')}
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}

                            <div className="mb-3">
                                {renderPaymentOption(
                                    'mpesa',
                                    <MpesaIcon />,
                                    'Mpesa',
                                    <span className="badge bg-success px-2 py-1">M-PESA</span>
                                )}

                                {renderPaymentOption(
                                    'card',
                                    <CreditCardIcon />,
                                    'Credit Card',
                                    <div className="d-flex gap-1">
                                        <VisaIcon />
                                        <span className="badge px-2 py-1 text-white" style={{ backgroundColor: '#eb001b', fontSize: '10px' }}>
                                            MC
                                        </span>
                                    </div>
                                )}

                                {renderPaymentOption(
                                    'wallet',
                                    <WalletIcon />,
                                    'Wallet',
                                    <span className="badge px-2 py-1 text-white" style={{ backgroundColor: '#ff6600' }}>
                                        W
                                    </span>
                                )}

                                {renderPaymentOption(
                                    'barter',
                                    <BarterIcon />,
                                    'Barter Wallet',
                                    <span style={{ color: '#ff6600', fontSize: '16px' }}>🔄</span>
                                )}

                                {renderPaymentOption(
                                    'friend',
                                    <FriendIcon />,
                                    'Ask a Friend to Pay',
                                    <span style={{ fontSize: '16px' }}>👥</span>
                                )}
                            </div>

                            {/* Payment Details Forms */}
                            {selectedPayment === 'mpesa' && (
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Enter phone number (e.g., 0712345678)"
                                            value={mpesaPhone}
                                            onChange={(e) => setMpesaPhone(e.target.value)}
                                            required
                                        />
                                        <div className="form-text">
                                            Enter your M-Pesa registered phone number
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedPayment === 'card' && (
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="1234 5678 9012 3456"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardNumberChange}
                                            maxLength={19}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-medium">Cardholder Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="John Doe"
                                            value={cardDetails.cardholderName}
                                            onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value.toUpperCase() }))}
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="form-label fw-medium">Expiry Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiryDate}
                                                onChange={handleExpiryDateChange}
                                                maxLength={5}
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label fw-medium">CVV</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 4) {
                                                        setCardDetails(prev => ({ ...prev, cvv: value }));
                                                    }
                                                }}
                                                maxLength={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedPayment === 'wallet' && (
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Wallet Balance</label>
                                    <select className="form-select">
                                        <option>Current Balance: KES 2,500.00</option>
                                        <option>Use partial balance</option>
                                    </select>
                                </div>
                            )}

                            {selectedPayment === 'barter' && (
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Barter Details</label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        placeholder="Describe what you're offering in exchange (e.g., 5kg of maize, farm labor for 2 days, etc.)"
                                        value={barterDescription}
                                        onChange={(e) => setBarterDescription(e.target.value)}
                                        style={{ resize: 'vertical' }}
                                        required
                                    />
                                </div>
                            )}

                            {selectedPayment === 'friend' && (
                                <div className="mt-3">
                                    <div className="text-center mb-3">
                                        <p className="fw-bold mb-2">Payment Amount: Ksh {total.toFixed(0)}</p>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button className="btn btn-success fw-bold" style={{ width: '50%' }}>
                                            Share to friends
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <div className="text-center">
                                            <div 
                                                className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    backgroundColor: '#25D366', 
                                                    color: 'white', 
                                                    border: 'none' 
                                                }}
                                            >
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.542"/>
                                                </svg>
                                            </div>
                                            <small className="d-block text-muted">WhatsApp</small>
                                        </div>
                                        <div className="text-center">
                                            <div 
                                                className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    backgroundColor: '#0084FF', 
                                                    color: 'white', 
                                                    border: 'none' 
                                                }}
                                            >
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0z"/>
                                                </svg>
                                            </div>
                                            <small className="d-block text-muted">Messenger</small>
                                        </div>
                                        <div className="text-center">
                                            <div 
                                                className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    backgroundColor: '#34B7F1', 
                                                    color: 'white', 
                                                    border: 'none' 
                                                }}
                                            >
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                                </svg>
                                            </div>
                                            <small className="d-block text-muted">SMS</small>
                                        </div>
                                        <div className="text-center">
                                            <div 
                                                className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    backgroundColor: '#6c757d', 
                                                    color: 'white', 
                                                    border: 'none' 
                                                }}
                                            >
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                            </svg>
                                        </div>
                                        <small className="d-block text-muted">Copy link</small>
                                    </div>
                                    <div className="text-center">
                                        <div 
                                            className="btn btn-sm rounded-circle mb-1 d-flex align-items-center justify-content-center" 
                                            style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                backgroundColor: '#28a745', 
                                                color: 'white', 
                                                border: 'none' 
                                            }}
                                        >
                                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                            </svg>
                                        </div>
                                        <small className="d-block text-muted">More</small>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Place Order button when a payment method is selected */}
                        {selectedPayment && (
                            <div className="d-grid mt-4">
                                <button 
                                    className="btn btn-success w-100 fw-bold py-3"
                                    onClick={handleSubmit}
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PaymentModal;