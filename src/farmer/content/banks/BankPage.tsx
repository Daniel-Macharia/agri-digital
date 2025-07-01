import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { 
  FaSearch, 
  FaBell, 
  FaUser, 
  FaChevronDown, 
  FaArrowLeft,
  FaPercentage,
  FaClock,
  FaTimes,
  FaCheck,
  FaFileUpload
} from 'react-icons/fa';

export type TabType = 'Loans' | 'Withdraw' | 'Deposit' | 'Active Loans' | 'LoanApplication' | 'LoanDetails';

export interface LoanData {
  id: number;
  title: string;
  bank: string;
  interestRate: string;
  term: string;
  image: string;
  bgColor: string;
  loanAmountRange: string;
  collateralRequired: boolean;
  eligibility: string[];
}

export interface ActiveLoan {
  id: number;
  title: string;
  totalAmount: string;
  remaining: string;
  dueDate: string;
  interestRate: string;
}

export interface WithdrawFormData {
  amount: string;
  reason: string;
  method: string;
  date: string;
}

export interface DepositFormData {
  amount: string;
  method: string;
  transactionId: string;
  date: string;
  screenshot: File | null;
}

interface LoanApplicationData {
  fullName: string;
  contactInfo: string;
  projectName: string;
  farmRevenue: string;
  hasBankAccount: boolean;
  accountNumber: string;
  hasExistingLoans: boolean;
  loanAmount: string;
  loanPurpose: string;
  repaymentPeriod: string;
  repaymentFrequency: string;
  idDocument: File | null;
  farmOwnershipDoc: File | null;
  bankStatement: File | null;
  digitalSignature: string;
  screenshot: File | null;
}

const BankPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Loans');
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [bankName, setBankName] = useState('');
  const [bankEmail, setBankEmail] = useState('');
  const [withdrawForm, setWithdrawForm] = useState<WithdrawFormData>({
    amount: '12000',
    reason: '',
    method: 'Method...',
    date: ''
  });
  const [depositForm, setDepositForm] = useState<DepositFormData>({
    amount: '12000',
    method: 'Method...',
    transactionId: '',
    date:'',
    screenshot: null
  });
  const [loanApplication, setLoanApplication] = useState<LoanApplicationData>({
    fullName: 'John Doe',
    contactInfo: '+254 712345678',
    projectName: '',
    farmRevenue: '12.5 million KES',
    hasBankAccount: false,
    accountNumber: '',
    hasExistingLoans: false,
    loanAmount: '12,000,000',
    loanPurpose: '',
    repaymentPeriod: '',
    repaymentFrequency: '',
    idDocument: null,
    farmOwnershipDoc: null,
    bankStatement: null,
    digitalSignature: '',
    screenshot: null
  });
  const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);

  // Get today's date in YYYY-MM-DD format for validation
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const loanData: LoanData[] = [
    {
      id: 1,
      title: "Farm Equipment Loan",
      bank: "AgriBank",
      interestRate: "5% per annum",
      term: "6-24 months",
      image: "https://images.unsplash.com/photo-1565347878134-064b9185ced8?w=600&auto=format&fit=crop",
      bgColor: "bg-white",
      loanAmountRange: "$500 - $10,000",
      collateralRequired: true,
      eligibility: [
        "Must be a registered farmer",
        "Minimum 2 years of farming experience",
        "Valid government ID"
      ]
    },
    {
      id: 2,
      title: "Farm Expansion Loan",
      bank: "AgriBank", 
      interestRate: "7% per annum",
      term: "12-36 months",
      image: "https://images.unsplash.com/photo-1607269910784-aafe40882991?w=600&auto=format&fit=crop",
      bgColor: "bg-white",
      loanAmountRange: "$10,000 - $50,000",
      collateralRequired: true,
      eligibility: [
        "Must be a registered farmer",
        "Minimum 3 years of farming experience",
        "Business plan required"
      ]
    },
    {
      id: 3,
      title: "Livestock Loan",
      bank: "AgriBank",
      interestRate: "6% per annum", 
      term: "12-24 months",
      image: "https://images.unsplash.com/vector-1745606781285-cbd882e9c32a?w=600&auto=format&fit=crop",
      bgColor: "bg-white",
      loanAmountRange: "$1,000 - $20,000",
      collateralRequired: true,
      eligibility: [
        "Must be a registered farmer",
        "Livestock management experience",
        "Valid government ID"
      ]
    },
    {
      id: 4,
      title: "Farm Equipment Loan",
      bank: "AgriBank",
      interestRate: "5%",
      term: "12 months", 
      image: "https://plus.unsplash.com/premium_vector-1717511155261-8af531b8270c?w=600&auto=format&fit=crop",
      bgColor: "bg-white",
      loanAmountRange: "$500 - $10,000",
      collateralRequired: true,
      eligibility: [
        "Must be a registered farmer",
        "Minimum 2 years of farming experience",
        "Valid government ID"
      ]
    },
    {
      id: 5,
      title: "Farm Equipment Loan",
      bank: "AgriBank",
      interestRate: "5%",
      term: "12 months",
      image: "https://plus.unsplash.com/premium_photo-1679814366168-f6f39e7e8ae4?w=600&auto=format&fit=crop",
      bgColor: "bg-white",
      loanAmountRange: "$500 - $10,000",
      collateralRequired: true,
      eligibility: [
        "Must be a registered farmer",
        "Minimum 2 years of farming experience",
        "Valid government ID"
      ]
    },
    {
      id: 6,
      title: "Farm Equipment Loan",
      bank: "AgriBank",
      interestRate: "5%",
      term: "12 months",
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&auto=format&fit=crop",
      bgColor: "bg-white",
      loanAmountRange: "$500 - $10,000",
      collateralRequired: true,
      eligibility: [
        "Must be a registered farmer",
        "Minimum 2 years of farming experience",
        "Valid government ID"
      ]
    }
  ];

  const activeLoans: ActiveLoan[] = [
    {
      id: 1,
      title: "Equipment Loan",
      totalAmount: "KES 1,000,000",
      remaining: "KES 250,000",
      dueDate: "2025/02/10",
      interestRate: "5%"
    },
    {
      id: 2,
      title: "Expansion Loan",
      totalAmount: "KES 2,000,000",
      remaining: "KES 500,000",
      dueDate: "2025/05/15",
      interestRate: "7%"
    }
  ];

  const tabs: TabType[] = ['Loans', 'Withdraw', 'Deposit', 'Active Loans'];

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handleRequestPartnership = () => {
    setShowPartnershipModal(true);
    setRequestSent(false);
  };

  const handleSubmitRequest = () => {
    if (!bankName || !bankEmail) {
      alert('Please fill all fields');
      return;
    }
    setRequestSent(true);
  };

  const handleCloseModal = () => {
    setShowPartnershipModal(false);
    setBankName('');
    setBankEmail('');
  };

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWithdrawForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDepositForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoanApplicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setLoanApplication(prev => ({ ...prev, [name]: checked }));
    } else {
      setLoanApplication(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof LoanApplicationData) => {
    if (e.target.files && e.target.files[0]) {
      setLoanApplication(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const validateWithdrawForm = () => {
    if (!withdrawForm.amount || parseInt(withdrawForm.amount) <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    if (!withdrawForm.reason.trim()) {
      alert('Please enter a withdrawal reason');
      return false;
    }
    if (withdrawForm.method === 'Method...') {
      alert('Please select a withdrawal method');
      return false;
    }
    if (!withdrawForm.date) {
      alert('Please select a withdrawal date');
      return false;
    }
    if (withdrawForm.date < getTodayDate()) {
      alert('Withdrawal date cannot be in the past');
      return false;
    }
    return true;
  };

  const validateDepositForm = () => {
    if (!depositForm.amount || parseInt(depositForm.amount) <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    if (depositForm.method === 'Method...') {
      alert('Please select a deposit method');
      return false;
    }
    if (!depositForm.transactionId.trim()) {
      alert('Please enter a transaction ID');
      return false;
    }
    if (!depositForm.date) {
      alert('Please select a deposit date');
      return false;
    }
    if (depositForm.date > getTodayDate()) {
      alert('Deposit date cannot be in the future');
      return false;
    }
    return true;
  };

  const validateLoanApplication = () => {
    if (!loanApplication.fullName.trim()) {
      alert('Please enter your full name');
      return false;
    }
    if (!loanApplication.contactInfo.trim()) {
      alert('Please enter your contact information');
      return false;
    }
    if (!loanApplication.projectName.trim()) {
      alert('Please select a project name');
      return false;
    }
    if (!loanApplication.loanAmount || parseInt(loanApplication.loanAmount.replace(/,/g, '')) <= 0) {
      alert('Please enter a valid loan amount');
      return false;
    }
    if (!loanApplication.loanPurpose.trim()) {
      alert('Please enter loan purpose');
      return false;
    }
    if (!loanApplication.repaymentPeriod) {
      alert('Please select repayment period');
      return false;
    }
    if (!loanApplication.repaymentFrequency) {
      alert('Please select repayment frequency');
      return false;
    }
    if (!loanApplication.idDocument) {
      alert('Please upload your government ID');
      return false;
    }
    if (!loanApplication.farmOwnershipDoc) {
      alert('Please upload farm ownership document');
      return false;
    }
    if (loanApplication.hasBankAccount && !loanApplication.accountNumber.trim()) {
      alert('Please enter your account number');
      return false;
    }
    if (loanApplication.hasBankAccount && !loanApplication.bankStatement) {
      alert('Please upload your bank statement');
      return false;
    }
    return true;
  };

  const handleProcessWithdraw = () => {
    if (validateWithdrawForm()) {
      alert('Withdraw request processed successfully!');
    }
  };

  const handleProcessDeposit = () => {
    if (validateDepositForm()) {
      alert('Deposit processed successfully!');
    }
  };

  const handleSubmitLoanApplication = () => {
    if (validateLoanApplication()) {
      alert('Loan application submitted successfully!');
      setActiveTab('Loans');
    }
  };

  const handleApplyNewLoan = () => {
    setActiveTab('Loans');
  };

  const handleViewMore = (loan: LoanData) => {
    setSelectedLoan(loan);
    setActiveTab('LoanDetails');
  };

  const handleApplyNow = () => {
    setActiveTab('LoanApplication');
  };

  const handleBackToLoans = () => {
    setActiveTab('Loans');
  };

  const handleBackToLoanDetails = () => {
    setActiveTab('LoanDetails');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Withdraw':
        return (
          <div className="container-fluid">
          <div className="row w-100" style={{maxWidth: '1000px', height: 'auto'}}>
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-3 mb-4">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4 text-start">Withdraw Form</h4>
                  
                  <div className="mb-4">
                    <h5 className="fw-bold mb-4 text-start">Information</h5>
                    
                    {/* Amount Row */}
                    <div className="row align-items-left mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-4 text-start">Amount</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            name="amount"
                            value={withdrawForm.amount}
                            onChange={handleWithdrawChange}
                            placeholder="Enter amount"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Withdraw Reason Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-4 text-start">Withdraw Reason(s)</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="reason"
                          value={withdrawForm.reason}
                          onChange={handleWithdrawChange}
                          placeholder="Enter reason"
                          required
                        />
                      </div>
                    </div>

                    {/* Withdraw Method Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-0 text-start">Withdraw Method</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <select
                          className="form-select"
                          name="method"
                          value={withdrawForm.method}
                          onChange={handleWithdrawChange}
                          required
                        >
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Mobile Money">Mobile Money</option>
                          <option value="Cheque">Cheque</option>
                        </select>
                      </div>
                    </div>

                    {/* Withdraw Date Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-0 text-start">Withdraw Date</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={withdrawForm.date}
                          onChange={handleWithdrawChange}
                          min={getTodayDate()}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-success fw-semibold w-100 py-0"
                    onClick={handleProcessWithdraw}
                  >
                    Process Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
        
      case 'Deposit':
        return (
          <div className="row" style={{width: '1000px', height: '80px'}}>
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-3 mb-4">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4 text-start">Deposit Form</h4>
                  
                  <div className="mb-4">
                    {/* Amount Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-0 text-start">Amount</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            name="amount"
                            value={depositForm.amount}
                            onChange={handleDepositChange}
                            placeholder="Enter amount"
                            min="1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Deposit Method Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-0 text-start">Deposit Method</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <select
                          className="form-select"
                          name="method"
                          value={depositForm.method}
                          onChange={handleDepositChange}
                          required
                        >
                          <option value=""></option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Mobile Money">Mobile Money</option>
                          <option value="Cash">Cash</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Transaction ID Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-0 text-start">Transaction ID</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="text"
                          className="form-control"
                          name="transactionId"
                          value={depositForm.transactionId}
                          onChange={handleDepositChange}
                          placeholder="Enter transaction ID"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Deposit Date Row */}
                    <div className="row align-items-center mb-4">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                        <label className="mb-0 text-start">Deposit Date</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={depositForm.date}
                          onChange={handleDepositChange}
                          max={getTodayDate()}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* File Upload Section */}
                  <div className="mb-4 ">
                    <div className="row align-items-start">
                      <div className="col-12 col-md-3 mb-2 mb-md-0">
                      </div>
                      <div className="col-12 col-md-9">
                        <div className="rounded-3 p-4 text-center" style={{border: '1px dashed #ced4da', width: '600px'}}>
                          <FaFileUpload className="text-muted mb-2" size={24} />
                          <p className="text-muted mb-2 ">Upload Screenshot Confirmation PDF, PNG, JPG up to 10MB</p>
                          <input
                            type="file"
                            className="d-none"
                            id="fileUpload"
                            onChange={(e) => handleFileUpload(e, 'screenshot')}
                            accept=".pdf,.png,.jpg,.jpeg"
                          />
                          <label htmlFor="fileUpload" className="btn btn-outline-success">
                            Choose File
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-success fw-semibold w-100 py-0"
                    onClick={handleProcessDeposit}
                  >
                    Process Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'Active Loans':
        return (
          <div className="container-fluid p-3">
            {/* Loan Balance Card */}
            <div className="row mb-4" style={{width: '100%'}}>
              <div className="col-12 col-md-4 col-lg-3">
                <div 
                  className="card shadow-sm border-0 rounded-4 text-white"
                  style={{
                    background: 'linear-gradient(135deg,rgb(16, 189, 65) 0%, #8FBC8F 100%)',
                    minHeight: '120px'
                  }}
                >
                  <div className="card-body p-4" style={{width: '100%'}}>
                    <h6 className="fw-normal mb-2 opacity-90 text-nowrap">Loan Balance</h6>
                    <h3 className="fw-bold mb-0 text-nowrap">1,000,000</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Loans Section */}
            <div className="row" style={{width: '1000px', margin: '0 auto'}}>
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Active Loans</h5>
                </div>
                
                {activeLoans.map((loan) => (
                  <div key={loan.id} className="card mb-3 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="row justify-content-between align-items-start">
                        
                        {/* Far Left Column - Loan Details */}
                        <div className="col-5">
                          <div className="d-flex align-items-center mb-3">
                            <h6 className="fw-bold text-dark mb-0 me-3">{loan.title}</h6>
                          </div>
                          
                          <div className="mb-5">
                            <small className="text-muted d-block text-start">Total Amount</small>
                          </div>
                          
                          <div className="mb-5">
                            <small className="text-muted d-block text-start">Remaining</small>
                          </div>
                          
                          <div className="mb-5">
                            <small className="text-muted d-block text-start">Due Date</small>
                          </div>
                        </div>

                        {/* Far Right Column - Interest & Status */}
                        <div className="col-5 d-flex flex-column align-items-end">
                          <div className="mb-1">
                            <span className=" text-primary rounded px-0 py-1">
                              Interest: {loan.interestRate}
                            </span>
                          </div>
                          
                          <div className="mb-5">
                            <span className="fw-semibold text-dark text-end">{loan.totalAmount}</span>
                          </div>
                          <div className="mb-5">
                            <span className="fw-semibold text-danger text-end">{loan.remaining}</span>
                          </div>
                          <div className="mb-5">
                            <span className="fw-semibold text-dark text-end">{loan.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Action Buttons */}
                <div className="row g-3 mt-2">
                  <div className="col-6">
                    <button 
                      className="btn btn-outline-warning w-100 py-0 fw-semibold"
                      onClick={handleApplyNewLoan}
                      style={{borderColor: '#ffc107',}}
                    >
                      Apply for New Loan
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn btn-success w-100 py-0 fw-semibold text-white"
                      style={{backgroundColor: '#28a745', borderColor: '#28a745'}}
                    >
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

     case 'LoanDetails':
  return (
    <Container fluid>
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', width: '100%', minHeight: '100vh', paddingTop: '20px' }}>
      {selectedLoan && (
        <>
          <div className="row mb-0">
            <div className="col-12 d-flex align-items-start">
              <button
                className="btn btn-link text-decoration-none p-0 text-dark text-start text-nowrap"
                onClick={handleBackToLoans}
                style={{ fontSize: '14px' }}
              >
                <FaArrowLeft className="me-2" />
                Back to Loans
              </button>
            </div>
          </div>

          <div className="row-fluid   d-flex text-nowrap">
            <div className="card w-100 col-12 col-lg-6">
              <div className="card-fluid shadow-sm border-0 rounded-3">
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-2 text-dark text-start">{selectedLoan.title}</h4>
                    <p className="text-muted mb-0 text-start" style={{ fontSize: '14px' }}>
                     <span className="text-success fw-semibold"> Provided by {selectedLoan.bank}</span>
                    </p>
                  </div>

                  {/* Key Details Section */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3 text-dark text-start">Key Details</h6>
                    
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-6">
                        <div className="mb-3 text-start">
                          <small className="text-muted d-block" style={{ fontSize: '12px' }}>Loan Amount</small>
                          <span className="fw-semibold text-dark">{selectedLoan.loanAmountRange}</span>
                        </div>
                        <div className="mb-3 bg-light text-start">
                          <small className="text-muted d-block" style={{ fontSize: '12px' }}>Repayment Period</small>
                          <span className="fw-semibold text-dark">{selectedLoan.term}</span>
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div className="col-6">
                        <div className="mb-3 bg-light">
                          <small className="text-muted d-block" style={{ fontSize: '12px' }}>Interest Rate</small>
                          <span className="fw-semibold text-dark">{selectedLoan.interestRate}</span>
                        </div>
                        <div className="mb-3 bg-light">
                          <small className="text-muted d-block" style={{ fontSize: '12px' }}>Collateral</small>
                          <span className="fw-semibold text-dark">
                            {selectedLoan.collateralRequired ? 'Required' : 'Not Required'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility & Requirements Section */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3 text-dark text-start">Eligibility & Requirements</h6>
                    <div className="eligibility-list">
                      {selectedLoan.eligibility.map((item, index) => (
                        <div key={index} className="d-flex  align-items-start mb-2">
                          <FaCheck 
                            className="text-success me-2 mt-1" 
                            style={{ fontSize: '12px', flexShrink: 0 }} 
                          />
                          <span className="text-dark" style={{ fontSize: '12px' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-success flex-grow-1 py-0 fw-semibold me-3"
                      onClick={handleApplyNow}
                      style={{ 
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        fontSize: '14px'
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </Container>
  );

      case 'LoanApplication':
        return (
          <div className="container-fluid p-3">
            <div className="row mb-1">
              <div className="col-2">
                <button 
                  className="btn btn-link text-decoration-none p-0 text-nowrap text-dark"
                  onClick={handleBackToLoanDetails}
                >
                  <FaArrowLeft className="me-2" />
                  Back to Loan
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card shadow-sm border-0 rounded-3 mb-4">
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4 text-start">Loan Application Form</h4>
                    
                    {/* Personal Information Section */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 text-start">Personal Information</h5>
                      
                      {/* Full Name */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Full Name *</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={loanApplication.fullName}
                            onChange={handleLoanApplicationChange}
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Contact Information *</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="contactInfo"
                            value={loanApplication.contactInfo}
                            onChange={handleLoanApplicationChange}
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Project Name */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Project Name</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <select
                            className="form-select"
                            name="projectName"
                            value={loanApplication.projectName}
                            onChange={handleLoanApplicationChange}
                          >
                            <option value=""></option>
                            <option value="Farm Equipment">Farm Equipment</option>
                            <option value="Crop Production">Crop Production</option>
                            <option value="Livestock">Livestock</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Farm Revenue */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Farm Revenue (last 12 months)</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="farmRevenue"
                            value={loanApplication.farmRevenue}
                            onChange={handleLoanApplicationChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Bank Account Section */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 text-start">Do you have a Bank account?</h5>
                      
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-9 offset-md-3">
                          <div className="form-check form-check-inline me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="hasBankAccount"
                              id="hasBankAccountYes"
                              checked={loanApplication.hasBankAccount}
                              onChange={() => setLoanApplication(prev => ({ ...prev, hasBankAccount: true }))}
                            />
                            <label className="form-check-label" htmlFor="hasBankAccountYes">Yes</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="hasBankAccount"
                              id="hasBankAccountNo"
                              checked={!loanApplication.hasBankAccount}
                              onChange={() => setLoanApplication(prev => ({ ...prev, hasBankAccount: false }))}
                            />
                            <label className="form-check-label" htmlFor="hasBankAccountNo">No</label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Conditional rendering based on bank account selection */}
                      {loanApplication.hasBankAccount ? (
                        <div className="row align-items-center mb-3">
                          <div className="col-12 col-md-3 mb-2 mb-md-0">
                            <label className="mb-0 text-start">Account Number</label>
                          </div>
                          <div className="col-12 col-md-9">
                            <input
                              type="text"
                              className="form-control"
                              name="accountNumber"
                              value={loanApplication.accountNumber}
                              onChange={handleLoanApplicationChange}
                              placeholder="Enter Account Number"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row align-items-center mb-3">
                          <div className="col-12 col-md-3 mb-2 mb-md-0">
                            <label className="mb-0 text-start">Upload ID & Relevant Documents</label>
                          </div>
                          <div className="col-12 col-md-9">
                            <div className="rounded-3 p-4 text-center" style={{border: '1px dashed #ced4da'}}>
                              <FaFileUpload className="text-muted mb-2" size={24} />
                              <p className="text-muted mb-2">PDF, PNG, JPG up to 10MB</p>
                              <input
                                type="file"
                                className="d-none"
                                id="idDocumentUpload"
                                onChange={(e) => handleFileUpload(e, 'idDocument')}
                                accept=".pdf,.png,.jpg,.jpeg"
                              />
                              <label htmlFor="idDocumentUpload" className="btn btn-outline-success">
                                Choose File
                              </label>
                              {loanApplication.idDocument && (
                                <p className="mt-2 mb-0">{loanApplication.idDocument.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Existing Loans Section */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 text-start">Existing Loans</h5>
                      
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-9 offset-md-3">
                          <div className="form-check form-check-inline me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="hasExistingLoans"
                              id="hasExistingLoansYes"
                              checked={loanApplication.hasExistingLoans}
                              onChange={() => setLoanApplication(prev => ({ ...prev, hasExistingLoans: true }))}
                            />
                            <label className="form-check-label" htmlFor="hasExistingLoansYes">Yes</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="hasExistingLoans"
                              id="hasExistingLoansNo"
                              checked={!loanApplication.hasExistingLoans}
                              onChange={() => setLoanApplication(prev => ({ ...prev, hasExistingLoans: false }))}
                            />
                            <label className="form-check-label" htmlFor="hasExistingLoansNo">No</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Loan Details Section */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 text-start">Loan Details</h5>
                      
                      {/* Loan Amount */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Loan Amount *</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="loanAmount"
                              value={loanApplication.loanAmount}
                              onChange={handleLoanApplicationChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Loan Purpose */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Loan Purpose</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            name="loanPurpose"
                            value={loanApplication.loanPurpose}
                            onChange={handleLoanApplicationChange}
                            placeholder="Purpose"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Repayment Period */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Repayment Period</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <select
                            className="form-select"
                            name="repaymentPeriod"
                            value={loanApplication.repaymentPeriod}
                            onChange={handleLoanApplicationChange}
                            required
                          >
                            <option value="">Period</option>
                            <option value="6 months">6 months</option>
                            <option value="12 months">12 months</option>
                            <option value="24 months">24 months</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Repayment Frequency */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Repayment Frequency</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <select
                            className="form-select"
                            name="repaymentFrequency"
                            value={loanApplication.repaymentFrequency}
                            onChange={handleLoanApplicationChange}
                            required
                          >
                            <option value="">Frequency</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Annually">Annually</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Supporting Documents Section */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 text-start">Supporting Documents</h5>
                      
                      {/* Government ID */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Upload Government ID</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <div className="rounded-3 p-4 text-center" style={{border: '1px dashed #ced4da'}}>
                            <FaFileUpload className="text-muted mb-2" size={24} />
                            <p className="text-muted mb-2">PDF, PNG, JPG up to 10MB</p>
                            <input
                              type="file"
                              className="d-none"
                              id="idDocumentUpload2"
                              onChange={(e) => handleFileUpload(e, 'idDocument')}
                              accept=".pdf,.png,.jpg,.jpeg"
                            />
                            <label htmlFor="idDocumentUpload2" className="btn btn-outline-success">
                              Choose File
                            </label>
                            {loanApplication.idDocument && (
                              <p className="mt-2 mb-0">{loanApplication.idDocument.name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Farm Ownership */}
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Upload Farm Ownership</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <div className="rounded-3 p-4 text-center" style={{border: '1px dashed #ced4da'}}>
                            <FaFileUpload className="text-muted mb-2" size={24} />
                            <p className="text-muted mb-2">PDF, PNG, JPG up to 10MB</p>
                            <input
                              type="file"
                              className="d-none"
                              id="farmOwnershipUpload"
                              onChange={(e) => handleFileUpload(e, 'farmOwnershipDoc')}
                              accept=".pdf,.png,.jpg,.jpeg"
                            />
                            <label htmlFor="farmOwnershipUpload" className="btn btn-outline-success">
                              Choose File
                            </label>
                            {loanApplication.farmOwnershipDoc && (
                              <p className="mt-2 mb-0">{loanApplication.farmOwnershipDoc.name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Bank Statements (conditional) */}
                      {loanApplication.hasBankAccount && (
                        <div className="row align-items-center mb-3">
                          <div className="col-12 col-md-3 mb-2 mb-md-0">
                            <label className="mb-0 text-start">Upload Bank Statements</label>
                          </div>
                          <div className="col-12 col-md-9">
                            <div className="rounded-3 p-4 text-center" style={{border: '1px dashed #ced4da'}}>
                              <FaFileUpload className="text-muted mb-2" size={24} />
                              <p className="text-muted mb-2">PDF, PNG, JPG up to 10MB</p>
                              <input
                                type="file"
                                className="d-none"
                                id="bankStatementUpload"
                                onChange={(e) => handleFileUpload(e, 'bankStatement')}
                                accept=".pdf,.png,.jpg,.jpeg"
                              />
                              <label htmlFor="bankStatementUpload" className="btn btn-outline-success">
                                Choose File
                              </label>
                              {loanApplication.bankStatement && (
                                <p className="mt-2 mb-0">{loanApplication.bankStatement.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Digital Signature */}
                    <div className="mb-4">
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3 mb-2 mb-md-0">
                          <label className="mb-0 text-start">Digital Signature</label>
                        </div>
                        <div className="col-12 col-md-9">
                          <div className="border rounded p-3 text-center">
                            <p className="text-muted">--</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                      className="btn btn-success fw-semibold w-100 py-0"
                      onClick={handleSubmitLoanApplication}
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default: // Loans
        return (
          <div className="row g-3 g-md-4">
            {loanData.map((loan: LoanData) => (
              <div key={loan.id} className="col-12 col-sm-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="position-relative">
                    <img 
                      src={loan.image}
                      alt={`${loan.bank} - ${loan.title}`}
                      className="card-img-top rounded-top-3"
                      style={{height: '200px', objectFit: 'cover'}}
                    />
                  </div>
                  
                  <div className="card-body p-3 p-md-4 text-start">
                    <div className="mb-3">
                      <h6 className="fw-bold mb-1">{loan.title}</h6>
                      <p className="text-success mb-0 fw-semibold">{loan.bank}</p>
                    </div>

                    <div className="row g-2 mb-4">
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <FaPercentage className="text-muted me-2 flex-shrink-0" size={14} />
                          <span className="small fw-semibold">{loan.interestRate}</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <FaClock className="text-muted me-2 flex-shrink-0" size={14} />
                          <span className="small fw-semibold">{loan.term}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="btn btn-success w-100 fw-semibold py-0"
                      type="button"
                      onClick={() => handleViewMore(loan)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="vh-100" style={{backgroundColor: '#f8f9fa'}}>
      {/* Main Content - Now covers entire screen */}
      <div className="container-fluid h-100 py-3">
        <div className="row h-100">
          <div className="col-12">
            {/* Request Partnership Button - Only show on Loans tab */}
            {activeTab === 'Loans' && (
              <div className="d-flex justify-content-end mb-3 fit-content">
                <button 
                  className="btn btn-success px-4 py-0 fw-semibold"
                  onClick={handleRequestPartnership}
                >
                  Request Partnership
                </button>
              </div>
            )}

            {/* Tabs - Only show when not in LoanDetails or LoanApplication */}
            {activeTab !== 'LoanDetails' && activeTab !== 'LoanApplication' && (
              <div className="row mb-3">
                <div className="col">
                  <div className="d-flex gap-1 flex-nowrap">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        className={`btn ${activeTab === tab ? 'btn-success' : 'btn-outline-secondary'} px-3 py-0 rounded-pill`}
                        onClick={() => handleTabClick(tab)}
                        style={{ whiteSpace: 'nowrap', width: 'fit-content' }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="h-100 overflow-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Request Modal */}
      {showPartnershipModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  {requestSent ? 'Request Sent Successfully!' : 'Request Partnership'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body pt-0">
                {requestSent ? (
                  <>
                    <div className="text-center mb-4">
                      <div className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" 
                           style={{width: '60px', height: '60px'}}>
                        <FaCheck className="text-white" size={24} />
                      </div>
                      <p className="text-center mb-4">Your partnership request has been sent successfully.</p>
                    </div>
                    
                    <div className="d-grid">
                      <button 
                        className="btn btn-success fw-semibold py-2"
                        onClick={handleCloseModal}
                      >
                        Return to Bank
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    {/* Bank Name Row */}
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-md-4 mb-2 mb-md-0">
                        <label htmlFor="bankName" className="form-label fw-semibold mb-0">Name of the bank</label>
                      </div>
                      <div className="col-12 col-md-8">
                        <input
                          type="text"
                          className="form-control py-2 rounded-3"
                          id="bankName"
                          placeholder="eg Equity"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Bank Email Row */}
                    <div className="row align-items-center mb-4">
                      <div className="col-12 col-md-4 mb-2 mb-md-0">
                        <label htmlFor="bankEmail" className="form-label fw-semibold mb-0">Email Address of the bank</label>
                      </div>
                      <div className="col-12 col-md-8">
                        <input
                          type="email"
                          className="form-control py-2 rounded-3"
                          id="bankEmail"
                          placeholder="example@gmail.com"
                          value={bankEmail}
                          onChange={(e) => setBankEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="d-grid">
                      <button 
                        type="button"
                        className="btn btn-success fw-semibold py-2"
                        onClick={handleSubmitRequest}
                        disabled={!bankName || !bankEmail}
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankPage;