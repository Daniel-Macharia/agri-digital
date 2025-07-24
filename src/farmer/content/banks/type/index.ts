// Types
export interface LoanCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  interestRate: string;
  term: string;
  imageUrl: string;
  onViewMore: () => void;
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