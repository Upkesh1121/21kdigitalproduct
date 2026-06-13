import { r as readApiJson } from "./api-CWR5F0Sv.js";
const ACCESS_TOKEN_KEY = "21k-supabase-access-token";
const REFRESH_TOKEN_KEY = "21k-supabase-refresh-token";
function saveSupabaseSession(accessToken, refreshToken) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}
function saveSupabaseHashSession() {
  if (typeof window === "undefined" || !window.location.hash) return null;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const token = params.get("access_token");
  if (!token) return null;
  saveSupabaseSession(token, params.get("refresh_token"));
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  return token;
}
function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}
async function checkBuyerAccess(token = getAccessToken()) {
  if (!token) return { has_access: false, email: null, role: null };
  const response = await fetch("/api/check-access", {
    headers: { authorization: `Bearer ${token}` }
  });
  if (!response.ok) return { has_access: false, email: null, role: null };
  return readApiJson(response, "/api/check-access");
}
export {
  saveSupabaseHashSession as a,
  checkBuyerAccess as c,
  getAccessToken as g,
  saveSupabaseSession as s
};
