import { DATA_URL, isValidRequest, state } from "./state.js";
 
const TIMEOUT_MS = 8000;
 
export async function loadRequests(render) {
  state.isLoading = true;
  state.error = null;
  render();
 
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
 
  try {
    const response = await fetch(DATA_URL, {
      cache: "no-store",
      signal: controller.signal,
    });
 
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
 
    const json = await response.json();
    const rawRequests = Array.isArray(json.requests) ? json.requests : [];
    const validRequests = rawRequests.filter(isValidRequest);
 
    state.requests = validRequests;
  } catch (err) {
    state.error = err;
  } finally {
    clearTimeout(timeoutId);
    state.isLoading = false;
    render();
  }
}