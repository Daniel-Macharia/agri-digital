import React from 'react';
import { lazy } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./index.css";
const PolicyDetailsPage = lazy(() => import ("./PolicyDetailsPage"));
const InsurancePage = lazy(() => import ("./InsurancePage"));
const FileClaimForm = lazy(() => import ("./FileClaimForm"));
const PurchasePolicyForm = lazy(() => import ("./PurchasePolicyForm"));
const PolicyPayment = lazy(() => import ("./PolicyPayment"));

// Wrapper component to handle dynamic payment data
const PaymentWrapper: React.FC<{ onPaymentSuccess: (data: any) => void }> = ({ onPaymentSuccess }) => {
    const { amount } = useParams();
    const navigate = useNavigate();
    
    return (
        <PolicyPayment 
            onPaymentSuccess={onPaymentSuccess}
            total={amount ? parseFloat(amount) : 1000}
            title="Policy Payment"
            description="Complete your insurance policy payment"
            onCancel={() => navigate(-1)}
        />
    );
};

const Insurance: React.FC = () => {
    const navigate = useNavigate();
    
    // Payment success handler
    const handlePaymentSuccess = (paymentData: any) => {
        console.log('Payment successful:', paymentData);
        // Handle successful payment (e.g., redirect, show success message)
        navigate('/farmer/insurance'); // or wherever you want to redirect after payment
    };

    return (
        <Routes>
            <Route path="" element={<InsurancePage />} />
            <Route path="/file-claim/:id" element={<FileClaimForm />} />
            <Route path="/policy/:id" element={<PolicyDetailsPage />} />
            <Route path="/purchase-policy/:id" element={<PurchasePolicyForm />} />
            <Route 
                path="/payment/:amount?" 
                element={<PaymentWrapper onPaymentSuccess={handlePaymentSuccess} />} 
            />
        </Routes>
    );
};

export default Insurance;