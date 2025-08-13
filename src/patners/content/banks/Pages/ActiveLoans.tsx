import React from 'react';
import LoanBalanceCard from '../LoanBalanceCard';

interface LoanData {
  id: string;
  type: string;
  totalAmount: number;
  remaining: number;
  interestRate: number;
  dueDate: string;
}

// Active Loans Component
const ActiveLoans: React.FC = () => {
  const loans: LoanData[] = [
    {
      id: '1',
      type: 'Equipment Loan',
      totalAmount: 1000000,
      remaining: 250000,
      interestRate: 5,
      dueDate: '2025/02/10'
    },
    {
      id: '2',
      type: 'Equipment Loan',
      totalAmount: 1000000,
      remaining: 250000,
      interestRate: 5,
      dueDate: '2025/02/10'
    }
  ];

  return (
    <div className="p-3 p-sm-0" style={{ backgroundColor: '#eeeeeeff' }}>
      <LoanBalanceCard />
      <div className="mt-4 bg-white p-3 rounded-3">
      <h5 className="mb-3">Active Loans</h5>
      {loans.map((loan) => (
        <div key={loan.id} className="card border mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h6 className="card-title mb-0">{loan.type}</h6>
              <span className="badge bg-primary">Interest: {loan.interestRate}%</span>
            </div>
            
            {/* Total Amount Row */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted">Total Amount</small>
              <div className="fw-medium">KES {loan.totalAmount.toLocaleString()}</div>
            </div>
            
            {/* Remaining Amount Row */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted">Remaining</small>
              <div className="text-danger fw-medium">KES {loan.remaining.toLocaleString()}</div>
            </div>
            
            {/* Due Date Row */}
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">Due Date</small>
              <div className="fw-medium">{loan.dueDate}</div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="row mt-4">
        <div className="col-md-6 mb-2">
          <button className="btn btn-outline-warning w-100">Apply for New Loan</button>
        </div>
        <div className="col-md-6">
          <button className="btn text-white w-100" style={{ backgroundColor: '#556B2F' }}>
            Make Payment
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ActiveLoans;