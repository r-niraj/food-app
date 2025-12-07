import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import BackButton from "./BackButton";
import { placeOrder } from "../api";

export default function Checkout() {
  const { cart, totalPrice, location, clearAllOnSuccess } = useApp();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [landmark, setLandmark] = useState("");
  const [timeslot, setTimeslot] = useState("ASAP");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handlePlace(e) {
    e.preventDefault();
    if (!name || !mobile) return alert("Please enter name & mobile");
    if (!location || !location.latitude) return alert("Location not available");

    const payload = {
      customer: { name, mobile, landmark, timeslot, payment: "Cash on Delivery" },
      location: { lat: location.latitude, lng: location.longitude, address: location.address || null },
      cart: cart.map(p => ({ id: p.id, name: p.name, price: p.price, qty: p.qty })),
      totalAmount: totalPrice,
      orderedAt: new Date().toISOString()
    };

    setLoading(true);
    try {
      const res = await placeOrder(payload);
      setLoading(false);
      // clear local storage states
      clearAllOnSuccess();
      alert("Order placed! OrderId: " + (res.orderId || "LOCAL-OK"));
      nav("/home", { replace: true });
    } catch (err) {
      setLoading(false);
      alert("Failed to place order.");
    }
  }

  return (
    <div className="page">
      <div className="topbar">
        <BackButton />
        <div className="title">Checkout</div>
      </div>

      <div className="content">
        <form onSubmit={handlePlace}>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} />

          <label className="label">Mobile</label>
          <input className="input" value={mobile} onChange={e => setMobile(e.target.value)} />

          <label className="label">Landmark</label>
          <input className="input" value={landmark} onChange={e => setLandmark(e.target.value)} />

          <label className="label">Delivery slot</label>
          <select className="input" value={timeslot} onChange={e => setTimeslot(e.target.value)}>
            <option>ASAP</option>
            <option>10:00-11:00</option>
            <option>11:00-12:00</option>
            <option>12:00-13:00</option>
          </select>

          <div style={{ marginTop: 12 }}>
            <div className="muted">Delivery address:</div>
            <div style={{ marginTop: 6 }}>{location?.address || `${location?.latitude}, ${location?.longitude}`}</div>
          </div>

          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 800 }}>Total</div>
            <div style={{ fontWeight: 800 }}>₹{totalPrice}</div>
          </div>

          <button type="submit" className="btn" style={{ marginTop: 12 }} disabled={loading}>
            {loading ? "Placing order..." : "Place Order (COD)"}
          </button>
        </form>
      </div>
    </div>
  );
}
