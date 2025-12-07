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


// /* -------------------------------
//    SERVICE WORKER FOR PWA (GitHub Pages Safe)
// --------------------------------*/
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./service-worker.js")
//     .then(() => console.log("Service Worker registered"))
//     .catch((err) => console.log("SW registration failed:", err));
// }


/* -------------------------------
  Service Worker Registration (Keep this at the top)
--------------------------------*/
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => {
        console.log("Service Worker registered");
        // Start the notification flow after successful SW registration
        initializeNotificationFlow(); 
    })
    .catch((err) => console.log("SW registration failed:", err));
}

/* -----------------------------------------------------------------
  NOTIFICATION & BADGE SIMULATION LOGIC
----------------------------------------------------------------- */

function initializeNotificationFlow() {
    // 1. Request Notification Permission
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('✅ Notification permission granted. Scheduling simulation...');
            // If granted, schedule the delayed functions
            scheduleDelayedNotificationAndBadge();
        } else {
            console.log('⚠️ Notification permission denied. Cannot show banner/alert.');
        }
    });
}


function scheduleDelayedNotificationAndBadge() {
    const BADGE_COUNT = 3; 
    const ONE_MINUTE_MS = 60 * 1000; // 1 minute delay

    console.log(`Scheduling notification and badge in ${ONE_MINUTE_MS / 1000} seconds...`);

    // Set the timer to execute the function after 1 minute
    setTimeout(() => {
        // --- 1. SHOW THE MOBILE NOTIFICATION BANNER/ALERT ---
        if (Notification.permission === 'granted') {
            try {
                new Notification('📣 New Messages Alert', {
                    body: `You have ${BADGE_COUNT} unread notifications. Tap to view.`,
                    icon: process.env.PUBLIC_URL + "/icons/icon-192.jpeg",
                    vibrate: [200, 100, 200, 100, 200], // Optional: Vibrate pattern on mobile
                    tag: 'simulated-notification' // Optional: Prevents duplicate notifications with the same tag
                });
                console.log('🎉 Mobile notification banner/alert displayed.');
            } catch (e) {
                console.error('Error displaying notification:', e);
            }
        }
        
        // --- 2. SET THE APP ICON BADGE COUNT ---
        if ('setAppBadge' in navigator) {
            navigator.setAppBadge(BADGE_COUNT)
                .then(() => console.log(`App icon badge successfully set to ${BADGE_COUNT}.`))
                .catch(error => console.error('❌ Failed to set app badge:', error));
        }

    }, ONE_MINUTE_MS);
}