import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../auth/sign-in/Login";
import SignUp from "../../auth/sign-up/SignUp";
import NotFound from "../exceptions/NotFound";
import Otp from "../../auth/verify-otp/Otp";
import EnterPassword from "../../auth/sign-in/EnterPassword";
import CreatePassword from "../../auth/sign-up/CreatePassword";

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
