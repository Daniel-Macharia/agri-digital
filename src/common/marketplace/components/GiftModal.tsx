import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TiContacts } from "react-icons/ti";

export interface Product {
    id: number;
    name: string;
    seller: string;
    price: number;
    unit: string;
    rating: number;
    image: string;
    category: string;
    description?: string;
}

export interface GiftModalProps {
  show: boolean;
  onHide: () => void;
  product: Product | null;
  onSendGift: (giftData: {
    productName: string;
    recipient: string;
    recipientNumber: string;
    message: string;
  }) => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ show, onHide, product, onSendGift }) => {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState('');
    const [recipientNumber, setRecipientNumber] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes or product changes
    useEffect(() => {
        if (show && product) {
            setRecipient('');
            setRecipientNumber('');
            setMessage('');
            setErrors({});
            setIsSubmitting(false);
        }
    }, [show, product]);

    // Kenyan phone number validation
    const validateKenyanPhoneNumber = (phone: string): boolean => {
        // Remove spaces, hyphens, and parentheses
        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        
        // Kenyan phone number patterns:
        // +254XXXXXXXXX (international format)
        // 254XXXXXXXXX (without +)
        // 07XXXXXXXX or 01XXXXXXXX (local format)
        const kenyanPatterns = [
            /^\+254[17]\d{8}$/, // +254 followed by 7 or 1 and 8 digits
            /^254[17]\d{8}$/,   // 254 followed by 7 or 1 and 8 digits
            /^0[17]\d{8}$/      // 0 followed by 7 or 1 and 8 digits
        ];

        return kenyanPatterns.some(pattern => pattern.test(cleanPhone));
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        if (!recipient.trim()) {
            newErrors.recipient = 'Recipient name is required';
        }

        if (!recipientNumber.trim()) {
            newErrors.recipientNumber = 'Recipient phone number is required';
        } else if (!validateKenyanPhoneNumber(recipientNumber.trim())) {
            newErrors.recipientNumber = 'Please enter a valid Kenyan phone number (e.g., 0712345678, +254712345678)';
        }

        if (!message.trim()) {
            newErrors.message = 'Gift message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!product || isSubmitting) return;

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const giftData = {
                productName: product.name,
                recipient: recipient.trim(),
                recipientNumber: recipientNumber.trim(),
                message: message.trim()
            };

            // Call the parent handler
            onSendGift(giftData);
            
            // Close modal first
            onHide();
            
            // Small delay to ensure modal is closed before navigation
            setTimeout(() => {
                // Navigate to checkout with gift data
                navigate('checkout', { 
                    state: { 
                        cartItems: [{
                            ...product,
                            quantity: 1
                        }],
                        isGift: true,
                        giftData: giftData
                    } 
                });
            }, 100);

        } catch (error) {
            console.error('Error sending gift:', error);
            setErrors({ submit: 'Failed to process gift. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setRecipient('');
        setRecipientNumber('');
        setMessage('');
        setErrors({});
        setIsSubmitting(false);
        onHide();
    };

    // Prevent modal from closing when clicking inside
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <>
            <Modal 
                show={show} 
                onHide={handleCancel} 
                centered
                backdrop="static"
                keyboard={!isSubmitting}
                onClick={handleModalClick}
                className="responsive-gift-modal"
                dialogClassName="modal-dialog-centered modal-dialog-scrollable"
                size="lg"
            >
                <Modal.Header className="modal-header d-flex justify-content-between align-items-center px-3 px-sm-4 py-2 py-sm-3 border-bottom" closeButton={!isSubmitting}>
                    <Modal.Title className="modal-title text-dark fw-bold flex-grow-1 fs-6 fs-sm-5">
                        Buy for Someone
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit} className="h-100 d-flex flex-column">
                    <Modal.Body className="px-3 px-sm-4 py-3 modal-body-scrollable flex-grow-1">
                        {product && (
                            <div className="d-flex flex-column flex-sm-row mb-4 product-info-responsive">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="rounded me-0 me-sm-3 mb-2 mb-sm-0 align-self-start"
                                    style={{ maxWidth: '190px', minWidth: '130px', maxHeight: '182.4px', minHeight: '142.4px', objectFit: 'cover' }}
                                />
                                <div className="flex-grow-1 pt-4">
                                    <h6 className="mb-1 fw-bold product-name-responsive text-dark">{product.name}</h6>
                                    <p className="text mb-1 small fw-medium" style={{color: '#457900'}}>Sold by {product.seller}</p>
                                    <p className="mb-0">
                                        <span className="text-muted small">current price: </span>
                                        <span className="fw-bold text" style={{color: '#457900'}}>KES {product.price.toFixed(2)}</span>
                                        <span className="fw-normal text small" style={{color: '#457900'}}> per {product.unit}</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {errors.submit && (
                            <Alert variant="danger" className="mb-3">
                                {errors.submit}
                            </Alert>
                        )}
                        
                        <Form.Group className="mb-3" controlId="formRecipientName">
                            <Form.Label className="form-label-responsive fw-normal">Recipient <span className="text-danger">*</span></Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Search for recipient by name or Shamba ID" 
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                isInvalid={!!errors.recipient}
                                disabled={isSubmitting}
                                className="form-control-responsive"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.recipient}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formRecipientNumber">
                            <Form.Label className="form-label-responsive fw-normal">Recipient's Number <span className="text-danger">*</span></Form.Label>
                            
                            {/* Container for icon and input */}
                            <div className="d-flex align-items-start gap-2">
                                {/* Input wrapper */}
                                <div className="flex-grow-1">
                                    <Form.Control 
                                        type="tel" 
                                        placeholder="e.g., 0712345678 or +254712345678" 
                                        value={recipientNumber}
                                        onChange={(e) => setRecipientNumber(e.target.value)}
                                        isInvalid={!!errors.recipientNumber}
                                        disabled={isSubmitting}
                                        className="form-control-responsive"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.recipientNumber}
                                    </Form.Control.Feedback>
                                </div> 
                                
                                {/* Circular Icon Background */}
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        minWidth: '40px',
                                        flexShrink: 0,
                                        backgroundColor: '#D0F0C0',
                                    }}
                                >
                                    <TiContacts size={18} style={{color: '#457900'}} />
                                </div>
                            </div>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formGiftMessage">
                            <Form.Label className="form-label-responsive fw-normal">Gift Message <span className="text-danger">*</span></Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={4} 
                                placeholder="Write a personal message for your gift..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                isInvalid={!!errors.message}
                                disabled={isSubmitting}
                                className="form-control-responsive textarea-responsive"
                                style={{ resize: 'vertical', minHeight: '100px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted form-text-responsive">
                                This message will be sent to the recipient along with your gift.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    
                    <Modal.Footer className="px-3 px-sm-4 py-3 border-top">
                        <Button 
                            variant="success"
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-responsive w-100 fw-bold"
                            style={{backgroundColor: '#457900', borderColor: '#457900'}}
                        >
                            {isSubmitting ? 'Processing...' : 'Send Gift'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <style>{`
                .responsive-gift-modal .modal-dialog {
                    max-width: 600px;
                    margin: 1.75rem auto;
                }

                .responsive-gift-modal .modal-content {
                    border-radius: 12px;
                    border: none;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }

                .modal-body-scrollable {
                    overflow-y: auto;
                    max-height: calc(100vh - 200px);
                }

                .modal-header .btn-close {
                    font-size: 0.75rem;
                }

                /* Small screens (mobile) */
                @media (max-width: 576px) {
                    .responsive-gift-modal .modal-dialog {
                        margin: 0.5rem;
                        max-width: calc(100% - 1rem);
                        height: calc(100vh - 1rem);
                    }
                    
                    .responsive-gift-modal .modal-content {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        border-radius: 8px;
                    }
                    
                    .modal-body-scrollable {
                        overflow-y: auto;
                        flex: 1;
                        padding: 1rem !important;
                        -webkit-overflow-scrolling: touch;
                    }
                    
                    .product-info-responsive {
                        padding: 0.75rem;
                        background-color: #f8f9fa;
                        border-radius: 8px;
                        margin-bottom: 1rem !important;
                    }
                    
                    .product-name-responsive {
                        font-size: 1rem;
                        line-height: 1.4;
                    }
                    
                    .form-label-responsive {
                        font-size: 0.9rem;
                        font-weight: 500 !important;
                        margin-bottom: 0.5rem;
                    }
                    
                    .form-control-responsive {
                        font-size: 0.9rem;
                        padding: 0.75rem;
                        border-radius: 6px;
                    }
                    
                    .textarea-responsive {
                        min-height: 80px !important;
                        resize: vertical;
                    }
                    
                    .form-text-responsive {
                        font-size: 0.8rem;
                        margin-top: 0.5rem;
                    }
                    
                    .btn-responsive {
                        font-size: 1rem;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                    }
                }

                /* Extra small screens */
                @media (max-width: 400px) {
                    .responsive-gift-modal .modal-dialog {
                        margin: 0.25rem;
                        max-width: calc(100% - 0.5rem);
                        height: calc(100vh - 0.5rem);
                    }
                    
                    .modal-body-scrollable {
                        padding: 0.75rem !important;
                    }
                    
                    .product-info-responsive {
                        padding: 0.5rem;
                    }
                    
                    .form-control-responsive {
                        font-size: 0.85rem;
                        padding: 0.6rem;
                    }
                    
                    .textarea-responsive {
                        min-height: 70px !important;
                    }
                    
                    .btn-responsive {
                        font-size: 0.9rem;
                        padding: 0.65rem 1rem;
                    }
                }

                /* Large screens - ensure proper centering */
                @media (min-width: 992px) {
                    .responsive-gift-modal .modal-dialog {
                        max-width: 650px;
                        margin: 2rem auto;
                    }
                    
                    .modal-body-scrollable {
                        max-height: calc(100vh - 250px);
                        padding: 2rem !important;
                    }
                }

                /* Scrollbar styling for webkit browsers */
                .modal-body-scrollable::-webkit-scrollbar {
                    width: 6px;
                }

                .modal-body-scrollable::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }

                .modal-body-scrollable::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }

                .modal-body-scrollable::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </>
    );
};

export default GiftModal;