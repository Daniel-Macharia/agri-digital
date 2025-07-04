import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { FiShoppingCart, FiGift, FiPackage, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types';
import Pagination from '../components/Pagination';
import ShoppingCartModal from '../components/ShoppingCartModal';
import GiftModal from '../components/GiftModal';

// Extended product list with farming-related items
const initialProducts: Product[] = [
    { id: 1, name: 'Bulls', seller: 'Peter Bloom', price: 80000, unit: 'per Bull', rating: 4, image: 'https://images.unsplash.com/photo-1516640000-9951e17c051d?w=600&auto=format&fit=crop', category: 'livestock' },
    { id: 2, name: 'Planting Laborer', seller: 'Peter Bloom', price: 250, unit: 'per hr', rating: 4, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', category: 'services' },
    { id: 3, name: 'Tractor Rental', seller: 'Peter Bloom', price: 2500, unit: 'per day', rating: 4, image: 'https://images.unsplash.com/photo-1429991889170-afd56b2a1210?w=600&auto=format&fit=crop', category: 'equipment' },
    { id: 4, name: 'Fresh Carrots', seller: 'Mary Garden', price: 180, unit: 'per kg', rating: 5, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop', category: 'vegetables' },
    { id: 5, name: 'Irrigation System', seller: 'AgriTech Solutions', price: 15000, unit: 'per unit', rating: 5, image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600&auto=format&fit=crop', category: 'equipment' },
    { id: 6, name: 'Heifer', seller: 'Green Fields Co', price: 44450, unit: 'per Heifer', rating: 4, image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600&auto=format&fit=crop', category: 'supplies' },
    { id: 7, name: 'Harvesting Service', seller: 'Farm Helpers Ltd', price: 300, unit: 'per hr', rating: 4, image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop', category: 'services' },
    { id: 8, name: 'Sweet Corn', seller: 'Sunny Acres', price: 120, unit: 'per dozen', rating: 5, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop', category: 'vegetables' },
    { id: 9, name: 'Greenhouse Kit', seller: 'AgriStructures', price: 8500, unit: 'per unit', rating: 4, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'equipment' },
    { id: 10, name: 'Dairy Goats', seller: 'Diel Man', price: 15000, unit: 'per Buck/Billy', rating: 4, image: 'https://plus.unsplash.com/premium_photo-1681882343875-0c709293d624?w=600&auto=format&fit=crop', category: 'livestock' },
    { id: 11, name: 'Rose Flower', seller: 'Quality Seeds Co', price: 800, unit: 'per 10kg', rating: 5, image: 'https://images.unsplash.com/photo-1523437237164-d442d57cc3c9?w=600&auto=format&fit=crop', category: 'Hoticulture' },
    { id: 12, name: 'Chicks', seller: 'AgriExperts', price: 100, unit: 'per chick', rating: 5, image: 'https://images.unsplash.com/photo-1589923188651-268a9765e432?w=600&auto=format&fit=crop', category: 'poultry' }
];

// Additional products that can be loaded via API simulation
const additionalProducts: Product[] = [
    { id: 13, name: 'Cabbage', seller: 'Fresh Farms', price: 80, unit: 'per head', rating: 4, image: 'https://images.unsplash.com/photo-1594282893767-6b8d3e2d7d4e?w=400&h=300&fit=crop', category: 'vegetables' },
    { id: 14, name: 'Soil Testing Kit', seller: 'AgriTest Pro', price: 1200, unit: 'per kit', rating: 5, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'supplies' },
    { id: 15, name: 'Pruning Service', seller: 'Garden Masters', price: 200, unit: 'per hr', rating: 4, image: 'https://images.unsplash.com/photo-1529313780224-1a12b68bed16?w=600&auto=format&fit=crop', category: 'services' },
    { id: 16, name: 'Onion Bulbs', seller: 'Bulb Specialists', price: 350, unit: 'per kg', rating: 4, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=300&fit=crop', category: 'vegetables' },
    { id: 17, name: 'Water Pump', seller: 'Hydro Equipment', price: 3500, unit: 'per unit', rating: 5, image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=400&h=300&fit=crop', category: 'equipment' },
    { id: 18, name: 'Mulching Service', seller: 'Eco Gardens', price: 180, unit: 'per sq meter', rating: 4, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', category: 'services' }
];

interface LoadMoreResponse {
    products: Product[];
    hasMore: boolean;
}

const MarketplacePage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const [showGiftModal, setShowGiftModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [sortBy, setSortBy] = useState<string>('rating');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);

    const productsPerPage = 6;

    // Simulate API call to fetch more products
    const fetchMoreProducts = async (): Promise<LoadMoreResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const remainingProducts = additionalProducts.filter(
                    product => !products.some(p => p.id === product.id)
                );
                
                resolve({
                    products: remainingProducts.slice(0, 6),
                    hasMore: remainingProducts.length > 6
                });
            }, 1500); // Simulate network delay
        });
    };

    // Function to load more products
    const handleLoadMore = async () => {
        if (loading) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetchMoreProducts();
            if (response.products.length > 0) {
                setProducts(prev => [...prev, ...response.products]);
                setHasMoreProducts(response.hasMore);
            } else {
                setHasMoreProducts(false);
            }
        } catch (err) {
            setError('Failed to load more products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Sort products based on selected criteria
    const sortedProducts = React.useMemo(() => {
        const sorted = [...products];
        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'rating':
            default:
                return sorted.sort((a, b) => b.rating - a.rating);
        }
    }, [products, sortBy]);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const currentProducts = sortedProducts.slice(
        (currentPage - 1) * productsPerPage, 
        currentPage * productsPerPage
    );

    // Reset to first page when sorting changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy]);

    const handleAddToCart = (product: Product) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === product.id);
            if (isItemInCart) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    
    const handleUpdateQuantity = (itemId: number, quantity: number) => {
        setCartItems(prev => 
            prev.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const handleRemoveItem = (itemId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleProceedToCheckout = () => {
        setShowCart(false);
        navigate('checkout', { state: { cartItems: cartItems } });
    };

    const handleSendGift = (giftData: any) => {
        console.log("Gift Sent:", giftData);
        setShowGiftModal(false);
    };

    // Handle product image click to navigate to product details
    const handleProductClick = (productId: number) => {
        navigate(`/farmer/market-place/product/${productId}`);
    };

    const getCategoryBadgeColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'vegetables': 'success',
            'services': 'primary',
            'equipment': 'warning',
            'supplies': 'info',
            'seeds': 'secondary'
        };
        return colors[category] || 'secondary';
    };

    return (
        <div style={{ backgroundColor: 'grey', minHeight: '100vh' }}>
            <Container fluid className="py-2 py-md-3" style={{ backgroundColor: '#EEEEEE' }}>
                {/* Header Section */}
                <div className="mb-3 mb-md-4 text-start">
                    <Row>
                        <Col xs={12}>
                            <h2 className="fw-bold mb-1 fs-3 fs-md-2">Market Place</h2>
                            <p className="text-muted mb-0 d-none d-md-block">
                                Discover quality farming products, services, and equipment
                            </p>
                        </Col>
                    </Row>
                </div>

                {/* Controls Section */}
                <Row className="mb-3 mb-md-4">
                    <Col xs={12} lg={6} className="mb-2 mb-lg-0">
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            <Button 
                                variant="link" 
                                className="text-dark ps-0 text-decoration-none d-flex align-items-center" 
                                onClick={() => navigate('track-order')}
                            >
                                <FiPackage className="me-1"/> 
                                <span className="d-none d-sm-inline">Track Order</span>
                                <span className="d-sm-none">Track</span>
                            </Button>
                            <Button 
                                variant="link" 
                                className="text-dark text-decoration-none d-flex align-items-center" 
                                onClick={() => setShowCart(true)}
                            >
                                <FiShoppingCart className="me-1"/> 
                                <span className="d-none d-sm-inline">My Cart</span>
                                <span className="d-sm-none">Cart</span>
                                {cartItems.length > 0 && (
                                    <span className="badge bg-danger ms-1">
                                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                    </span>
                                )}
                            </Button>
                            <span className="badge bg-light text-dark ms-2">
                                {products.length} Products
                            </span>
                        </div>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className="d-flex flex-column flex-sm-row flex-nowrap gap-2 justify-content-lg-end">
                            <Form.Select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-grow-1 flex-fill"
                                style={{ maxWidth: '250px' }}
                            >
                                <option value="rating">Sort by: Best Ratings</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </Form.Select>
                            {hasMoreProducts && (
                                <Button 
                                    variant="outline-success"
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 flex-fill"
                                    style={{ minWidth: '100px' }}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner size="sm" className="me-1" />
                                            <span className="d-none d-sm-inline">Loading...</span>
                                            <span className="d-sm-none">...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiRefreshCw className="me-1" />
                                            <span className="d-none d-sm-inline">Load More</span>
                                            <span className="d-sm-none">More</span>
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* Error Alert */}
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                {/* Products Grid */}
                <Row xs={1} sm={2} lg={3} xl={3} className="g-3 g-md-4 ms-3">
                    {currentProducts.map(product => (
                        <Col key={product.id}>
                            <Card className="h-100 shadow-sm border-0 gap-0 product-card">
                                <div 
                                    className="position-relative cursor-pointer" 
                                    style={{ top: '0', left: '0', right: '0'}}
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <Card.Img 
                                        variant="top" 
                                        src={product.image} 
                                        className="product-image"
                                        style={{
                                            height: '200px', 
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className={`badge bg-${getCategoryBadgeColor(product.category)} text-capitalize`}>
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column text-start row" style={{ padding: "4px"}}>
                                    <Card.Title className="fs-6 fs-md-5 mb-0 text-start">
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text className="text-muted small mb-0 text-start">
                                        {product.seller}
                                    </Card.Text>
                                    <div className="text-warning mb-0 text-start" style={{ fontSize: '0.9rem' }}>
                                        {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                                    </div>
                                    <Card.Text className="fw-bold mb-3 text-start">
                                        KES {product.price.toLocaleString()} 
                                        <span className="fw-semibold text-dark"> {product.unit}</span>
                                    </Card.Text>
                                    <div className="mt-auto flex-nowrap gap-3 align-items-center row col-sm-12" style={{ padding: "0px"}}>
                                        <Button 
                                            variant="success" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(product);
                                            }}
                                            className="flex-fill d-flex align-items-center justify-content-center row col-sm-6 gap-0"
                                            style={{ maxWidth: '120px', height: '38px', fontSize: '0.875rem', backgroundColor: '#556B2F' }}
                                        >
                                            <FiShoppingCart className="col-sm-4" size={14} style={{margin: "0px"}} />
                                            <span className="text-nowrap col-sm-6" style={{margin: "0px"}}>Add to Cart</span>
                                        </Button>
                                        <Button 
                                            variant="outline-warning" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProduct(product); 
                                                setShowGiftModal(true);
                                            }}
                                            className="flex-shrink-0 d-flex align-items-center justify-content-center col-sm-6 gap-0"
                                            style={{ maxWidth: '120px', height:'38px', fontSize: '0.875rem' }}
                                        >
                                            <FiGift className="me-0 col-sm-4" size={14} />
                                            <span className="text-nowrap col-sm-6">Gift This</span>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 mt-md-5 d-flex justify-content-center">
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={100} 
                            onPageChange={(page) => setCurrentPage(page)} 
                        />
                    </div>
                )}

                {/* No More Products Message */}
                {!hasMoreProducts && products.length > initialProducts.length && (
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            🎉 You've seen all available products! Check back later for new items.
                        </p>
                    </div>
                )}
            </Container>

            {/* Modals */}
            <ShoppingCartModal 
                show={showCart}
                onHide={() => setShowCart(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onProceedToCheckout={handleProceedToCheckout}
                onContinueShopping={() => setShowCart(false)} 
            />

            <GiftModal 
                show={showGiftModal}
                onHide={() => setShowGiftModal(false)}
                product={selectedProduct}
                onSendGift={handleSendGift}
            />

            <style>{`
                .product-card:hover {
                    transform: translateY(-2px);
                    transition: transform 0.3s ease;
                }
                
                .product-card:hover .product-image {
                    transform: scale(1.05);
                }
                
                .cursor-pointer {
                    cursor: pointer;
                }
                
                @media (max-width: 576px) {
                    .product-card .card-body {
                        padding: 0.75rem;
                    }
                    
                    .d-flex.gap-2.flex-nowrap button {
                        font-size: 0.75rem !important;
                        padding: 0.375rem 0.5rem;
                    }
                    
                    .d-flex.gap-2.flex-nowrap button .me-1 {
                        margin-right: 0.25rem !important;
                    }
                }
                
                @media (max-width: 320px) {
                    .d-flex.gap-2.flex-nowrap {
                        gap: 0.25rem !important;
                    }
                    
                    .d-flex.gap-2.flex-nowrap button {
                        font-size: 0.7rem !important;
                        padding: 0.25rem 0.375rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default MarketplacePage;