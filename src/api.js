import { DATA_URL, isValidRequest, state } from "./state.js";
import { db } from "../app.js";

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
    const dbRequests = await getIndexedDBRequests();
 
    state.requests = [...validRequests, ...dbRequests];
  } catch (err) {
    state.error = err;
  } finally {
    clearTimeout(timeoutId);
    state.isLoading = false;
    render();
  }
}

function getIndexedDBRequests() {
  return new Promise((resolve) => {
    const tx = db.transaction("requests", "readonly");
    const store = tx.objectStore("requests");
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => resolve([]);
  });
}

// This function clears all requests from the "requests" object store in IndexedDB.
// Use clearRequests(); to clear all requests from the database.
export function clearRequests() {

    const tx = db.transaction("requests", "readwrite");
    const store = tx.objectStore("requests");

    store.clear();
    

}