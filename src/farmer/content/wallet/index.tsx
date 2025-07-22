import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./Components/TransactionHistory";
import Topup from "./Components/Topup";
import Vouchers from "./Components/Vouchers";
import Beneficiaries from "./Components/Beneficiaries";
import CreatingVoucher from "./Components/CreatingVoucher";

const WalletRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TransactionHistory />} />
      <Route path="topup" element={<Topup />} />
      <Route path="vouchers" element={<Vouchers />} />
      <Route path="beneficiaries" element={<Beneficiaries />} />
      <Route path="creating" element={<CreatingVoucher />} />
    </Routes>
  );
};

export default WalletRoutes;
