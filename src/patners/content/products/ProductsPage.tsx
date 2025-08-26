import { useState } from "react";
import { Button, Row, Col } from 'react-bootstrap';
import ProductList from "./ProductList";
import MergeProductModal from "./MergeProductModal";
import ProjectSelectionModal from "./ProjectSelectionModal";
import LivestockProjectModal from "./LivestockProjectModal";
import CropProjectModal from "./CropProjectModal";
import{Product, LivestockFormData, CropFormData, LivestockType} from './index';


function ProductsPage(): JSX.Element {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showProjectSelection, setShowProjectSelection] = useState<boolean>(false);
    const [showLivestockModal, setShowLivestockModal] = useState<boolean>(false);
    const [showCropModal, setShowCropModal] = useState<boolean>(false);
    
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "Tomatoes",
            price: 50,
            quantity: 3500,
            quality: "Grade 1 (Export)",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop&crop=center",
            status: "In Stock"
        },
        {
            id: 2,
            name: "onions",
            price: 50,
            quantity: 3500,
            quality: "Grade 1 (Export)",
            image: "https://plus.unsplash.com/premium_photo-1723708958105-09e29205e551?w=600&auto=format&fit=crop",
            status: "In Stock"
        },
        {
            id: 3,
            name: "cabbage",
            price: 50,
            quantity: 3500,
            quality: "Grade 1 (Export)",
            image: "https://images.unsplash.com/photo-1486328228599-85db4443971f?w=600&auto=format&fit=crop",
            status: "In Stock"
        },
        {
            id: 4,
            name: "Milk",
            price: 50,
            quantity: 3500,
            quality: "Grade 1 (Export)",
            image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&crop=center",
            status: "In Stock"
        },
        {
            id: 5,
            name: "Banana",
            price: 50,
            quantity: 3500,
            quality: "Lorem Ipsum",
            image: "https://images.unsplash.com/photo-1618581596478-f4ec3fc40804?w=600&auto=format&fit=crop",
            status: "In Stock"
        }
    ]);
     
     const handleSaveMerged = async (mergedProduct: Omit<Product, 'id'>): Promise<void> => {
    setProducts(prev => [...prev, { id: Date.now(), ...mergedProduct }]);
};

    const handleDeleteProduct = (productId: number): void => {
        setProducts(prev => prev.filter(product => product.id !== productId));
    };

    const handleEditProduct = (productId: number, updatedData: Partial<Product>): void => {
        setProducts(prev => prev.map(product => 
            product.id === productId 
                ? { ...product, ...updatedData }
                : product
        ));
    };

    // New Project Modal handlers
    const handleAddNewProduct = (): void => {
        setShowProjectSelection(true);
    };

    const handleCloseProjectSelection = (): void => {
        setShowProjectSelection(false);
    };

    const handleCropProject = (): void => {
        setShowProjectSelection(false);
        setShowCropModal(true);
    };

    const handleLivestockProject = (): void => {
        setShowProjectSelection(false);
        setShowLivestockModal(true);
    };

    const handleBackToProjectSelection = (): void => {
        setShowLivestockModal(false);
        setShowCropModal(false);
        setShowProjectSelection(true);
    };

    const handleCloseLivestockModal = (): void => {
        setShowLivestockModal(false);
    };

    const handleCloseCropModal = (): void => {
        setShowCropModal(false);
    };

    const handleLivestockSubmit = (formData: LivestockFormData): void => {
        console.log('Livestock Project Data:', formData);
        // Add your logic here to handle the livestock project creation
        const newProduct: Product = {
            id: Date.now(),
            name: `${formData.livestockType.charAt(0).toUpperCase() + formData.livestockType.slice(1)} Project`,
            projectName: formData.projectName,
            type: 'livestock',  
            livestockType: formData.livestockType,
            price: 0,
            quantity: 0,
            quality: "New Project",
            image: getImageForLivestock(formData.livestockType as LivestockType),
            status: "New Project"
        };
        setProducts(prev => [...prev, newProduct]);
        setShowLivestockModal(false);
    };

    const handleCropSubmit = (formData: CropFormData): void => {
        console.log('Crop Project Data:', formData);
        // Add your logic here to handle the crop project creation
        const newProduct: Product = {
            id: Date.now(),
            name: "Crop Project",
            projectName: formData.projectName,
            type: 'crop',
            price: 0,
            quantity: 0,
            quality: "New Project",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop&crop=center",
            status: "New Project"
        };
        setProducts(prev => [...prev, newProduct]);
        setShowCropModal(false);
    };

    const getImageForLivestock = (type: LivestockType): string => {
        const images: Record<LivestockType, string> = {
            cow: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&crop=center",
            pig: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&crop=center",
            goat: "https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?w=400&h=300&fit=crop&crop=center"
        };
        return images[type] || images.cow;
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#EEEEEE' }}>
            {/* Sidebar Space */}
            {/* Main Content Area */}
            <div className="flex-grow-1 py-4 pe-4" style={{ paddingLeft: '5px', paddingRight: '2px' }}>
                <div className="container-fluid" style={{ backgroundColor: '#EEEEEE' }}>
                    {/* Header */}
                    <Row className="mb-4">
                        <Col xs={12} md={8} lg={9} className="d-flex align-items-center">
                            <div>
                                <h2 className="mb-0">My Products</h2>
                                <p className="text-muted mb-0" style={{ fontSize: '14px' }}>Manage your products for sale</p>
                            </div>
                        </Col>
                        <Col xs={12} md={4} lg={3} className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
                            <Button
                                variant="success"
                                className="px-3 w-100 w-md-auto py-1"
                                style={{ 
                                    minHeight: '38px',
                                    fontSize: '15px',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#556B2F'
                                }}
                                onClick={() => setShowModal(true)}
                            >
                                Merge Products
                            </Button>
                        </Col>
                    </Row>

                    {/* Products Grid */}
                    <Row>
                        <Col xs={12}>
                            <ProductList
                                products={products}
                                onProductUpdate={(id: number) => console.log("Update product", id)}
                                onProductDelete={handleDeleteProduct}
                                onProductEdit={handleEditProduct}
                                onAddNewProduct={handleAddNewProduct}
                            />
                        </Col>
                    </Row>

                    {/* Existing Merge Modal */}
                    <MergeProductModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        onSave={handleSaveMerged}
                        products={products}
                    />

                    {/* New Project Modals */}
                    <ProjectSelectionModal
                        show={showProjectSelection}
                        onHide={handleCloseProjectSelection}
                        onCropProject={handleCropProject}
                        onLivestockProject={handleLivestockProject}
                    />

                    <LivestockProjectModal
                        show={showLivestockModal}
                        onHide={handleCloseLivestockModal}
                        onBack={handleBackToProjectSelection}
                        onSubmit={handleLivestockSubmit}
                    />

                    <CropProjectModal
                        show={showCropModal}
                        onHide={handleCloseCropModal}
                        onBack={handleBackToProjectSelection}
                        onSubmit={handleCropSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;