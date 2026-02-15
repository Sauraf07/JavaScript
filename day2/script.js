let card = document.createElement("div");
card.className = "card p-3 shadow";

let title = document.createElement("h3");
title.innerText = "Dragon Boss Website";

let btn = document.createElement("button");
btn.className = "btn btn-primary ";
btn.innerText = "Click Me";

btn.onclick = () => alert("DOM Master!");

card.appendChild(title);
card.appendChild(btn);

document.body.appendChild(card);