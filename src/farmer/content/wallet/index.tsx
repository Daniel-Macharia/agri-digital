import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./Components/TransactionHistory";
import Topup from "./Components/Topup";
import Vouchers from "./Components/Vouchers";
import Beneficiaries from "./Components/Beneficiaries";

const WalletRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TransactionHistory />} />
      <Route path="topup" element={<Topup />} />
      <Route path="vouchers" element={<Vouchers />} />
      <Route path="beneficiaries" element={<Beneficiaries />} />

    </Routes>
  );
};

export default WalletRoutes;
