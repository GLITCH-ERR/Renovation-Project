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

    const imageDiv = document.createElement("div");
    imageDiv.className = "card-image";
    if (request.images && request.images.length > 0) 
        {
        imageDiv.style.position = "relative";
        const img = document.createElement("img");
        img.src = request.images[0];
        img.alt = request.title;
        img.style.cssText = "width: 100%; height: 100%; object-fit: cover; display: block;";
        imageDiv.appendChild(img);
        imageDiv.style.overflow = "hidden";
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = request.title;

    const desc = document.createElement("p");
    desc.className = "card-description";
    desc.textContent = request.description;

    const emailEl = document.createElement("p");
    emailEl.className = "card-email";
    emailEl.textContent = request.email;
    emailEl.style.display = "none";
    emailEl.style.marginTop = "6px";
    emailEl.style.fontSize = "0.75rem";
    emailEl.style.color = "#1a1a1a";
    emailEl.style.wordBreak = "break-all";

    const category = document.createElement("p");
    category.textContent = request.category;
    category.style.fontSize = "0.7rem";
    category.style.color = "#1a1a1a";

    const btn = document.createElement("button");
    btn.className = "btn-contact";
    btn.textContent = "Contact";
    btn.onclick = () => {
        const showing = emailEl.style.display !== "none";
        emailEl.style.display = showing ? "none" : "block";
        btn.textContent = showing ? "Contact" : "Hide Contact";
    };

    body.append(title, category, desc, btn, emailEl);
    card.append(imageDiv, body);

    return card;
}