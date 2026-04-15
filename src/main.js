import { loadRequests, clearRequests } from "./api.js";
import { render } from "./render.js";
import { state } from "./state.js";
import { dom } from "./dom.js";

export function retry() {
    loadRequests(render);
}

export async function init() {
    loadRequests(render);
}

if (dom.clearBtn) {
    dom.clearBtn.addEventListener("click", () => {
        clearRequests();

        // update UI immediately
        state.requests = [];
        render();
    });
}

dom.searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
});

dom.filterSelect.addEventListener("change", (e) => {
    state.activeFilter = e.target.value;
    render();
});

init();