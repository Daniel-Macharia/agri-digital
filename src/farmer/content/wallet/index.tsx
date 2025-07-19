import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./Components/TransactionHistory";


const WalletRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TransactionHistory />} />
 
    </Routes>
  );
};

export default WalletRoutes;
