document.body.className = "bg-light";

// Helper Function
function createElement(tag, className, text) {
  let el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  return el;
}

// Navbar Function
function createNavbar() {
  let navbar = createElement(
    "nav",
    "navbar navbar-expand-lg navbar-dark bg-dark px-4"
  );

  let brand = createElement("a", "navbar-brand fw-bold", "My Portfolio");
  brand.href = "#";

  let menu = createElement("div", "navbar-nav ms-auto");

  let home = createElement("a", "nav-link active", "Home");
  let about = createElement("a", "nav-link", "About");
  let projects = createElement("a", "nav-link", "Projects");
  let contact = createElement("a", "nav-link", "Contact");

  home.href = "#";
  about.href = "#";
  projects.href = "#";
  contact.href = "#";

  // About click
  about.onclick = function () {
    alert("This website is made using JavaScript DOM.");
  };

  menu.appendChild(home);
  menu.appendChild(about);
  menu.appendChild(projects);
  menu.appendChild(contact);

  navbar.appendChild(brand);
  navbar.appendChild(menu);

  document.body.appendChild(navbar);
}

// Hero Function
function createHero() {
  let hero = createElement(
    "div",
    "container text-center my-5 bg-white p-5 rounded shadow"
  );

  let title = createElement(
    "h1",
    "display-4 fw-bold text-primary",
    "Welcome to My Portfolio"
  );

  let subtitle = createElement(
    "p",
    "lead mt-3",
    "Showcasing my projects and skills in web development."
  );

  let btn = createElement(
    "button",
    "btn btn-primary btn-lg mt-4",
    "View Projects"
  );
  let btn2 = createElement(
    "button",
    "btn btn-secondary btn-lg mt-4 ms-3",
    "Contact Me"
  )

  btn.onclick = function () {
    alert("Projects coming soon!");
  };

  btn2.onclick = function () {
    alert("Contact information: example@example.com");
  };

  hero.appendChild(title);
  hero.appendChild(subtitle);
  hero.appendChild(btn);
    hero.appendChild(btn2);

  document.body.appendChild(hero);
}

// Run Functions
createNavbar();
createHero();
