import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Topup = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("Mpesa");

  return (
    <div
      className="container-fluid py-4 bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Back to Wallets */}
      <div
        className="mb-4 d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/farmer/wallet")}
      >
        <FaArrowLeft style={{ fontSize: 18, marginRight: 8 }} />
        <span className="small-medium">Back to Wallets</span>
      </div>

      {/* Current Balance Card */}
      <div className="mb-4" style={{ maxWidth: 320 }}>
        <div
          className="rounded-4 p-4"
          style={{
            background: "#388e3c",
            color: "#fff",
            minHeight: 120,
            borderRadius: 20,
          }}
        >
          <div className="small-medium mb-2" style={{ opacity: 0.8 }}>
            Current Balance
          </div>
          <div className="h2-medium" style={{ fontSize: 28, fontWeight: 600 }}>
            KES 5,000,000
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-column align-items-start"
        style={{ maxWidth: "152px", gap: "0" }}
      >
        <div className="body-bold mb-0">Amount to Top Up</div>
        <div className="d-flex align-items-center">
          <div className="h2-semibold text-success">KES 15,000</div>
        </div>
      </div>

      {/* Choose Top Up Method */}
      <div
        className="d-flex flex-column align-items-start gap-2 w-100"
        style={{ minHeight: "233px", flexShrink: 0 }}
      >
        <div className="body-bold">Choose Top Up Method</div>
        <div className="d-flex flex-column align-items-center w-100" style={{ maxWidth: "984px", gap: "12px" }}>
          {/* Mpesa */}
          <label
            className="d-flex align-items-center bg-white rounded-3 px-3 py-3 w-100"
            style={{ border: "1px solid #eee", cursor: "pointer", minHeight: 48 }}
          >
            <input
              type="radio"
              name="topup-method"
              value="Mpesa"
              checked={selectedMethod === "Mpesa"}
              onChange={() => setSelectedMethod("Mpesa")}
              className="form-check-input me-2"
              style={{ accentColor: "#A259FF", width: 18, height: 18 }}
            />
            <span style={{ fontSize: 16, marginRight: 8 }}>Mpesa</span>
            <div style={{ flex: 1 }} />
            <span
              className="badge bg-white border border-success text-success"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              Mpesa
            </span>
          </label>

          {/* Credit Card */}
          <label
            className="d-flex align-items-center bg-white rounded-3 px-3 py-3 w-100"
            style={{ border: "1px solid #eee", cursor: "pointer", minHeight: 48 }}
          >
            <input
              type="radio"
              name="topup-method"
              value="Credit Card"
              checked={selectedMethod === "Credit Card"}
              onChange={() => setSelectedMethod("Credit Card")}
              className="form-check-input me-2"
              style={{ accentColor: "#A259FF", width: 18, height: 18 }}
            />
            <span style={{ fontSize: 16, marginRight: 8 }}>Credit Card</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 22, display: "flex", alignItems: "center" }}>
              <SiVisa style={{ color: "#1a1f71", marginRight: 4 }} />
              <SiMastercard style={{ color: "#eb001b" }} />
            </span>
          </label>

          {/* Wallet */}
          <label
            className="d-flex align-items-center bg-white rounded-3 px-3 py-3 w-100"
            style={{ border: "1px solid #eee", cursor: "pointer", minHeight: 48 }}
          >
            <input
              type="radio"
              name="topup-method"
              value="Wallet"
              checked={selectedMethod === "Wallet"}
              onChange={() => setSelectedMethod("Wallet")}
              className="form-check-input me-2"
              style={{ accentColor: "#A259FF", width: 18, height: 18 }}
            />
            <span style={{ fontSize: 16, marginRight: 8 }}>Wallet</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 22, display: "flex", alignItems: "center" }}>
              <MdOutlineAccountBalanceWallet style={{ color: "#ffb300" }} />
            </span>
          </label>
        </div>
      </div>

      {/* Top Up Button */}
      <button
        className="btn w-100 mt-4"
        style={{
          background: "#388e3c",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        Top Up
      </button>
    </div>
  );
};

export default Topup;
