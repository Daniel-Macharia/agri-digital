import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { FiShoppingCart, FiGift, FiPackage, FiRefreshCw } from 'react-icons/fi';
import { FaRegCheckCircle} from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types';
import Pagination from '../components/Pagination';
import ShoppingCartModal from '../components/ShoppingCartModal';
import GiftModal from '../components/GiftModal';
import '../components/Market.css';

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
    { id: 11, name: 'Rose Flower', seller: 'Quality Seeds Co', price: 800, unit: 'per 10kg', rating: 5, image: 'https://images.unsplash.com/photo-1523437237164-d442d57cc3c9?w=600&auto=format&fit=crop', category: 'Horticulture' },
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
    const [notification, setNotification] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const productsPerPage = 6;

    // Update cartCount when cartItems change
    useEffect(() => {
        setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
    }, [cartItems]);

    //API call to fetch more products
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
        setNotification(`"${product.name}" added successfully to your cart`);
        setTimeout(() => setNotification(''), 3000);
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
            'seeds': 'secondary',
            'livestock': 'danger',
            'poultry': 'dark',
            'Horticulture': 'success'
        };
        return colors[category] || 'secondary';
    };

    return (
        <div className="mkt-marketplace">
            <div className="mkt-bg-container">
                <Container fluid className="mkt-container-fluid py-4 px-0" style={{backgroundColor: "#efeeeeff"}}>
                    {/* Header Section */}
                    <Row className="mkt-header-row mb-4">
                        <Col xs={12}>
                            <h2 className="mkt-title fw-bold mb-2">Market Place</h2>
                            <p className="mkt-subtitle text-muted mb-0 d-none d-md-block">
                                Discover quality farming products, services, and equipment
                            </p>
                        </Col>
                    </Row>
                    
                    {/* Notification */}
                    {notification && (
                        <Row className="mkt-notification-row mb-3">
                            <Col xs={12}>
                                <Alert variant="success" className="mkt-notification-alert d-flex align-items-center py-2 mb-3">
                                    <FaRegCheckCircle className="mkt-check-icon me-0 me-sm-2" />
                                    <span className="mkt-notification-text">{notification}</span>
                                </Alert>
                            </Col>
                        </Row>
                    )}

                    {/* Controls Section */}
                    <Row className="mkt-controls-row mb-4">
                        <Col xs={12} lg={6} className="mkt-controls-left mb-3 mb-lg-0">
                            <div className="mkt-nav-links d-flex gap-4 align-items-center">
                                <Button 
                                    variant="link" 
                                    className="mkt-track-order-btn text-dark p-0 text-decoration-none d-flex align-items-center" 
                                    onClick={() => navigate('track-order')}
                                >
                                    <FiPackage className="mkt-track-icon me-2" size={16} /> 
                                    <span className="mkt-track-text fw-normal">Track Order</span>
                                </Button>
                                <Button 
                                    variant="link" 
                                    className="mkt-cart-btn text-dark p-0 text-decoration-none d-flex align-items-center position-relative" 
                                    onClick={() => setShowCart(true)}
                                >
                                     {cartCount > 0 && (
                                        <Badge 
                                            bg="#556B2F" 
                                            className="mkt-cart-badge position-relative mb-3 rounded-pill"
                                        >
                                            {cartCount}
                                        </Badge>
                                    )}
                                    <FiShoppingCart className="mkt-cart-icon me-2" size={16} /> 
                                    <span className="mkt-cart-text fw-normal">My Cart</span>
                                
                                </Button>
                            </div>
                        </Col>
                        <Col xs={12} lg={6} className="mkt-controls-right">
                            <div className="mkt-controls-wrapper d-flex gap-3 justify-content-lg-end align-items-center">
                                <Form.Select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="mkt-sort-select"
                                    style={{ maxWidth: '200px' }}
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
                                        className="mkt-load-more-btn d-flex align-items-center justify-content-center"
                                        style={{ minWidth: '120px' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner size="sm" className="mkt-spinner me-2" />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <FiRefreshCw className="mkt-refresh-icon me-2" />
                                                Load More
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>

                    {/* Error Alert */}
                    {error && (
                        <Row className="mkt-error-row mb-3">
                            <Col xs={12}>
                                <Alert variant="danger" dismissible onClose={() => setError(null)} className="mkt-error-alert">
                                    {error}
                                </Alert>
                            </Col>
                        </Row>
                    )}

                    {/* Products Grid */}
                    <Row xs={1} sm={2} lg={3} className="mkt-products-grid g-4 mb-5">
                        {currentProducts.map(product => (
                            <Col key={product.id} className="mkt-product-col">
                                <Card className="mkt-product-card h-100 shadow-sm border-0">
                                    <div 
                                        className="mkt-card-img-container position-relative"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="mkt-card-img w-100"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                            }}
                                        />
                                        <div className="mkt-category-badge-container position-absolute top-0 end-0 m-2">
                                            <Badge 
                                                bg={getCategoryBadgeColor(product.category)}
                                                className="mkt-category-badge text-capitalize"
                                            >
                                                {product.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Card.Body className="mkt-card-body d-flex flex-column p-3">
                                        <Card.Title className="mkt-product-name h5 mb-1 text-truncate">
                                            {product.name}
                                        </Card.Title>
                                        <Card.Text className="mkt-seller-name text-muted small mb-2">
                                            {product.seller}
                                        </Card.Text>
                                        <div className="mkt-rating text-warning mb-2">
                                            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                                        </div>
                                        <div className="mkt-price-container d-flex align-items-center mb-3">
                                            <FiTag className="mkt-price-icon me-1" size={14} />
                                            <span className="mkt-price fw-bold">
                                                KES {product.price.toLocaleString()}
                                            </span>
                                            <span className="mkt-unit text-muted ms-1">{product.unit}</span>
                                        </div>
                                        <div className="mkt-buttons-container mt-auto">
                                            <Row className="mkt-buttons-row g-5">
                                                <Col xs={6}>
                                                    <Button 
                                                        variant="success" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddToCart(product);
                                                        }}
                                                        className="mkt-add-to-cart-btn w-100 d-flex align-items-center justify-content-center"
                                                        size="sm"
                                                    >
                                                        <FiShoppingCart className="mkt-cart-btn-icon me-1" size={14} />
                                                        <span className="mkt-cart-btn-text">Add to Cart</span>
                                                    </Button>
                                                </Col>
                                                <Col xs={6}>
                                                    <Button 
                                                        variant="outline-warning" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedProduct(product); 
                                                            setShowGiftModal(true);
                                                        }}
                                                        className="mkt-gift-btn w-100 d-flex align-items-center justify-content-center"
                                                        size="sm"
                                                    >
                                                        <FiGift className="mkt-gift-icon me-1" size={14} />
                                                        <span className="mkt-gift-text">Gift This</span>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Row className="mkt-pagination-row mt-5">
                            <Col xs={12} className="mkt-pagination-col d-flex justify-content-center">
                                <Pagination 
                                    currentPage={currentPage} 
                                    totalPages={100} 
                                    onPageChange={(page) => setCurrentPage(page)} 
                                />
                            </Col>
                        </Row>
                    )}

                    {/* No More Products Message */}
                    {!hasMoreProducts && products.length > initialProducts.length && (
                        <Row className="mkt-no-more-row mt-4">
                            <Col xs={12} className="mkt-no-more-col text-center">
                                <p className="mkt-no-more-text text-muted">
                                    🎉 You've seen all available products! Check back later for new items.
                                </p>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>

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
            
        </div>
    );
};

export default MarketplacePage;