// AuthProvider.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("token") !== null; 
      });

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false); 
    // setAccount(null); 
    localStorage.removeItem("token"); 
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
