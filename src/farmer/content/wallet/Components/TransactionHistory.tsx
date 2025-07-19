import React from "react";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// Transaction type
interface Transaction {
  refId: string;
  date: string;
  type: "Voucher" | "Money";
  amount: number;
  purpose: string;
}

const transactions: Transaction[] = [
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Voucher",
    amount: 5000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Money",
    amount: -2000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Voucher",
    amount: 5000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Money",
    amount: -2000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Voucher",
    amount: 5000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Voucher",
    amount: 5000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Money",
    amount: -2000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    refId: "456789356",
    date: "2025/05/20",
    type: "Voucher",
    amount: 5000,
    purpose: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
];

// Responsive tweaks for pagination
const style = `
@media (max-width: 576px) {
  .pagination-controls {
    flex-direction: column !important;
    gap: 1rem !important;
  }
  .pagination-controls .btn {
    font-size: 0.9rem;
    padding: 0.25rem 0.75rem;
  }
}
`;

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <style>{style}</style>
      {/* Back Arrow */}
      <div className="mb-3">
        <button
          className="btn p-0 d-flex align-items-center"
          style={{ fontSize: 20 }}
          onClick={() => navigate("/farmer/projects")}
          aria-label="Back to homepage"
        >
          <FaArrowLeft />
        </button>
      </div>
      <div
        className="container-fluid py-4 bg-background"
        style={{ minHeight: "100vh" }}
      >
        {/* Top Cards */}
        <div className="row mb-4">
          <div
            className="w-100 mb-2"
            style={{ maxWidth: "315px", minHeight: "184px", flexShrink: 0 }}
          >
            <div
              className="rounded-4 p-4 bg-primary text-white position-relative"
              style={{ minHeight: 120 }}
            >
              <div className="small-medium mb-2" style={{ opacity: 0.8 }}>
                Personal Balance
              </div>
              <div className="h2-medium mb-3">KES 5,000,000</div>
              <button
                className="d-inline-flex align-items-start btn bg-white caption-bold text-black"
                style={{ color: "black" }}
              >
                Topup
              </button>
            </div>
          </div>
          <div
            className="w-100"
            style={{ maxWidth: "315px", minHeight: "184px", flexShrink: 0 }}
          >
            <div
              className="rounded-4 p-4 bg-primary text-white position-relative"
              style={{ minHeight: 120 }}
            >
              <div className="small-medium mb-2" style={{ opacity: 0.8 }}>
                Vouchers
              </div>
              <div className="h2-medium mb-3">12,000,000</div>
              <button
                className="d-inline-flex align-items-start btn bg-white caption-bold text-black"
                style={{ color: "black" }}
              >
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History Table Card */}
        <div className="bg-cards-form rounded-4 p-4 shadow-sm position-relative">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="h3-semibold mb-0">Transaction History</div>
            <div className="d-flex align-items-center gap-3">
              <span className="small-regular text-secondary-text">
                Showing 1-10 of 100 Transaction History
              </span>
              <span className="small-regular text-secondary-text">
                Sort by:
              </span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr style={{ background: "var(--background)" }}>
                  <th className="small-semibold text-secondary-text">
                    REF ID{" "}
                    <FaArrowDown className="ms-1" style={{ fontSize: 12 }} />
                  </th>
                  <th className="small-semibold text-secondary-text">
                    Date{" "}
                    <FaArrowDown className="ms-1" style={{ fontSize: 12 }} />
                  </th>
                  <th className="small-semibold text-secondary-text">
                    Type{" "}
                    <FaArrowDown className="ms-1" style={{ fontSize: 12 }} />
                  </th>
                  <th className="small-semibold text-secondary-text">
                    Amount{" "}
                    <FaArrowDown className="ms-1" style={{ fontSize: 12 }} />
                  </th>
                  <th className="small-semibold text-secondary-text">
                    Purpose{" "}
                    <FaArrowDown className="ms-1" style={{ fontSize: 12 }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    style={{
                      background: idx % 2 === 0 ? "var(--background)" : "#fff",
                    }}
                  >
                    <td className="small-regular text-primary-text">
                      {tx.refId}
                    </td>
                    <td className="small-regular text-primary-text">
                      {tx.date}
                    </td>
                    <td className="small-regular text-primary-text">
                      {tx.type}
                    </td>
                    <td
                      className={`small-semibold ${
                        tx.amount > 0 ? "text-secondary" : "text-red"
                      }`}
                    >
                      {tx.amount > 0
                        ? `+${tx.amount.toLocaleString()}`
                        : tx.amount.toLocaleString()}
                    </td>
                    <td
                      className="small-regular text-secondary-text"
                      style={{
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {tx.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3 pagination-controls">
            <div className="d-flex gap-2 align-items-center justify-content-center">
              <button
                className="btn btn-light btn-sm rounded-circle px-2"
                disabled
              >
                1
              </button>
              <button className="btn btn-link btn-sm text-primary">2</button>
              <button className="btn btn-link btn-sm text-primary">3</button>
              <span className="small-regular text-secondary-text">...</span>
            </div>
            <button className="btn btn-sm px-4 rounded-pill bg-primary text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
