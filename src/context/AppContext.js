import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loadCart,
  saveCart,
  clearCart as clearCartLS,
  loadUser,
  saveUser,
  clearUser,
  loadLocation,
  saveLocation,
  clearLocation
} from "../utils/localStorage";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadUser()); // { name, phone }
  const [cart, setCart] = useState(() => loadCart());
  const [location, setLocationState] = useState(() => loadLocation());

  // persist cart
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // persist user when changed
  useEffect(() => {
    if (user) saveUser(user);
  }, [user]);

  // persist location
  useEffect(() => {
    saveLocation(location);
  }, [location]);

  function login(u) {
    setUser(u);
    saveUser(u);
  }
  function logout() {
    setUser(null);
    clearUser();
  }

  function addQty(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function minusQty(id) {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    );
  }

  function setQty(id, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => p.id !== id);
      const found = prev.find((p) => p.id === id);
      if (found) return prev.map((p) => (p.id === id ? { ...p, qty } : p));
      return prev;
    });
  }

  function clearCart() {
    setCart([]);
    clearCartLS();
  }

  function setLocation(l) {
    setLocationState(l);
    saveLocation(l);
  }

  // clear all on success
  function clearAllOnSuccess() {
    clearCart();
    clearLocation();
  }

  const totalItems = cart.reduce((s, p) => s + p.qty, 0);
  const totalPrice = cart.reduce((s, p) => s + p.qty * p.price, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addQty,
        minusQty,
        setQty,
        clearCart,
        totalItems,
        totalPrice,
        location,
        setLocation,
        clearAllOnSuccess
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
