import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const HARDCODED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFtYW4gU2luZ2giLCJuYmYiOjE3NjczNTAxMTYsImV4cCI6MTc2NzM1MzcxNiwiaWF0IjoxNzY3MzUwMTE2fQ.cIZrCavROOGaWYl9zuB_AuTw_cvZiboloEpX0soaeW4";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    const tokenToStore = authToken || HARDCODED_TOKEN;
    setToken(tokenToStore);
    setUser(userData);
    localStorage.setItem("token", tokenToStore);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
