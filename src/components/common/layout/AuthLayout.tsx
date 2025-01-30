import React from "react";

const AuthLayout: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return (
    <div className="auth-body">
      <div className="auth-container shadow-sm">{element}</div>
    </div>
  );
};
export default AuthLayout;
