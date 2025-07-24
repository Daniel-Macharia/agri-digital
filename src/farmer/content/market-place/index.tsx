import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));

const MarketPlaceRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<MarketplacePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
    );
};

export default MarketPlaceRouter; 
