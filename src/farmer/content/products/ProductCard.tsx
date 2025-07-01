import React, { useState } from 'react';
import { VscTrash } from "react-icons/vsc";
import { PiEraserThin } from "react-icons/pi";
import { PiCheckThin } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { EditData, ProductCardProps} from './index';
// Updated Product interface to include all properties used in ProductCard
/*interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    quality: string | null;
    image: string | null;
    status: string;
    projectName?: string;
    type?: 'livestock' | 'crop';
    livestockType?: string;
    unit?: string;
    isMergedProduct?: boolean;
    componentProduct1?: string;
    componentProduct2?: string;
    product1?: string;
    product2?: string;
}

interface EditData {
    name: string;
    price: number;
    quantity: number;
    quality: string | null;
    componentProduct1: string;
    componentProduct2: string;
}

interface ProductCardProps {
    product: Product;
    onUpdate: () => void;
    onDelete: () => void;
    onEdit: (editData: EditData) => void;
}*/

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editData, setEditData] = useState<EditData>({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        quality: product.quality,
        componentProduct1: product.componentProduct1 || '',
        componentProduct2: product.componentProduct2 || ''
    });

    const isNewProject: boolean = product.status === "New Project";
    const isMergedProduct: boolean = product.isMergedProduct || false;

    const handleEditToggle = (): void => {
        if (isEditing) {
            // Save changes
            onEdit(editData);
            setIsEditing(false);
        } else {
            // Start editing
            setIsEditing(true);
        }
    };

    const handleCancelEdit = (): void => {
        setIsEditing(false);
        setEditData({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            quality: product.quality,
            componentProduct1: product.componentProduct1 || '',
            componentProduct2: product.componentProduct2 || ''
        });
    };

    const handleInputChange = (field: keyof EditData, value: string | number): void => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, bgColor: string): void => {
        e.currentTarget.style.backgroundColor = bgColor;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.currentTarget.style.backgroundColor = 'transparent';
    };

    return (
        <div className="card h-100 shadow-sm" style={{ borderRadius: '12px', position: 'relative' }}>
            <div className="position-relative">
                <img 
                    src={product.image ??''} 
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                />
                {/* Status badge - top right */}
                <span 
                    className={`badge position-absolute ${isNewProject ? 'bg-info' : 'bg-warning'}`}
                    style={{ 
                        top: '10px', 
                        right: '10px', 
                        fontSize: '10px', 
                        fontWeight: '600', 
                        padding: '4px 8px',
                        borderRadius: '8px'
                    }}
                >
                    {product.status}
                </span>
            </div>
            
            <div className="card-body p-3">
                {/* Product Name and Actions Row */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="flex-grow-1 d-flex align-items-center">
                        {isEditing && !isMergedProduct ? (
                            <input 
                                type="text"
                                className="form-control form-control-sm fw-bold"
                                value={editData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                style={{ fontSize: '16px', border: 'none', padding: '0', background: 'transparent' }}
                            />
                        ) : (
                            <h6 className="fw-bold mb-0" style={{ fontSize: '16px', color: '#333' }}>{product.name}</h6>
                        )}
                    </div>
                    <div className="d-flex gap-1 ">
                        <button 
                            className="btn btn-link p-1 text-success d-flex align-items-center justify-content-center"
                            onClick={handleEditToggle}
                            style={{ 
                                fontSize: '14px', 
                                width: '24px', 
                                height: '24px',
                                borderRadius: '50%',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => handleMouseEnter(e, '#f0f8f0')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isEditing ? <PiCheckThin /> : <PiEraserThin />}
                        </button>
                        <button 
                            className="btn btn-link p-1 d-flex align-items-center justify-content-center"
                            onClick={isEditing ? handleCancelEdit : onDelete}
                            style={{ 
                                fontSize: '14px', 
                                width: '24px', 
                                height: '24px',
                                borderRadius: '50%',
                                transition: 'all 0.2s ease',
                                color: '#ff6b6b'
                            }}
                            onMouseEnter={(e) => handleMouseEnter(e, '#ffeaea')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isEditing ? <IoClose /> : <VscTrash />}
                        </button>
                    </div>
                </div>

                {/* Component Products Display - Modified for merged products */}
                {isMergedProduct && (
                    <div className="mb-3">
                        <p className="text-muted mb-0 text-start" style={{ fontSize: '13px' }}>
                            {product.product1 || product.componentProduct1} +  {product.product2 || product.componentProduct2}
                        </p>
                    </div>
                )}

                {/* Product Type/Variety - Only for non-merged, non-new projects */}
                {!isNewProject && !isMergedProduct && (
                    <p className="text-muted mb-3 text-start" style={{ fontSize: '13px', margin: '0 0 12px 0' }}>
                        {product.projectName || 'Roma VF'}
                    </p>
                )}

                {/* Project Type Badge */}
                {product.type && !isMergedProduct && (
                    <div className="mb-3">
                        <span className="badge bg-secondary" style={{ fontSize: '10px', padding: '4px 8px' }}>
                            {product.type === 'livestock' ? `${product.livestockType} project` : 'Crop project'}
                        </span>
                    </div>
                )}
                
                {!isNewProject && (
                    <>
                        {/* Price Section */}
                        <div className="d-flex align-items-center mb-3">
                            <i className="fas fa-tag text-success me-2" style={{ fontSize: '14px' }}></i>
                            {isEditing ? (
                                <div className="d-flex align-items-center">
                                    <span className="me-2" style={{ fontSize: '14px', fontWeight: '600' }}>KES</span>
                                    <input 
                                        type="number"
                                        className="form-control form-control-sm fw-bold"
                                        value={editData.price}
                                        onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                                        style={{ width: '60px', fontSize: '14px' }}
                                    />
                                    <span className="ms-2" style={{ fontSize: '14px' }}>per {product.unit || 'kg'}</span>
                                </div>
                            ) : (
                                <span className="fw-bold" style={{ fontSize: '14px', color: '#333' }}>
                                    KES {product.price} per {product.unit || 'kg'}
                                </span>
                            )}
                        </div>
                        
                        {/* Quantity Section */}
                        <div className="mb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted" style={{ fontSize: '12px' }}>Quantity ({product.unit || 'kg'})</small>
                                {isEditing ? (
                                    <input 
                                        type="number"
                                        className="form-control form-control-sm fw-medium text-end"
                                        value={editData.quantity}
                                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                                        style={{ width: '80px', fontSize: '13px' }}
                                    />
                                ) : (
                                    <div className="fw-medium" style={{ fontSize: '13px', color: '#333' }}>
                                        {product.quantity.toLocaleString()}{product.unit || 'kg'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quality Section */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted" style={{ fontSize: '12px' }}>Quality</small>
                                {isEditing ? (
                                    <input 
                                        type="text"
                                        className="form-control form-control-sm fw-medium text-end"
                                        value={editData.quality}
                                        onChange={(e) => handleInputChange('quality', e.target.value)}
                                        style={{ width: '120px', fontSize: '13px' }}
                                    />
                                ) : (
                                    <div className="fw-medium" style={{ fontSize: '13px', color: '#333' }}>
                                        {product.quality}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
                
                {/* Action Button */}
                <button 
                    className="btn btn-success w-100 fw-medium"
                    onClick={onUpdate}
                    style={{ 
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                >
                    {isNewProject ? 'Configure Project' : 'Update on Market Place'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;