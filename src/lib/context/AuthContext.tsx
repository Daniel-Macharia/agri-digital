import { createContext, ReactNode, useContext, useState } from "react";
import { LoginView } from "../model/AuthModel";

interface AuthContextProps {
  currentLoginView: LoginView;
  setCurrentLoginView: (loginView: LoginView) => void;
  username?: string;
  setUsername: (username?: string) => void;
  mfaAccessToken?: string;
  setMfaAccessToken: (mfaAccessToken?: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be provided for AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentLoginView, setCurrentLoginView] = useState<LoginView>(
    LoginView.LOGIN
  );
  const [username, setUsername] = useState<string>();
  const [mfaAccessToken, setMfaAccessToken] = useState<string>();

  return (
    <AuthContext.Provider
      value={{
        currentLoginView,
        setCurrentLoginView,
        username,
        setUsername,
        mfaAccessToken,
        setMfaAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
