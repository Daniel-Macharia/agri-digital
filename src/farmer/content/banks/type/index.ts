// types/index.ts
export type TabType = 'Loans' | 'Withdraw' | 'Deposit' | 'Active Loans';

export interface LoanData {
  id: number;
  title: string;
  bank: string;
  interestRate: string;
  term: string;
  image: string;
  bgColor: string;
}

export interface ActiveLoan {
  id: number;
  title: string;
  totalAmount: string;
  remaining: string;
  dueDate: string;
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
}