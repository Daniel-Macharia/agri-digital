import { Route, Routes } from "react-router-dom";
import TransactionHistory from "./Components/TransactionHistory";
import Topup from "./Components/Topup";
import Vouchers from "./Components/Vouchers";
import Beneficiaries from "./Components/Beneficiaries";
import CreatingVoucher from "./Components/CreatingVoucher";
import { WALLET_ROUTES } from "./Components/Wallet.Route";



const WalletRoutes = () => {
  return (
    <Routes>
     


      <Route path={WALLET_ROUTES.LANDING} element={<TransactionHistory />} />
      <Route path={WALLET_ROUTES.TOPUP} element={<Topup />} />
      <Route path={WALLET_ROUTES.VOUCHERS} element={<Vouchers />} />
      <Route path={WALLET_ROUTES.BENEFICIARIES} element={<Beneficiaries />} />
      <Route path={WALLET_ROUTES.CREATING} element={<CreatingVoucher />} />



     





    </Routes>
  );
};

export default WalletRoutes;
