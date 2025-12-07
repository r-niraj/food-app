// simple placeholder API helpers
export async function sendOTPRequest(phone) {
  // production: call backend to send OTP
  // here we just simulate success
  return Promise.resolve({ ok: true, message: "OTP sent" });
}

export async function verifyOTPRequest(phone, otp) {
  // production: verify with backend
  // For dev, accept OTP '1234' as bypass
  if (otp === "1234") return Promise.resolve({ ok: true, user: { name: "Demo User", phone } });
  return Promise.resolve({ ok: false, message: "Invalid OTP" });
}

export async function placeOrder(orderData) {
  // Replace endpoint with your backend URL
  // For dev, return a success object
  console.log("Placing order (payload):", orderData);
  return Promise.resolve({ ok: true, orderId: "LOCAL-" + Date.now() });
}
