import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MarketplacePage from './pages/MarketplacePage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

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