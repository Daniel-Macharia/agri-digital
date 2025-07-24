import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Types
interface Beneficiary {
  name: string;
  email: string;
  gender: string;
  specificItem: string;
  createdDate: string;
  vendor: string;
}

const beneficiaries: Beneficiary[] = Array.from({ length: 100 }, (_, i) => ({
  name: i % 2 === 0 ? "John Doe" : "Jane Doe",
  email: i % 2 === 0 ? "john@example.com" : "jane@example.com",
  gender: i % 2 === 0 ? "Male" : "Female",
  specificItem: "N.P.K Fertilizer",
  createdDate: "2025/05/20",
  vendor: "Vendor's Name",
}));

const voucher = {
  id: "VCH-2025-001",
  type: "Closed",
  specificItem: "N.P.K Fertilizer",
  amount: 50000,
  createdDate: "2025/05/20",
  details:
    "Lorem ipsum dolor sit amet consectetur. A eros bibendum cras non pulvinar est iaculis maecenas facilisi. Iaculis proin et fermentum malesuada consectetur sed cursus orci. Aliquet urna bibendum at nulla. Et vulputate nunc tristique felis ipsum. Amet.",
};

const Beneficiaries: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(beneficiaries.length / pageSize);
  const [sortBy, setSortBy] = useState<"name" | "email">("name");

  const sorted = [...beneficiaries].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container-fluid py-4 bg-background" style={{ minHeight: "100vh" }}>
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
      {/* Green Balance Card */}
      <div className="mb-4" style={{ maxWidth: 220 }}>
        <div
          className="rounded-4 p-4"
          style={{ background: "#388e3c", color: "#fff", minHeight: 90, borderRadius: 20 }}
        >
          <div className="small-medium mb-2" style={{ opacity: 0.8 }}>
            Current Balance
          </div>
          <div className="h2-medium" style={{ fontSize: 28, fontWeight: 600 }}>
            0
          </div>
        </div>
      </div>
      {/* Voucher Details Card */}
      <div className="bg-white rounded-4 p-4 shadow-sm position-relative w-100 mb-4">
        <div className="row mb-2">
          <div className="col-md-6 col-12 mb-2 mb-md-0">
            <div className="h5 mb-3">Voucher</div>
            <div className="row mb-2">
              <div className="col-6 small-regular text-secondary-text">Voucher ID</div>
              <div className="col-6 small-regular">{voucher.id}</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 small-regular text-secondary-text">Type</div>
              <div className="col-6 small-regular">{voucher.type}</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 small-regular text-secondary-text">Specific Purpose/ Item</div>
              <div className="col-6 small-regular">{voucher.specificItem}</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 small-regular text-secondary-text">Total Amount</div>
              <div className="col-6 small-regular">KES {voucher.amount.toLocaleString()}</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 small-regular text-secondary-text">Created Date</div>
              <div className="col-6 small-regular">{voucher.createdDate}</div>
            </div>
          </div>
          <div className="col-md-6 col-12 d-flex flex-column align-items-md-end align-items-start justify-content-end">
            <div className="small-regular text-secondary-text mb-1">ID of the Voucher</div>
            <div className="small-regular text-secondary-text mb-1">Closed</div>
            <div className="small-regular text-secondary-text mb-1">KES</div>
            <div className="small-regular text-secondary-text mb-1">2025/05/20</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="h6 mb-1">Details</div>
          <div className="small-regular text-secondary-text">{voucher.details}</div>
        </div>
      </div>
      {/* Beneficiaries Table */}
      <div className="bg-white rounded-4 p-4 shadow-sm position-relative w-100">
        <div className="h5 mb-3">Voucher Beneficiaries</div>
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <div className="small-regular text-secondary-text">
            Showing {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, beneficiaries.length)} of {beneficiaries.length} Beneficiaries
          </div>
          <div className="small-regular text-secondary-text">
            Sort by <b style={{ cursor: "pointer" }} onClick={() => setSortBy(sortBy === "name" ? "email" : "name")}>{sortBy === "name" ? "Name" : "Email"}</b>
          </div>
        </div>
        <div className="table-responsive w-100">
          <table className="table align-middle mb-0 w-100">
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th className="small-semibold">Name</th>
                <th className="small-semibold">Email</th>
                <th className="small-semibold">Gender</th>
                <th className="small-semibold">Specific Name</th>
                <th className="small-semibold">Created Date</th>
                <th className="small-semibold">Vendor</th>
                <th className="small-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((b, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? "#fafafa" : "#fff" }}>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.gender}</td>
                  <td>{b.specificItem}</td>
                  <td>{b.createdDate}</td>
                  <td style={{ color: "#388e3c", fontWeight: 500 }}>{b.vendor}</td>
                  <td>
                    <a href="#" style={{ color: "#388e3c", fontWeight: 500 }}>
                      View Profile
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex flex-row justify-content-between align-items-center mt-4 gap-2 flex-wrap">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${page === i + 1 ? "btn-success rounded-circle px-2" : "btn-link text-success"}`}
                style={page === i + 1 ? { background: "#e6fae6", color: "#388e3c", border: 0, fontWeight: 600 } : {}}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            )).slice(0, 3)}
            <span className="small-regular text-secondary-text">...</span>
            <button
              className="btn btn-link btn-sm text-success"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </div>
          <div>
            <button
              className="btn w-100 w-md-auto"
              style={{ background: "#388e3c", color: "#fff", borderRadius: 8, fontWeight: 600, minWidth: 70 }}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficiaries;


