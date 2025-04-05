import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup";
import Login from "./pages/login";
import React from "react";
import PublicRoute from "./pages/publicRoute";
import AddProduct from "./pages/addProducts.jsx";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          x
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
