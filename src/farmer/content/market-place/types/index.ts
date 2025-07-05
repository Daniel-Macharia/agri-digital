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

export interface Order {
    id: string;
    items: CartItem[];
    totalAmount: number;
    orderDate: string;
    deliveryAddress: string;
    status: OrderStatus ;
    trackingNumber: string;
    seller?: string;
    deliveryMethod?: string;
    paymentMethod?: string;
    estimatedDelivery?: string;
    subtotal?: number;
    deliveryFee?: number;
    tip?: number;
    deliveryDate?: string;
    paymentDetails?: PaymentData;
    isGift?: boolean;
    giftData?: GiftInfo;
}

type OrderStatus ='Processing' | 'In Transit' | 'Delivered' | 'Confirmed';

export interface CheckoutFormData {
    deliveryMethod: 'self-delivery' | 'courier' | 'buyer-pickup';
    deliveryDate: string;
    deliveryAddress: string;
    tipAmount: string | number;
}

export interface GiftInfo {
    productName: string;
    recipient: string;
    recipientNumber: string;
    message: string;
}
export interface MarketplacePageProps {
    // No props needed for now as it will manage its own state
}

export interface CheckoutPageProps {
    // No props needed for now, will use router state
}

export interface TrackOrderPageProps {
     // No props needed for now, will use router state
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

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
} 

export interface PaymentData {
    paymentMethod: string;
    mpesaPhone?: string;
    cardNumber?: string;
    cardholderName?: string;
    expiryDate?: string;
    cvv?: string;
}

// types.ts
export interface Product {
  id: number;
  name: string;
  seller: string;
  price: number;
  unit: string;
  rating: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface GiftData {
  recipientName: string;
  recipientEmail: string;
  message: string;
  product: Product;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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

export interface GiftModalProps {
  show: boolean;
  onHide: () => void;
  product: Product | null;
  //onSendGift: (giftData: GiftData) => void;
}


// Agridigi/src/components/farmer/dashboard/components/content/market-place/index.ts
/*import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/MarketplacePage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';

const MarketPlaceRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MarketplacePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="track-order" element={<TrackOrderPage />}
        </Routes>
    );
};

export default MarketPlaceRouter;*/
