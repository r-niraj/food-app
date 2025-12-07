import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useApp } from "../context/AppContext";
import BackButton from "./BackButton";

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { cart, addQty, minusQty } = useApp();

  const product = products.find(p => String(p.id) === String(id));
  if (!product) return <div className="page"><BackButton /> <div className="container">Product not found</div></div>;

  const qty = cart.find(p => p.id === product.id)?.qty || 0;

  return (
    <div className="page">
      <div className="topbar">
        <BackButton />
        <div className="title">Product</div>
      </div>

      <div className="content">
        <img src={product.image} alt={product.name} className="detail-img" />
        <div className="detail-body">
          <h2>{product.name}</h2>
          <div className="price-large">₹{product.price}</div>
          <p className="muted">{product.description}</p>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div className="controls">
              <button className="qty-btn" onClick={() => minusQty(product.id)}>-</button>
              <div className="qty-num">{qty}</div>
              <button className="qty-btn" onClick={() => addQty(product)}>+</button>
            </div>

            <button className="btn" onClick={() => nav("/cart")}>Go to Cart</button>
          </div>

          <hr style={{ margin: "16px 0" }} />
          <h3>Reviews</h3>
          <div className="review">Karan — "Very tasty!"</div>
          <div className="review">Lindsay — "Will order again."</div>
        </div>
      </div>
    </div>
  );
}
