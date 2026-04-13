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

    const title = document.createElement("h2");
    title.textContent = request.title;

    const desc = document.createElement("p");
    desc.textContent = request.description;

    const btn = document.createElement("button");
    btn.textContent = "Contact";
    btn.onclick = onContact;

    card.append(title, desc, btn);

    return card;
}