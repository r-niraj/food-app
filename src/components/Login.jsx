import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendOTPRequest, verifyOTPRequest } from "../api";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const nav = useNavigate();

  const handleSend = async () => {
    if (!phone) return alert("Enter phone number");
    setLoading(true);
    await sendOTPRequest(phone);
    setLoading(false);
    setSent(true);
    alert("OTP sending simulated. Use 1234 to bypass in dev.");
  };

  const handleVerify = async () => {
    if (!otp) return alert("Enter OTP");
    setLoading(true);
    const res = await verifyOTPRequest(phone, otp);
    setLoading(false);
    if (res.ok && res.user) {
      login(res.user);
      nav("/home", { replace: true });
    } else {
      alert(res.message || "Invalid OTP");
    }
  };

  return (
    <div className="screen-center">
      <div className="card-auth">
        <h2>Login</h2>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="input" />
        {!sent && <button className="btn" onClick={handleSend} disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>}

        {sent && (
          <>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP (1234 dev)" className="input" />
            <button className="btn" onClick={handleVerify} disabled={loading}>{loading ? "Verifying..." : "Verify & Login"}</button>
          </>
        )}

        <div style={{ marginTop: 8 }}>
          <Link to="/register">New here? Register</Link>
        </div>
      </div>
    </div>
  );
}
