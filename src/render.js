import { state, getSortedRequests, getErrorDisplay } from "./state.js";
import { dom } from "./dom.js";
import { RequestCard } from "./components/RequestCard.js";
import { retry } from "./main.js";

export function render() {
    dom.grid.replaceChildren();

    if (state.isLoading) {
        dom.grid.textContent = "Loading...";
        return;
    }

    if (state.error) {
        const div = document.createElement("div");
        const { message } = getErrorDisplay(state.error);
        div.textContent = message;

        const btn = document.createElement("button");
        btn.textContent = "Retry";
        btn.onclick = () => retry();

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