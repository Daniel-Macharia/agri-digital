import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

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
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="lg" 
      className="scm-modal"
      dialogClassName="scm-modal-dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title className="pe-3">Shopping Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body className="scm-body px-3 px-md-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted mb-0">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="scm-items-wrapper d-flex flex-column align-items-center">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="scm-item d-flex gap-3 mb-3 pb-3 border-bottom align-items-center w-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="scm-item-img"
                  />

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1 fw-semibold scm-text-truncate" style={{ maxWidth: '180px' }}>
                          {item.name}
                        </h6>
                        <p className="mb-0 small text-muted">{item.seller}</p>
                        <p className="text-success mb-0 fw-bold small">
                          KES {item.price.toFixed(2)} / {item.unit}
                        </p>
                      </div>

                      <button
                        className="btn btn-link text-danger p-0 ms-2"
                        style={{ minWidth: '24px', width: '24px', height: '24px' }}
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>

                    <div className="btn-group mt-2 rounded-pill scm-qty-group">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle bg-white border-0 d-flex align-items-center justify-content-center"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        <FiMinus size={16} />
                      </Button>

                      <span className="fw-bold mx-2 d-flex align-items-center justify-content-center">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-circle bg-white border-0 d-flex align-items-center justify-content-center"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        <FiPlus size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="scm-total d-flex justify-content-between align-items-center pt-3 mb-3 w-100">
              <h5 className="mb-0">Total</h5>
              <h5 className="mb-0 text-success fw-bold">KES {calculateTotal().toFixed(2)}</h5>
            </div>
          </>
        )}
      </Modal.Body>

      {cartItems.length > 0 && (
        <Modal.Footer className="border-0 pt-0 px-3 px-md-4">
          <Row className="w-100 gx-2">
            <Col xs={12} md={6}>
              <Button
                variant="success py-2"
                className="w-100"
                style={{ minHeight: '40px', borderRadius: '6px' }}
                onClick={onProceedToCheckout}
              >
                <span className="d-none d-sm-inline">Proceed To Checkout</span>
                <span className="d-inline d-sm-none">Checkout</span>
              </Button>
            </Col>
            <Col xs={12} md={6} className="mt-2 mt-md-0">
              <Button
                variant="outline-warning"
                className="w-100"
                style={{ minHeight: '40px', borderRadius: '6px' }}
                onClick={onContinueShopping}
              >
                <span className="d-none d-sm-inline">Continue Shopping</span>
                <span className="d-inline d-sm-none">Shop</span>
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      )}

      <style>{`
        /* Enhanced centering for the modal */
        .scm-modal-dialog {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: calc(100vh - 1rem) !important;
          margin: 0.5rem !important;
        }

        .scm-modal .modal-content {
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0;
        }

        /* Ensure modal backdrop centers properly */
        .scm-modal .modal-dialog-centered {
          display: flex;
          align-items: center;
          min-height: calc(100% - 1rem);
        }

        .scm-text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .scm-item-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 8px;
        }

        .scm-qty-group {
          background-color: #cefae3;
        }

        .scm-items-wrapper {
          width: 100%;
        }

        .scm-item {
          max-width: 100%;
        }

        .scm-total {
          text-align: center;
        }

        @media (min-width: 768px) {
          .scm-items-wrapper {
            padding: 0 20px;
          }

          .scm-total {
            padding: 0 20px;
          }
          
          .scm-modal-dialog {
            margin: 1.75rem auto !important;
          }
        }

        /* Additional viewport centering for smaller screens */
        @media (max-width: 767px) {
          .scm-modal-dialog {
            margin: 0.5rem !important;
            min-height: calc(100vh - 1rem) !important;
          }
        }
      `}</style>
    </Modal>
  );
};

export default ShoppingCartModal;