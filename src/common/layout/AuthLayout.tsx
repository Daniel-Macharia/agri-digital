import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../auth/sign-in/components/Login";
import SignUp from "../../auth/sign-up/components/SignUp";
import NotFound from "../exceptions/NotFound";
import Otp from "../../auth/verify-otp/component/Otp";
import EnterPassword from "../../auth/sign-in/components/EnterPassword";
import CreatePassword from "../../auth/sign-up/components/CreatePassword";

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-body">
      <Routes>
        <Route path="/login" element={<Login /> } />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/create-password" element={<CreatePassword />} />

        <Route path="/enter-password" element={<EnterPassword />} />
        <Route path="/enter-otp" element={<Otp />} />

        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
};
export default AuthLayout;
