import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedToken = localStorage.getItem("auth_token");
  const [token, setToken] = useState<string | null>(storedToken);

  const signin = (newToken: string, cb: () => void) => {
    setToken(newToken);
    cb();
  };

  const signout = (cb: () => void) => {
    localStorage.removeItem("auth_token");
    setToken(null);
    cb();
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  const value = { token, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;