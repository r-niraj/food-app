const KEY_USER = "fa_user_v1";
const KEY_CART = "fa_cart_v1";
const KEY_LOCATION = "fa_loc_v1";

/* user */
export function saveUser(u) {
  try {
    localStorage.setItem(KEY_USER, JSON.stringify(u));
  } catch {}
}
export function loadUser() {
  try {
    const raw = localStorage.getItem(KEY_USER);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
export function clearUser() {
  try { localStorage.removeItem(KEY_USER); } catch {}
}

/* cart */
export function saveCart(c) {
  try { localStorage.setItem(KEY_CART, JSON.stringify(c || [])); } catch {}
}
export function loadCart() {
  try {
    const raw = localStorage.getItem(KEY_CART);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export function clearCart() {
  try { localStorage.removeItem(KEY_CART); } catch {}
}

/* location */
export function saveLocation(l) {
  try { localStorage.setItem(KEY_LOCATION, JSON.stringify(l || null)); } catch {}
}
export function loadLocation() {
  try {
    const raw = localStorage.getItem(KEY_LOCATION);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
export function clearLocation() {
  try { localStorage.removeItem(KEY_LOCATION); } catch {}
}
