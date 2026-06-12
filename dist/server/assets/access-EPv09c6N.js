const ACCESS_TOKEN_KEY = "21k-supabase-access-token";
function saveSupabaseHashSession() {
  if (typeof window === "undefined" || !window.location.hash) return null;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const token = params.get("access_token");
  if (!token) return null;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
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
  return response.json();
}
export {
  checkBuyerAccess as c,
  saveSupabaseHashSession as s
};
