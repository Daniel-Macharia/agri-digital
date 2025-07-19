import React from 'react';
import { FaArrowUp, FaArrowDown, FaFileExport, FaFilter } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Transaction type
interface Transaction {
  refId: string;
  date: string;
  type: 'Voucher' | 'Money';
  amount: number;
  purpose: string;
}

const transactions: Transaction[] = [
  { refId: '456789356', date: '2025/05/20', type: 'Voucher', amount: 5000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Money', amount: -2000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Voucher', amount: 5000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Money', amount: -2000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Voucher', amount: 5000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Voucher', amount: 5000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Money', amount: -2000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
  { refId: '456789356', date: '2025/05/20', type: 'Voucher', amount: 5000, purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed' },
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="container-fluid py-4 bg-background" style={{ minHeight: '100vh' }}>
      {/* Top Cards */}
      <div className="row ">
        <div className="w-100" style={{ maxWidth: '315px', minHeight: '184px', flexShrink: 0 }}>
          <div className="rounded-4 p-4 bg-primary text-white position-relative" style={{ minHeight: 120 }}>
            <div className="small-medium mb-2" style={{ opacity: 0.8 }}>Personal Balance</div>
            <div className="h2-medium mb-3">KES 5,000,000</div>
            
          </div>
        </div> 
        <div className="w-100" style={{ maxWidth: '315px', minHeight: '184px', flexShrink: 0 }}>
          <div className="rounded-4 p-4 bg-primary text-white position-relative" style={{ minHeight: 120 }}>
            <div className="small-medium mb-2" style={{ opacity: 0.8 }}>Vouchers</div>
            <div className="h2-medium mb-3">12,000,000</div>
            
          </div>
        </div>
      </div>
      

      {/* Transaction History Table Card */}
      <div className="bg-cards-form rounded-4 p-4 shadow-sm position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="h3-semibold mb-0">Transaction History</div>
          <div className="d-flex align-items-center gap-3">
            <span className="small-regular text-secondary-text">Showing 1-10 of 100 Transaction History</span>
            <span className="small-regular text-secondary-text">Sort by: <b>Date</b></span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr style={{ background: 'var(--background)' }}>
                <th className="small-semibold text-secondary-text">REF ID <FaArrowDown className="ms-1" style={{ fontSize: 12 }} /></th>
                <th className="small-semibold text-secondary-text">Date <FaArrowDown className="ms-1" style={{ fontSize: 12 }} /></th>
                <th className="small-semibold text-secondary-text">Type <FaArrowDown className="ms-1" style={{ fontSize: 12 }} /></th>
                <th className="small-semibold text-secondary-text">Amount <FaArrowDown className="ms-1" style={{ fontSize: 12 }} /></th>
                <th className="small-semibold text-secondary-text">Purpose <FaArrowDown className="ms-1" style={{ fontSize: 12 }} /></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--background)' : '#fff' }}>
                  <td className="small-regular text-primary-text">{tx.refId}</td>
                  <td className="small-regular text-primary-text">{tx.date}</td>
                  <td className="small-regular text-primary-text">{tx.type}</td>
                  <td className={`small-semibold ${tx.amount > 0 ? 'text-secondary' : 'text-red'}`}>{tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()}</td>
                  <td className="small-regular text-secondary-text" style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex gap-2 align-items-center">
            <button className="btn btn-light btn-sm rounded-circle px-2" disabled>1</button>
            <button className="btn btn-link btn-sm text-primary">2</button>
            <button className="btn btn-link btn-sm text-primary">3</button>
            <span className="small-regular text-secondary-text">...</span>
            <button className="btn btn-link btn-sm text-primary">98</button>
            <button className="btn btn-link btn-sm text-primary">99</button>
            <button className="btn btn-link btn-sm text-primary">100</button>
          </div>
          <button className="btn btn-success btn-sm px-4 rounded-pill">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;