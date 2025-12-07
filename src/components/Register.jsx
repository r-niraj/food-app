import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { login } = useApp();
  const nav = useNavigate();

  const handleRegister = () => {
    if (!name || !phone) return alert("Fill all details");
    // For this simple frontend, we immediately register & login the user
    const user = { name, phone };
    login(user);
    nav("/home", { replace: true });
  };

  return (
    <div className="screen-center">
      <div className="card-auth">
        <h2>Register</h2>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="input" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" className="input" />
        <button className="btn" onClick={handleRegister}>Register & Continue</button>
      </div>
    </div>
  );
}
