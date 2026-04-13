import { loadRequests } from "./api.js";
import { render } from "./render.js";
import { state } from "./state.js";

export async function init() {
    state.isLoading = true;
    render();

    try {
        const data = await loadRequests();
        state.requests = data;
    } catch (err) {
        
    } finally {
        
    }
}

init();