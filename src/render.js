import { state, getSortedRequests } from "./state.js";
import { dom } from "./dom.js";
import { RequestCard } from "./components/RequestCard.js";

export function render() {
    dom.grid.replaceChildren();

    if (state.isLoading) {
        dom.grid.textContent = "Loading...";
        return;
    }

    if (state.error) {
        const div = document.createElement("div");
        div.textContent = state.error;

        const btn = document.createElement("button");
        btn.textContent = "Retry";
        btn.onclick = () => location.reload();

        dom.grid.append(div, btn);
        return;
    }

    const data = getSortedRequests();

    if (data.length === 0) {
        dom.grid.textContent = "No requests found.";
        return;
    }

    data.forEach(req => {
        const card = RequestCard({
            request: req,
            onContact: () => alert(req.email)
        });
        dom.grid.append(card);
    });
}