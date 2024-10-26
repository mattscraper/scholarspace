import React, { useState, useContext, createContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || null;
  });

  const login = (id, name) => {
    setIsAuthenticated(true);
    setUserId(id);
    setUsername(name); // Change here to set the correct username
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", id);
    localStorage.setItem("username", name); // Change here to set the correct username

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
    setIsAuthenticated(false);
    setUserId(null);
    setUsername(null); // Clear username on logout
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    toast({
      title: "Logged Out",
      description: "Successfully Logged out", // Corrected spelling here
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
    if (isAuthenticated) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username"); // Clear username from local storage if not authenticated
    }
  }, [isAuthenticated, userId, username]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
