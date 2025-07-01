import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

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

export interface CartItem extends Product {
    quantity: number;
}

export interface ShoppingCartModalProps {
  show: boolean;
  onHide: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({ 
    show, 
    onHide, 
    cartItems, 
    onUpdateQuantity, 
    onRemoveItem, 
    onProceedToCheckout, 
    onContinueShopping 
}) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleQuantityChange = (item: CartItem, change: number) => {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            onUpdateQuantity(item.id, newQuantity);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="shopping-cart-modal">
           <Modal.Header closeButton>
                <Modal.Title className=" pe-3">Shopping Cart</Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="px-2 px-sm-3 px-md-4">
                {cartItems.length === 0 ? (
                    <div className="text-center py-4">
                        <p className="text-muted mb-0">Your cart is empty</p>
                    </div>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-3 pb-3 border-bottom">
                                <div className="d-flex align-self-stretch align-self-sm-start flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded mx-auto mx-sm-0"
                                        style={{ 
                                            width: '70px', 
                                            height: '70px', 
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                
                                <div className="flex-grow-1 ms-sm-3 mt-2 mt-sm-0 w-100">
                                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between">
                                        <div className="flex-grow-1 mb-2 mb-sm-0 text-center text-sm-start">
                                            <h6 className="mb-1 text-truncate" style={{ maxWidth: '200px', margin: '0 auto' }}>
                                                {item.name}
                                            </h6>
                                            <p className="text-success mb-0 fw-bold small">
                                                KES {item.price.toFixed(2)} / {item.unit}
                                            </p>
                                        </div>
                                        
                                        <div className="d-flex align-items-center justify-content-center justify-content-sm-end flex-nowrap gap-1">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ 
                                                    width: '28px', 
                                                    height: '28px', 
                                                    padding: 0,
                                                    minWidth: '28px'
                                                }}
                                                onClick={() => handleQuantityChange(item, -1)}
                                            >
                                                <FiMinus size={10} />
                                            </Button>
                                            
                                            <span className="fw-bold mx-1 flex-shrink-0" style={{ 
                                                minWidth: '24px', 
                                                textAlign: 'center',
                                                fontSize: '0.9rem'
                                            }}>
                                                {item.quantity}
                                            </span>
                                            
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ 
                                                    width: '28px', 
                                                    height: '28px', 
                                                    padding: 0,
                                                    minWidth: '28px'
                                                }}
                                                onClick={() => handleQuantityChange(item, 1)}
                                            >
                                                <FiPlus size={10} />
                                            </Button>
                                            
                                            <button
                                                className="btn btn-link text-danger p-0 ms-1 flex-shrink-0"
                                                style={{ 
                                                    border: 'none', 
                                                    background: 'none',
                                                    minWidth: '24px',
                                                    width: '24px',
                                                    height: '24px'
                                                }}
                                                onClick={() => onRemoveItem(item.id)}
                                                aria-label="Remove item"
                                            >
                                                <FiTrash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-3 mb-3 gap-2">
                            <h5 className="mb-0 text-center text-sm-start">Total</h5>
                            <h5 className="mb-0 text-success fw-bold text-center text-sm-end">
                                KES {calculateTotal().toFixed(2)}
                            </h5>
                        </div>
                    </div>
                )}
            </Modal.Body>
            
            {cartItems.length > 0 && (
                <Modal.Footer className="border-0 pt-0 px-2 px-sm-3 px-md-4">
                    <div className="d-flex flex-column flex-sm-row gap-2 w-100">
                        <Button
                            variant="success"
                            className="flex-fill flex-nowrap text-nowrap"
                            style={{ 
                                whiteSpace: 'nowrap',
                                minHeight: '38px'
                            }}
                            onClick={onProceedToCheckout}
                        >
                            <span className="d-none d-sm-inline">Proceed To Checkout</span>
                            <span className="d-inline d-sm-none">payment</span>
                        </Button>
                        <Button
                            variant="outline-success"
                            className="flex-fill flex-nowrap text-nowrap"
                            style={{ 
                                whiteSpace: 'nowrap',
                                minHeight: '38px'
                            }}
                            onClick={onContinueShopping}
                        >
                            <span className="d-none d-sm-inline">Continue Shopping</span>
                            <span className=" d-inline d-sm-none">Shop</span>
                        </Button>
                    </div>
                </Modal.Footer>
            )}
            
            <style>{`
                .shopping-cart-modal .modal-dialog {
                    max-width: 95vw;
                    margin: 0.5rem;
                }
                
                .shopping-cart-modal .modal-content {
                    max-height: calc(100vh - 1rem);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                .shopping-cart-modal .modal-body {
                    overflow-y: auto;
                    flex-grow: 1;
                    max-height: calc(100vh - 200px);
                }
                
                .shopping-cart-modal .modal-header {
                    flex-shrink: 0;
                    padding: 0.75rem 1rem;
                }
                
                .shopping-cart-modal .modal-footer {
                    flex-shrink: 0;
                    padding: 0.75rem 1rem;
                }
                
                @media (max-width: 575.98px) {
                    .shopping-cart-modal .modal-dialog {
                        margin: 0.25rem;
                        max-width: calc(100vw - 0.5rem);
                    }
                    
                    .shopping-cart-modal .modal-header {
                        padding: 0.5rem 0.75rem;
                    }
                    
                    .shopping-cart-modal .modal-footer {
                        padding: 0.5rem 0.75rem;
                    }
                    
                    .shopping-cart-modal .modal-body {
                        max-height: calc(100vh - 150px);
                    }
                }
                
                @media (min-width: 576px) {
                    .shopping-cart-modal .modal-dialog {
                        max-width: 540px;
                        margin: 1.75rem auto;
                    }
                }
                
                @media (min-width: 768px) {
                    .shopping-cart-modal .modal-dialog {
                        max-width: 650px;
                    }
                }
                
                @media (min-width: 992px) {
                    .shopping-cart-modal .modal-dialog {
                        max-width: 800px;
                    }
                }
                
                /* Prevent text overflow and ensure buttons stay in line */
                .shopping-cart-modal .flex-nowrap {
                    flex-wrap: nowrap !important;
                }
                
                .shopping-cart-modal .text-nowrap {
                    white-space: nowrap !important;
                }
                
                /* Ensure quantity controls don't wrap */
                .shopping-cart-modal .btn-outline-secondary {
                    flex-shrink: 0;
                }
                
                /* Better text truncation for product names */
                .shopping-cart-modal .text-truncate {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            `}</style>
        </Modal>
    );
};

export default ShoppingCartModal;