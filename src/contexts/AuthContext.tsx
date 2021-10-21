import { createContext, ReactNode } from "react";

interface PAuthProvider {
  children: ReactNode;
}

type TAuthContext = {
  isAuthenticated: boolean;
} | null;

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: PAuthProvider) => {
  const isAuthenticated = true;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
