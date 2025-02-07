import React, { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../Features/Auth/Api/Auth.ts";

interface AuthContextType {
    accessToken: string | null,
    setAccessToken: (token: string | null) => void;
    userRole: string | null;
    setUserRole: (role: string | null) => void;
    refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
  
    useEffect(() => {
      refreshAccessToken(setAccessToken);
    }, []);
  
    return (
      <AuthContext.Provider value={{ accessToken, setAccessToken, userRole, setUserRole, refreshAccessToken: () => refreshAccessToken(setAccessToken) }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error();
    }
    return context;
};