import React, { useState, ChangeEvent } from 'react';
import { MergeProductFormData, FormErrors, Product, MergeProductModalProps } from './index';
// Type definitions
/*interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    quality: string | null;
    image: string | null;
    status: string;
    unit: string;
    createdAt?: string;
    projectName?: string;
    type?: 'livestock' | 'crop';
    livestockType?: string;
    isMergedProduct?: boolean;
    componentProduct1?: string;
    componentProduct2?: string;
    product1?: string;
    product2?: string;
}

interface MergeProductFormData {
    name: string;
    product1: string;
    product2: string;
    quantity: string;
    unit: string;
    quality: string;
    image: File | null;
    price: string;
}

interface FormErrors {
    [key: string]: string;
}

interface MergeProductModalProps {
    show: boolean;
    handleClose: () => void;
    onSave: (product: Omit<Product, 'id'>) => Promise<void>;
    products: Product[];
}*/

const MergeProductModal: React.FC<MergeProductModalProps> = ({ 
    show, 
    handleClose, 
    onSave, 
    products 
}) => {
    const [form, setForm] = useState<MergeProductFormData>({
        name: '',
        product1: '',
        product2: '',
        quantity: '',
        unit: '',
        quality: '',
        image: null,
        price: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Quality options for the dropdown
    const qualityOptions: string[] = [
        'Grade 1 (Export)',
        'Grade 2 (Premium)',
        'Grade 3 (Standard)',
        'Grade A (Superior)',
        'Grade B (Good)',
        'Grade C (Fair)',
        'Premium Quality',
        'Standard Quality',
        'Organic Certified',
        'Fresh Premium',
        'Market Grade',
        'Processing Grade'
    ];

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!form.name.trim()) {
            newErrors.name = 'Product name is required';
        } else if (form.name.trim().length < 2) {
            newErrors.name = 'Product name must be at least 2 characters';
        } else if (form.name.trim().length > 50) {
            newErrors.name = 'Product name must not exceed 50 characters';
        }

        // Product selections validation
        if (!form.product1.trim()) {
            newErrors.product1 = 'First product selection is required';
        }

        if (!form.product2.trim()) {
            newErrors.product2 = 'Second product selection is required';
        }

        if (form.product1 && form.product2 && form.product1 === form.product2) {
            newErrors.product2 = 'Please select different products to merge';
        }

        // Price validation
        if (!form.price.trim()) {
            newErrors.price = 'Price is required';
        } else {
            const price = parseFloat(form.price);
            if (isNaN(price) || price <= 0) {
                newErrors.price = 'Price must be a positive number';
            } else if (price > 999999) {
                newErrors.price = 'Price cannot exceed 999,999';
            }
        }

        // Quantity validation - only digits allowed
        if (!form.quantity.trim()) {
            newErrors.quantity = 'Quantity is required';
        } else {
            const quantity = parseFloat(form.quantity);
            if (isNaN(quantity) || quantity <= 0) {
                newErrors.quantity = 'Quantity must be a positive number';
            } else if (quantity > 999999) {
                newErrors.quantity = 'Quantity cannot exceed 999,999';
            } else if (!Number.isInteger(quantity)) {
                newErrors.quantity = 'Quantity must be a whole number';
            }
        }

        // Unit validation
        if (!form.unit?.trim()) {
            newErrors.unit = 'Unit is required';
        } else if (form.unit?.trim().length > 20) {
            newErrors.unit = 'Unit must not exceed 20 characters';
        }

        // Quality validation
        if (!form.quality.trim()) {
            newErrors.quality = 'Quality is required';
        }

        // File validation - Updated to 10MB
        if (form.image) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!allowedTypes.includes(form.image.type)) {
                newErrors.image = 'Only JPEG, PNG, and GIF images are allowed';
            } else if (form.image.size > maxSize) {
                newErrors.image = 'File size must be less than 10MB';
            }
        }

        return newErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Special handler for quantity to allow only digits
    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        // Allow only digits and empty string
        if (value === '' || /^\d+$/.test(value)) {
            setForm(prev => ({ ...prev, quantity: value }));
            
            if (errors.quantity) {
                setErrors(prev => ({ ...prev, quantity: '' }));
            }
        }
    };

    // Special handler for price to allow decimal numbers
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        // Allow digits, decimal point, and empty string
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setForm(prev => ({ ...prev, price: value }));
            
            if (errors.price) {
                setErrors(prev => ({ ...prev, price: '' }));
            }
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0] || null;
        setForm(prev => ({ ...prev, image: file }));
        
        if (errors.image) {
            setErrors(prev => ({ ...prev, image: '' }));
        }
    };

    const handleSubmit = async (): Promise<void> => {
        setIsSubmitting(true);
        
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const mergedProduct: Omit<Product, 'id'> = {
                name: form.name,
                price: parseFloat(form.price),
                quantity: parseInt(form.quantity), // Parse as integer since we only allow digits
                quality: form.quality,
                unit: form.unit,
                status: 'In Stock',
                image: form.image ? URL.createObjectURL(form.image) : null,
                isMergedProduct: true,
                product1: form.product1,
                product2: form.product2,
                createdAt: new Date().toISOString()
            };

            await onSave(mergedProduct);
            resetForm();
            handleClose();
        } catch (error) {
            console.error('Error saving merged product:', error);
            setErrors({ submit: 'Failed to save product. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = (): void => {
        setForm({
            name: '',
            product1: '',
            product2: '',
            quantity: '',
            unit: '',
            quality: '',
            image: null,
            price: ''
        });
        setErrors({});
        setIsSubmitting(false);
    };

    const handleModalClose = (): void => {
        resetForm();
        handleClose();
    };

    const handleFileInputClick = (): void => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    const productOptions: string[] = Array.from(new Set(products.map(p => p.name)));

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center">
                <div className="modal-content">
                    <div className="modal-header p-0 ">
                        <h5 className="modal-title text-nowrap m-3 text-start">Add Merged Products</h5>
                        <button type="button" className="btn-close p-4" onClick={handleModalClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></button>
                    </div>
                    <div className="modal-body px-4">
                        {errors.submit && (
                            <div className="alert alert-danger mb-3">
                                {errors.submit}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label text-start">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Kachumbari"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-start">Product</label>
                            <select
                                name="product1"
                                value={form.product1}
                                onChange={handleChange}
                                className={`form-select ${errors.product1 ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                                {productOptions.map(product => (
                                    <option key={product} value={product}>{product}</option>
                                ))}
                            </select>
                            {errors.product1 && <div className="invalid-feedback">{errors.product1}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-start">Product</label>
                            <select
                                name="product2"
                                value={form.product2}
                                onChange={handleChange}
                                className={`form-select ${errors.product2 ? 'is-invalid' : ''}`}
                            >
                                <option value=""></option>
                                {productOptions.map(product => (
                                    <option key={product} value={product}>{product}</option>
                                ))}
                            </select>
                            {errors.product2 && <div className="invalid-feedback">{errors.product2}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-start">Price per kg</label>
                            <input
                                type="text"
                                name="price"
                                value={form.price}
                                onChange={handlePriceChange}
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                placeholder="50.00"
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-start">Quantity (whole numbers only)</label>
                            <input
                                type="text"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleQuantityChange}
                                className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                placeholder="3500"
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-start">Unit</label>
                            <select
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}
                                className={`form-select ${errors.unit ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Unit</option>
                                <option value="kg">kg (Kilograms)</option>
                                <option value="g">g (Grams)</option>
                                <option value="lbs">lbs (Pounds)</option>
                                <option value="tons">tons (Metric Tons)</option>
                                <option value="pieces">pieces</option>
                                <option value="boxes">boxes</option>
                                <option value="bags">bags</option>
                                <option value="liters">liters</option>
                            </select>
                            {errors.unit && <div className="invalid-feedback">{errors.unit}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-start">Quality</label>
                            <select
                                name="quality"
                                value={form.quality}
                                onChange={handleChange}
                                className={`form-select ${errors.quality ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Quality Grade</option>
                                {qualityOptions.map(quality => (
                                    <option key={quality} value={quality}>{quality}</option>
                                ))}
                            </select>
                            {errors.quality && <div className="invalid-feedback">{errors.quality}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-start">Upload Product Image</label>
                            <div 
                                className={`border border-dashed rounded d-flex flex-column align-items-center justify-content-center ${errors.image ? 'border-danger' : 'border-secondary'}`}
                                style={{ 
                                    minHeight: '120px',
                                    backgroundColor: '#f8f9fa',
                                    cursor: 'pointer'
                                }}
                                onClick={handleFileInputClick}
                            >
                                <div className="text-center">
                                    <div style={{ fontSize: '24px', color: '#28a745', marginBottom: '8px' }}>📁</div>
                                    <div style={{ fontSize: '14px', color: '#6c757d' }}>Upload Photos</div>
                                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                                        PNG, JPG, GIF up to 10MB
                                    </div>
                                </div>
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/jpg,image/png,image/gif"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {form.image && (
                                <div className="mt-2 text-success" style={{ fontSize: '12px' }}>
                                    Selected: {form.image.name} ({(form.image.size / 1024 / 1024).toFixed(2)} MB)
                                </div>
                            )}
                            {errors.image && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{errors.image}</div>}
                        </div>
                    </div>
                    <div className="modal-footer border-0 pt-0">
                        <button
                            type="button"
                            className="btn btn-outline-warning text-nowrap w-20 py-1.5"
                            onClick={handleModalClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-success text-nowrap w-20 py-2"
                            onClick={handleSubmit}
                            style={{ backgroundColor: '#556B2F' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MergeProductModal;