import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import AddProductCard from './AddProductCard';
import { Product, EditData, ProductListProps } from './index';

const ProductList: React.FC<ProductListProps> = ({
    products,
    onProductUpdate,
    onProductDelete,
    onProductEdit,
    onAddNewProduct
}) => {
    const handleProductUpdate = (productId: number): void => {
        onProductUpdate(productId);
    };

    const handleProductDelete = (productId: number): void => {
        onProductDelete(productId);
    };

    const handleProductEdit = (productId: number, updatedData: EditData): void => {
        onProductEdit(productId, updatedData);
    };

    const handleAddNewProduct = (): void => {
        onAddNewProduct();
    };

    return (
        <Row className="g-4">
            {/* Add New Product Card */}
            <Col xs={12} sm={10} md={4} lg={4} xl={4}>
                <AddProductCard onAddNewProduct={handleAddNewProduct} />
            </Col>
                        
            {/* Existing Product Cards */}
            {products.map((product: Product) => (
                <Col key={product.id} xs={12} sm={10} md={4} lg={4} xl={4}>
                    <ProductCard
                        product={product}
                        onUpdate={() => handleProductUpdate(product.id)}
                        onDelete={() => handleProductDelete(product.id)}
                        onEdit={(updatedData: EditData) => handleProductEdit(product.id, updatedData)}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;