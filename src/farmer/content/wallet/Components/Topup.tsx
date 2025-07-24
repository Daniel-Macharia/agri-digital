import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Topup = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("Mpesa");

  return (
    <div
      className="container-fluid bg-background"
      style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Back to Wallets */}
      <div
        className="mb-4 d-flex align-items-center w-100"
        style={{ cursor: "pointer", maxWidth: 1000, marginTop: 24 }}
        onClick={() => navigate("/farmer/wallet")}
      >
        <FaArrowLeft style={{ fontSize: 18, marginRight: 8 }} />
        <span className="small-medium">Back to Wallets</span>
      </div>

      {/* Main Content */}
      <div style={{ width: "100%" }}>
        {/* Current Balance Card */}
        <div className="mb-5" style={{ width: "100%" }}>
          <div
            className="rounded-4 p-4"
            style={{
              background: "#388e3c",
              color: "#fff",
              minHeight: 120,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%"
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

        {/* Amount to Top Up */}
        <div
          className="d-flex flex-column align-items-start mb-4"
          style={{ width: "100%", gap: "0" }}
        >
          <div className="body-bold mb-0">Amount to Top Up</div>
          <div className="d-flex align-items-center">
            <div className="h2-semibold" style={{ color: "#388e3c", fontWeight: 700, fontSize: 22 }}>
              KES 15,000
            </div>
          </div>
        </div>

        {/* Choose Top Up Method */}
        <div
          className="d-flex flex-column align-items-start gap-2 w-100 mb-4"
          style={{ minHeight: "233px", flexShrink: 0 }}
        >
          <div className="body-bold mb-2">Choose Top Up Method</div>
          <div className="d-flex flex-column align-items-center w-100" style={{ width: "100%", gap: "16px" }}>
            {/* Mpesa */}
            <label
              className="d-flex align-items-center bg-white rounded-3 px-3 py-3 w-100"
              style={{ border: selectedMethod === "Mpesa" ? "2px solid #388e3c" : "1px solid #eee", cursor: "pointer", minHeight: 48, boxShadow: selectedMethod === "Mpesa" ? "0 2px 8px #e8f5e9" : "none" }}
            >
              <input
                type="radio"
                name="topup-method"
                value="Mpesa"
                checked={selectedMethod === "Mpesa"}
                onChange={() => setSelectedMethod("Mpesa")}
                className="form-check-input me-2"
                style={{ accentColor: "#388e3c", width: 18, height: 18 }}
              />
              <span style={{ fontSize: 16, marginRight: 8 }}>Mpesa</span>
              <div style={{ flex: 1 }} />
              <span
                className="badge bg-white border border-success text-success"
                style={{ fontSize: 13, fontWeight: 600, background: "#fff", borderColor: "#388e3c" }}
              >
                Mpesa
              </span>
            </label>

            {/* Credit Card */}
            <label
              className="d-flex align-items-center bg-white rounded-3 px-3 py-3 w-100"
              style={{ border: selectedMethod === "Credit Card" ? "2px solid #388e3c" : "1px solid #eee", cursor: "pointer", minHeight: 48, boxShadow: selectedMethod === "Credit Card" ? "0 2px 8px #e8f5e9" : "none" }}
            >
              <input
                type="radio"
                name="topup-method"
                value="Credit Card"
                checked={selectedMethod === "Credit Card"}
                onChange={() => setSelectedMethod("Credit Card")}
                className="form-check-input me-2"
                style={{ accentColor: "#388e3c", width: 18, height: 18 }}
              />
              <span style={{ fontSize: 16, marginRight: 8 }}>Credit Card</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 22, display: "flex", alignItems: "center", gap: 4 }}>
                <SiVisa style={{ color: "#1a1f71" }} />
                <SiMastercard style={{ color: "#eb001b" }} />
              </span>
            </label>

            {/* Wallet */}
            <label
              className="d-flex align-items-center bg-white rounded-3 px-3 py-3 w-100"
              style={{ border: selectedMethod === "Wallet" ? "2px solid #388e3c" : "1px solid #eee", cursor: "pointer", minHeight: 48, boxShadow: selectedMethod === "Wallet" ? "0 2px 8px #e8f5e9" : "none" }}
            >
              <input
                type="radio"
                name="topup-method"
                value="Wallet"
                checked={selectedMethod === "Wallet"}
                onChange={() => setSelectedMethod("Wallet")}
                className="form-check-input me-2"
                style={{ accentColor: "#388e3c", width: 18, height: 18 }}
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
            minHeight: 48,
            boxShadow: "0 2px 8px #e8f5e9",
            letterSpacing: 0.5,
          }}
        >
          Top Up
        </button>
      </div>
    </div>
  );
};

export default Topup;