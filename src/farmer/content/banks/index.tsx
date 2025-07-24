import { useState, Suspense } from 'react';
import { lazy } from "react";

const BankPageNavigation = lazy(() => import("./BankPageNavigation"));
const BankPage = lazy(() => import("./Pages/BankPage"));
const LoanDetails = lazy(() => import("./Pages/LoanDetails"));
const LoanApplicationForm = lazy(() => import("./Pages/LoanApplicationForm"));
const WithdrawForm = lazy(() => import("./Pages/WithdrawForm"));
const DepositForm = lazy(() => import("./Pages/DepositForm"));
const ActiveLoans = lazy(() => import("./Pages/ActiveLoans"));

// Loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Navigation states - expanded to include all tabs
type NavigationState = 'loans' | 'withdraw' | 'deposit' | 'active-loans' | 'details' | 'application';

// Loan data interface
interface LoanData {
  title: string;
  provider: string;
  loanAmount: string;
  interestRate: string;
  repaymentPeriod: string;
  collateral: string;
  eligibility: string[];
}

const Banks = () => {
  const [currentView, setCurrentView] = useState<NavigationState>('loans');
  const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);

  // Sample loan data - you can customize this based on the loan clicked
  const sampleLoanData: LoanData = {
    title: "Farm Equipment Loan",
    provider: "Provided by AgriBank",
    loanAmount: "$500 - $10,000",
    interestRate: "5% per annum",
    repaymentPeriod: "6-24 months",
    collateral: "Required",
    eligibility: [
      "Must be a registered farmer",
      "Minimum 2 years of farming experience",
      "Valid government ID"
    ]
  };

  // Tab navigation handler
  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'Loans':
        setCurrentView('loans');
        break;
      case 'Withdraw':
        setCurrentView('withdraw');
        break;
      case 'Deposit':
        setCurrentView('deposit');
        break;
      case 'Active Loans':
        setCurrentView('active-loans');
        break;
      default:
        setCurrentView('loans');
    }
  };

  // Get active tab name for navigation component
  const getActiveTab = () => {
    switch (currentView) {
      case 'loans':
        return 'Loans';
      case 'withdraw':
        return 'Withdraw';
      case 'deposit':
        return 'Deposit';
      case 'active-loans':
        return 'Active Loans';
      default:
        return 'Loans';
    }
  };

  // Navigation handlers for loan flow
  const handleViewMore = (loanData?: LoanData) => {
    // If specific loan data is provided, use it; otherwise use sample data
    setSelectedLoan(loanData || sampleLoanData);
    setCurrentView('details');
  };

  const handleApplyNow = () => {
    setCurrentView('application');
  };

  const handleBackToLoans = () => {
    setCurrentView('loans');
    setSelectedLoan(null);
  };

  const handleSubmitApplication = (applicationData: any) => {
    // Handle application submission here
    console.log('Application submitted:', applicationData);
    
    // Add your submission logic here, such as:
    // - Send data to backend API
    // - Show success message
    // - Navigate to success page
    
    // For now, show an alert and navigate back
    alert('Application submitted successfully! We will contact you within 3-5 business days.');
    setCurrentView('loans');
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'details':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LoanDetails
              loanData={selectedLoan || sampleLoanData}
              onApplyNow={handleApplyNow}
              onBackToLoans={handleBackToLoans}
            />
          </Suspense>
        );
        
      case 'application':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LoanApplicationForm
              onBackToLoans={handleBackToLoans}
              onSubmitApplication={handleSubmitApplication}
            />
          </Suspense>
        );
        
      case 'withdraw':
        return (
          <div className="bg-light min-vh-100">
            <Suspense fallback={<LoadingSpinner />}>
              <BankPageNavigation 
                activeTab={getActiveTab()} 
                onTabChange={handleTabChange} 
              />
              <WithdrawForm />
            </Suspense>
          </div>
        );
        
      case 'deposit':
        return (
          <div className="bg-light min-vh-100">
            <Suspense fallback={<LoadingSpinner />}>
              <BankPageNavigation 
                activeTab={getActiveTab()} 
                onTabChange={handleTabChange} 
              />
              <DepositForm />
            </Suspense>
          </div>
        );
        
      case 'active-loans':
        return (
          <div className="bg-light min-vh-100">
            <Suspense fallback={<LoadingSpinner />}>
              <BankPageNavigation 
                activeTab={getActiveTab()} 
                onTabChange={handleTabChange} 
              />
              <ActiveLoans />
            </Suspense>
          </div>
        );
        
      case 'loans':
      default:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <BankPage 
              onViewMore={handleViewMore}
              activeTab={getActiveTab()}
              onTabChange={handleTabChange}
            />
          </Suspense>
        );
    }
  };

  return (
    <div className="bankpage-container bg-light min-vh-100" id="bankpage-container">
      {renderCurrentView()}
    </div>
  );
};

export default Banks;