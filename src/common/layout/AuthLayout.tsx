import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "../../lib/Routes";

const NotFound = lazy(() => import("../exceptions/NotFound"));
const Login = lazy(() => import("../../auth/sign-in/Login"));
const SignUp = lazy(() => import("../../auth/sign-up/SignUp"));
const ForgotPassword = lazy(
  () => import("../../auth/password-reset/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../../auth/password-reset/ResetPassword")
);

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-body">
      <Routes>
        <Route path={APP_ROUTES.AUTH.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
        <Route
          path={APP_ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route
          path={APP_ROUTES.AUTH.RESET_PASSWORD}
          element={<ResetPassword />}
        />
        {/* <Route path="/create-password" element={<CreatePassword />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default AuthLayout;
