// Common Types for the Banking/Loan Application

export interface LoanCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  interestRate: string;
  term: string;
  imageUrl: string;
  onViewMore?: () => void;
}

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

export interface FormData {
  bankName: string;
  bankEmail: string;
}

// Loan-related interfaces
export interface LoanData {
  title: string;
  provider: string;
  loanAmount: string;
  interestRate: string;
  repaymentPeriod: string;
  collateral: string;
  eligibility: string[];
}

// Application data interface
export interface ApplicationData {
  personalInfo: {
    fullName: string;
    idNumber: string;
    phoneNumber: string;
    email: string;
  };
  loanInfo: {
    amount: number;
    purpose: string;
    repaymentPeriod: string;
  };
  financialInfo: {
    monthlyIncome: number;
    existingLoans: number;
    collateral: string;
  };
}

// Form data interfaces
export interface WithdrawFormData {
  amount: number;
  reason: string;
  method: string;
  date: string;
}

export interface DepositFormData {
  amount: number;
  method: string;
  transactionId: string;
  date: string;
  file?: File;
}

// Error handling interfaces
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface WithdrawFormErrors {
  amount?: string;
  reason?: string;
  method?: string;
  date?: string;
}

export interface DepositFormErrors {
  amount?: string;
  method?: string;
  transactionId?: string;
  date?: string;
  file?: string;
}

// Payment-related interfaces
export interface PaymentData {
  paymentMethod: string;
  mpesaPhone?: string;
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  barterDescription?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  seller?: string;
  image?: string;
}

export interface GiftData {
  recipient: string;
  message: string;
  senderName: string;
}

export interface OrderData {
  cartItems: CartItem[];
  deliveryMethod: string;
  deliveryDate: string;
  tipAmount: string | number;
  isGift?: boolean;
  giftData?: GiftData;
}

export interface CardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

// Navigation and component interfaces
export type NavigationState = 'loans' | 'withdraw' | 'deposit' | 'active-loans' | 'details' | 'application';

export interface BankPageProps {
  onViewMore: (loanData?: LoanData) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface LoanDetailsProps {
  loanData: LoanData;
  onApplyNow: () => void;
  onBackToLoans: () => void;
}

export interface LoanApplicationFormProps {
  onBackToLoans: () => void;
  onSubmitApplication: (applicationData: ApplicationData) => void;
}

export interface BankPageNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface PaymentModalProps {
  show: boolean;
  onHide: () => void;
  onPaymentSuccess: (paymentData: PaymentData) => void;
  total: number;
  orderData?: OrderData;
}

// Utility types
export type FormFieldName = keyof WithdrawFormData | keyof DepositFormData;

export interface ValidationError {
  path?: string;
  message: string;
}

// Component state interfaces
export interface ComponentState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoanApplicationResponse {
  applicationId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  estimatedProcessingTime: string;
}

export interface TransactionResponse {
  transactionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  reference?: string;
}