import { Fragment } from "react";
import { AuthProvider, useAuth } from "../../lib/context/AuthContext.tsx";
import { LoginView } from "../../lib/model/AuthModel.ts";
import "../auth-style.css";
import EnterPassword from "./partials/EnterPassword.tsx";
import LoginForm from "./partials/LoginForm.tsx";
import OtpLoginForm from "./partials/OtpLogin.tsx";

const Login = () => {
  return (
    <AuthProvider>
      <LoginViewManager />
    </AuthProvider>
  );
};

const LoginViewManager = () => {
  const { currentLoginView } = useAuth();

  return (
    <Fragment>
      {currentLoginView === LoginView.LOGIN && <LoginForm />}
      {currentLoginView === LoginView.PASSWORD && <EnterPassword />}
      {currentLoginView === LoginView.OTP && <OtpLoginForm />}
    </Fragment>
  );
};

export default Login;
