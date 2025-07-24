
import { FaArrowLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const vouchers = [
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Open",
    amount: 150000,
    balance: 0,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Closed",
    amount: 20000,
    balance: 0,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Open",
    amount: 1000000,
    balance: 400000,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Closed",
    amount: 250000,
    balance: 10000,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Open",
    amount: 300000,
    balance: 0,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Closed",
    amount: 350000,
    balance: 200000,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Open",
    amount: 500000,
    balance: 200000,
    purpose: "Lorem Ipsum",
  },
  {
    id: "456789356",
    date: "2025/05/20",
    type: "Closed",
    amount: 250000,
    balance: 0,
    purpose: "Lorem Ipsum",
  },
];

const Vouchers = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid py-4 bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Back to Wallets */}
      <div className="mb-3">
        <button
          className="btn p-0 d-flex align-items-center"
          style={{ fontSize: 20 }}
          onClick={() => navigate("/farmer/wallet")}
          aria-label="Back to Wallets"
        >
          <FaArrowLeft />
          <span className="ms-2 small-medium">Back to Wallets</span>
        </button>
      </div>
      <div
        className="bg-white rounded-4 p-4 shadow-sm position-relative w-100"
        style={{ margin: "0 auto" }}
      >
        {/* Header Row */}
        <div className="row justify-content-between align-items-center mb-3 g-2 flex-column flex-md-row">
          <div className="col-auto h3-semibold mb-2 mb-md-0">Vouchers</div>
          <div className="col-auto">
            <button
              className="btn w-100 w-md-auto"
              style={{
                background: "#388e3c",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                minWidth: 200,
              }}
            >
              Create New Voucher
            </button>
          </div>
        </div>
        {/* Table Controls */}
        <div className="row justify-content-between align-items-center mb-2 g-2 flex-column flex-md-row">
          <div className="col-auto small-regular text-secondary-text">Vouchers ID</div>
          <div className="col-auto small-regular text-secondary-text">
            Showing 1-10 of 100 Transaction History
          </div>
          <div className="col-auto small-regular text-secondary-text">
            Sort by: <b>Type</b> <span style={{ fontSize: 18 }}>▼</span>
          </div>
        </div>
        {/* Table */}
        <div className="table-responsive w-100">
          <table className="table align-middle mb-0 w-100">
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th className="small-semibold">Vouchers ID</th>
                <th className="small-semibold">Date Created</th>
                <th className="small-semibold">Type</th>
                <th className="small-semibold">Amount</th>
                <th className="small-semibold">Current Balance</th>
                <th className="small-semibold">Purpose</th>
                <th className="small-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v, idx) => (
                <tr
                  key={idx}
                  style={{ background: idx % 2 === 0 ? "#fafafa" : "#fff" }}
                >
                  <td>{v.id}</td>
                  <td>{v.date}</td>
                  <td>{v.type}</td>
                  <td style={{ color: "#388e3c", fontWeight: 600 }}>
                    {v.amount.toLocaleString()}
                  </td>
                  <td style={{ color: "#ff9800", fontWeight: 600 }}>
                    {v.balance.toLocaleString()}
                  </td>
                  <td>{v.purpose}</td>
                  <td>
                    <a href="#" style={{ color: "#388e3c", fontWeight: 500 }}>
                      View More
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="row justify-content-between align-items-center mt-4 g-2 flex-column flex-md-row">
          <div className="col-auto d-flex align-items-center gap-2 flex-wrap">
            <button
              className="btn btn-success btn-sm rounded-circle px-2"
              style={{
                background: "#e6fae6",
                color: "#388e3c",
                border: 0,
                fontWeight: 600,
              }}
            >
              1
            </button>
            <button className="btn btn-link btn-sm text-success">2</button>
            <button className="btn btn-link btn-sm text-success">3</button>
            <span className="small-regular text-secondary-text">...</span>
       
          </div>
          <div className="col-auto mt-2 mt-md-0">
            <button
              className="btn w-100 w-md-auto"
              style={{
                background: "#388e3c",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 600,
                minWidth: 70,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vouchers;
