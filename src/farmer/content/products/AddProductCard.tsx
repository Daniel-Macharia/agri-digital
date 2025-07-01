import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoAdd } from "react-icons/io5";

interface AddProductCardProps {
    onAddNewProduct: () => void;
}

const AddProductCard: React.FC<AddProductCardProps> = ({ onAddNewProduct }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = (): void => {
        setIsHovered(true);
    };

    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };

    const handleAddProduct = (): void => {
        onAddNewProduct();
    };

    return (
        <div 
            className="card h-100 d-flex align-items-center justify-content-center border-2 border-dashed"
            style={{
                minHeight: '400px',
                borderColor: '#ddd',
                borderStyle: 'dashed',
                backgroundColor: '#fafafa',
                borderRadius: '12px'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-body text-center">
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <div className="mb-3">
                            <button
                                className="btn btn-link p-3 d-flex align-items-center justify-content-center mx-auto"
                                onClick={handleAddProduct}
                                style={{
                                    fontSize: '3rem',
                                    color: isHovered ? '#6B8E23' : '#333',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    width: '80px',
                                    height: '80px',
                                    transition: 'color 0.2s ease',
                                    fontWeight: 'bold'
                                }}
                                type="button"
                                aria-label="Add new product"
                            >
                                <IoAdd size={40} />
                            </button>
                        </div>
                        <h6 className="fw-bold mb-0" style={{ color: '#333', fontSize: '1.1rem' }}>
                            Add New Product
                        </h6>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AddProductCard;