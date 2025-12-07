import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function FloatingCart() {
  const nav = useNavigate();
  const { totalItems } = useApp();

  return (
    <div className="floating-cart" onClick={() => nav("/cart")}>
      <div>Cart</div>
      {totalItems > 0 && <div className="badge">{totalItems}</div>}
    </div>
  );
}
