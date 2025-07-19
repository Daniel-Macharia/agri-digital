import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import PolicyDetailsPage from "./PolicyDetailsPage";
import InsurancePage from "./InsurancePage";
import PurchasePolicyForm from "./PurchasePolicyForm";
import PolicyPayment from './PolicyPayment';
import FileClaimForm from './FileClaimForm';

const Insurance: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path="" element={<InsurancePage />} />
            <Route path="/file-claim/:id" element={<FileClaimForm />} />
            <Route path="/policy/:id" element={<PolicyDetailsPage />} />
            <Route path="/purchase-policy/:id" element={<PurchasePolicyForm />} />
            <Route path="/payment" element={<PolicyPayment paymentInfo={{ title: 'Policy Payment', amount: 1000, currency: 'KES' }} onBack={() => {navigate(-1) }} onPaymentComplete={() => {}}/>} />
        </Routes>
    );
};

export default Insurance;