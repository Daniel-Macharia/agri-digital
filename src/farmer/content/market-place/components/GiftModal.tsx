import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        if (!recipient.trim()) {
            newErrors.recipient = 'Recipient name is required';
        }

        if (!recipientNumber.trim()) {
            newErrors.recipientNumber = 'Recipient phone number is required';
        } else if (!/^[\d\s\-\+\(\)]+$/.test(recipientNumber.trim())) {
            newErrors.recipientNumber = 'Please enter a valid phone number';
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
                dialogClassName="modal-dialog-responsive"
            >
                <Modal.Header className="modal-header d-flex justify-content-between align-items-center px-3 px-sm-4 py-2 py-sm-3" closeButton={!isSubmitting}>
                    <Modal.Title className="modal-title text-star flex-grow-1 fs-6 fs-sm-5">
                        Buy for Someone
                    </Modal.Title>
                </Modal.Header>
                
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="px-3 px-sm-4 py-2 py-sm-3 modal-body-responsive">
                        {product && (
                            <div className="d-flex flex-column flex-sm-row mb-3 product-info-responsive">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="rounded me-0 me-sm-3 mb-2 mb-sm-0 align-self-start"
                                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                                />
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 fw-bold product-name-responsive">{product.name}</h6>
                                    <p className="text-muted mb-1 small">Sold by {product.seller}</p>
                                    <p className="mb-0 fw-bold">
                                        KES {product.price.toFixed(2)} 
                                        <span className="fw-normal text-muted small"> {product.unit}</span>
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
                            <Form.Label className="form-label-responsive">Recipient <span className="text-danger">*</span></Form.Label>
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
                            <Form.Label className="form-label-responsive">Recipient's Phone Number <span className="text-danger">*</span></Form.Label>
                            <Form.Control 
                                type="tel" 
                                placeholder="Enter recipient's phone number" 
                                value={recipientNumber}
                                onChange={(e) => setRecipientNumber(e.target.value)}
                                isInvalid={!!errors.recipientNumber}
                                disabled={isSubmitting}
                                className="form-control-responsive"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.recipientNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formGiftMessage">
                            <Form.Label className="form-label-responsive">Gift Message <span className="text-danger">*</span></Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Write a personal message for your gift..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                isInvalid={!!errors.message}
                                disabled={isSubmitting}
                                className="form-control-responsive textarea-responsive"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted form-text-responsive">
                                This message will be sent to the recipient along with your gift.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    
                    <Modal.Footer className="px-3 px-sm-4 py-2 py-sm-3">
                        <Button 
                            variant="primary" 
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-responsive"
                        >
                            {isSubmitting ? 'Processing...' : 'Send Gift'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <style>{`
                .responsive-gift-modal .modal-dialog-responsive {
                    margin: 1rem;
                }

                /* Small screens (mobile) */
                @media (max-width: 576px) {
                    .responsive-gift-modal .modal-dialog-responsive {
                        margin: 0.5rem;
                        max-width: calc(100% - 1rem);
                        max-height: calc(100vh - 1rem);
                    }
                    
                    .responsive-gift-modal .modal-content {
                        max-height: calc(100vh - 1rem);
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .modal-body-responsive {
                        overflow-y: auto;
                        flex: 1;
                        padding: 0.75rem !important;
                    }
                    
                    .product-info-responsive {
                        padding: 0.5rem;
                        background-color: #f8f9fa;
                        border-radius: 0.375rem;
                    }
                    
                    .product-name-responsive {
                        font-size: 0.9rem;
                        line-height: 1.3;
                    }
                    
                    .form-label-responsive {
                        font-size: 0.875rem;
                        font-weight: 600;
                        margin-bottom: 0.25rem;
                    }
                    
                    .form-control-responsive {
                        font-size: 0.875rem;
                        padding: 0.5rem 0.75rem;
                    }
                    
                    .textarea-responsive {
                        min-height: 70px !important;
                        resize: none;
                    }
                    
                    .form-text-responsive {
                        font-size: 0.75rem;
                    }
                    
                    .btn-responsive {
                        font-size: 0.875rem;
                        padding: 0.5rem 1.5rem;
                        width: 100%;
                    }
                }

                /* Extra small screens */
                @media (max-width: 400px) {
                    .responsive-gift-modal .modal-dialog-responsive {
                        margin: 0.25rem;
                        max-width: calc(100% - 0.5rem);
                    }
                    
                    .modal-body-responsive {
                        padding: 0.5rem !important;
                    }
                    
                    .product-info-responsive {
                        padding: 0.375rem;
                    }
                    
                    .form-control-responsive {
                        font-size: 0.8rem;
                        padding: 0.4rem 0.625rem;
                    }
                    
                    .textarea-responsive {
                        min-height: 60px !important;
                    }
                    
                    .btn-responsive {
                        font-size: 0.8rem;
                        padding: 0.45rem 1rem;
                    }
                }

                /* Medium and larger screens - maintain original spacing */
                @media (min-width: 577px) {
                    .modal-body-responsive {
                        max-height: calc(100vh - 250px);
                        overflow-y: auto;
                    }
                }
            `}</style>
        </>
    );
};

export default GiftModal;