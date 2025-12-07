import React from "react";
import products from "../data/products";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import BackButton from "./BackButton";

/* Home - product grid with qty controls */
export default function Home() {
  const nav = useNavigate();
  const { cart, addQty, minusQty } = useApp();
  const qtyOf = (id) => cart.find(p => p.id === id)?.qty || 0;

  return (
    <div className="page">
      <header className="topbar">
        <div className="title">Food Menu</div>
      </header>

      <main className="content">
        <div className="grid">
          {products.map(item => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.name} className="thumb" onClick={() => nav(`/product/${item.id}`)} />
              <div className="card-body">
                <div className="row">
                  <div className="name">{item.name}</div>
                  <div className="price">₹{item.price}</div>
                </div>

                <div className="controls">
                  <button className="qty-btn" onClick={() => minusQty(item.id)}>-</button>
                  <div className="qty-num">{qtyOf(item.id)}</div>
                  <button className="qty-btn" onClick={() => addQty(item)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
