import React, { useContext } from "react";
import { CartContext } from "../context/AppContext";
import products from "../data/products";

export default function ProductList({ onOpenDetail }) {
  const { cart, addQty, minusQty } = useContext(CartContext);
  const qtyOf = (id) => cart.find(p => p.id === id)?.qty || 0;

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>New product</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
        {products.map(item => (
          <div key={item.id} style={{
            borderRadius: 12,
            overflow: "hidden",
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.24)",
            cursor: "pointer",
            color: "#fff"
          }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: 140, objectFit: "cover" }} onClick={() => onOpenDetail(item)} />
            <div style={{ padding: 10 }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div style={{ color: "#ffd7b5", fontWeight: 800, marginTop: 6 }}>₹{item.price}</div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
              <div style={{ color: "#dfe6e9", fontSize: 12 }}> </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => minusQty(item.id)} style={qtyBtnStyle}>-</button>
                <div style={{ minWidth: 24, textAlign: "center", color: "#fff" }}>{qtyOf(item.id)}</div>
                <button onClick={() => addQty(item)} style={qtyBtnStyle}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer",
  background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight:700
};
