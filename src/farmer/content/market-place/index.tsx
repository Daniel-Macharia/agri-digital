import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MarketplacePage from './pages/MarketplacePage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';

const MarketPlaceRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<MarketplacePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
        </Routes>
    );
};

export default MarketPlaceRouter; 