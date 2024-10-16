import { useState, useEffect } from "react";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";

import Login from "./Pages/login";
import Home from "./Pages/home";
import About from "./Pages/about";
import { Register } from "./Pages/register";
import { AuthProvider } from "./AuthContext";
import { AddRoom } from "./Pages/addroom";
import { ViewRooms } from "./Pages/viewrooms";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/viewrooms" element={<ViewRooms />} />
            <Route path="/addroom" element={<AddRoom />} />
            <Route path="/register" element={<Register />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
