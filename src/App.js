import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import FloatingCart from "./components/FloatingCart";
import LocationFetcher from "./components/LocationFetcher";

/** ProtectedRoute - wraps routes that require login */
function ProtectedRoute({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [location, setLocation] = useState(null);

  return (
    <AppProvider>
      <LocationFetcher setLocation={setLocation} />
      <MainRoutes />
      <FloatingCart />
    </AppProvider>
  );
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.log("SW registration failed:", err));
}
