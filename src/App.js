import React from "react";
// Import HashRouter here for the main wrapper
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

// Import your components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";
import FloatingCart from "./components/FloatingCart";
import LocationFetcher from "./components/LocationFetcher";

/** * ProtectedRoute - wraps routes that require login */
function ProtectedRoute({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/" replace />;
}

/** * MainRoutes component - Contains the core routing logic, NO LONGER has HashRouter */
function MainRoutes() {
  return (
    // HashRouter is REMOVED from here.
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
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

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


/** * App component - Main wrapper for context and global components
 * The HashRouter is placed here to wrap ALL components that use routing functionality (like useNavigate in FloatingCart).
 */
export default function App() {
  return (
    <AppProvider>
      {/* 🎯 FIX: HashRouter is now the immediate child of AppProvider */}
      <HashRouter>
        <LocationFetcher /> {/* Can now use router hooks */}
        <MainRoutes /> {/* Contains the <Routes> */}
        <FloatingCart /> {/* Can now use router hooks like useNavigate() */}
      </HashRouter>
    </AppProvider>
  );
}


/* -------------------------------
   SERVICE WORKER FOR PWA (GitHub Pages Safe)
--------------------------------*/
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.log("SW registration failed:", err));
}