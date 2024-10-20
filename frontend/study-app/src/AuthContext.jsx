import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
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
    toast({
      title: "Logged in",
      description: "Welcome back",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate("/viewrooms");
    }, 500);
  };
  const logout = () => {
    setisAuthenticated(false);
    setUserId(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    toast({
      title: "Logged Out",
      description: "Succesfully Logged out",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1200);
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
