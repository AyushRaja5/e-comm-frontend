// src/context/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(''); 
  
  useEffect(() => {
    // Check if token exists in local storage and update authentication state
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', data.user.role);
    setRole(data.user.role)
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
