/*
// Component: RequestCard
// Input: { request, onContact }
// Output: DOM node
// Events: onContact()
// Dependencies: none
*/

export function RequestCard({ request, onContact }) {
    const card = document.createElement("article");
    card.className = "request-card";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = request.title;

    const desc = document.createElement("p");
    desc.className = "card-description";
    desc.textContent = request.description;

    const btn = document.createElement("button");
    btn.className = "btn-contact";
    btn.textContent = "Contact";
    btn.onclick = onContact;

    body.append(title, desc, btn);
    card.append(body);

    return card;
}