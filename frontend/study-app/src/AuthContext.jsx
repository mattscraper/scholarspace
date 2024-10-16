import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null; // Retrieve userId from local storage
  });

  const login = (id) => {
    setisAuthenticated(true);
    setUserId(id);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", id);
  };
  const logout = () => {
    setisAuthenticated(false);
    setUserId(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    if (isAuthenticated && userId) {
      localStorage.setItem("userId", userId); // Store user ID in local storage if authenticated
    }
  }, [isAuthenticated, userId]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
