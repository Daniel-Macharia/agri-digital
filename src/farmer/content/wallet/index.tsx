import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./Components/TransactionHistory";
import Topup from "./Components/Topup";


const WalletRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TransactionHistory />} />
      <Route path="topup" element={<Topup />} /> 
 
    </Routes>
  );
};

export default WalletRoutes;
