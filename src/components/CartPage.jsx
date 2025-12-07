import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import BackButton from "./BackButton";

export default function CartPage() {
  const { cart, addQty, minusQty, totalPrice } = useApp();
  const nav = useNavigate();

  return (
    <div className="page">
      <div className="topbar">
        <BackButton />
        <div className="title">Your Cart</div>
      </div>

      <div className="content">
        {cart.length === 0 && <div className="empty">Your cart is empty</div>}

        {cart.map(item => (
          <div key={item.id} className="cart-row">
            <img src={item.image} alt={item.name} className="cart-thumb" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div className="muted">₹{item.price} × {item.qty}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div className="controls">
                <button className="qty-btn" onClick={() => minusQty(item.id)}>-</button>
                <div className="qty-num">{item.qty}</div>
                <button className="qty-btn" onClick={() => addQty(item)}>+</button>
              </div>
              <div style={{ fontWeight: 800 }}>₹{item.qty * item.price}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800 }}>Total</div>
          <div style={{ fontWeight: 800 }}>₹{totalPrice}</div>
        </div>

        {cart.length > 0 && <button className="btn" style={{ marginTop: 12 }} onClick={() => nav("/checkout")}>Proceed to Checkout</button>}
      </div>
    </div>
  );
}
