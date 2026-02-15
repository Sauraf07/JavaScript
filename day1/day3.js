// Background
document.body.className = "bg-light";

// Helper Function
function createElement(tag, className, text) {
  let el = document.createElement(tag);

  if (className) el.className = className;
  if (text) el.innerText = text;

  return el;
}

// ===================== NAVBAR =====================
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

  // About Click Alert
  about.onclick = function () {
    alert("This website is made using JavaScript DOM only.");
  };

  // Scroll to Projects Section
  projects.onclick = function () {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  };

  menu.appendChild(home);
  menu.appendChild(about);
  menu.appendChild(projects);
  menu.appendChild(contact);

  navbar.appendChild(brand);
  navbar.appendChild(menu);

  document.body.appendChild(navbar);
}

// ===================== HERO SECTION =====================
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
    "This full website is created using JavaScript DOM + Bootstrap."
  );

  let btn = createElement(
    "button",
    "btn btn-success btn-lg mt-4",
    "View Projects"
  );

  btn.onclick = function () {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  };

  hero.appendChild(title);
  hero.appendChild(subtitle);
  hero.appendChild(btn);

  document.body.appendChild(hero);
}

// ===================== SKILLS SECTION =====================
function createSkills() {
  let section = createElement("div", "container my-5");

  let heading = createElement(
    "h2",
    "text-center fw-bold mb-4",
    "My Skills"
  );

  let row = createElement("div", "row");

  let skills = [
    { name: "JavaScript", desc: "Building dynamic websites with logic" },
    { name: "DOM", desc: "Creating full UI using JavaScript only" },
    { name: "Bootstrap", desc: "Making websites modern and responsive" },
    { name: "React", desc: "Building advanced user interfaces" },
    { name: "Node.js", desc: "Backend development using JavaScript" },
    { name: "Python", desc: "General-purpose programming language" }
  ];

  skills.forEach(function (skill) {
    let col = createElement("div", "col-md-4 mb-4");

    let card = createElement("div", "card h-100 shadow");

    let cardBody = createElement("div", "card-body text-center");

    let skillName = createElement(
      "h5",
      "card-title fw-bold",
      skill.name
    );

    let skillDesc = createElement(
      "p",
      "card-text text-muted",
      skill.desc
    );

    cardBody.appendChild(skillName);
    cardBody.appendChild(skillDesc);

    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });

  section.appendChild(heading);
  section.appendChild(row);

  document.body.appendChild(section);
}

// ===================== PROJECTS SECTION =====================
function createProjects() {
  let section = createElement("div", "container my-5");

  // ID for scrolling
  section.id = "projects";

  let heading = createElement(
    "h2",
    "text-center fw-bold mb-4",
    "My Projects"
  );

  let row = createElement("div", "row");

  let projects = [
    {
      title: "To-Do App",
      desc: "A task manager built using DOM and JS"
    },
    {
      title: "Calculator",
      desc: "A working calculator with button events"
    },
    {
      title: "Portfolio Website",
      desc: "This website built fully using JavaScript DOM"
    },
    {
      title: "Weather App",
      desc: "Shows live weather using API (coming soon)"
    }
  ];

  projects.forEach(function (project) {
    let col = createElement("div", "col-md-4 mb-4");

    let card = createElement("div", "card shadow p-4 h-100");

    let title = createElement("h4", "fw-bold", project.title);

    let para = createElement("p", "text-muted mt-2", project.desc);

    let btn = createElement(
      "button",
      "btn btn-outline-primary mt-3",
      "View Project"
    );

    btn.onclick = function () {
      alert("Project Selected: " + project.title);
    };

    card.appendChild(title);
    card.appendChild(para);
    card.appendChild(btn);

    col.appendChild(card);
    row.appendChild(col);
  });

  section.appendChild(heading);
  section.appendChild(row);

  document.body.appendChild(section);
}

// ===================== FOOTER =====================
function createFooter() {
  let footer = createElement(
    "div",
    "text-center p-4 bg-dark text-white mt-5",
    "Made with JavaScript DOM Only 🚀"
  );

  document.body.appendChild(footer);
}



function createTodoApp() {
  let section = createElement("div", "container my-5");

  let heading = createElement(
    "h2",
    "text-center fw-bold mb-4",
    "My To-Do App (Saved Tasks)"
  );

  // Input + Button Row
  let inputGroup = createElement(
    "div",
    "d-flex gap-2 justify-content-center mb-3"
  );

  let input = createElement("input", "form-control w-50");
  input.placeholder = "Enter a new task...";

  let addBtn = createElement("button", "btn btn-success", "Add Task");

  inputGroup.appendChild(input);
  inputGroup.appendChild(addBtn);

  // Clear All Button
  let clearBtn = createElement(
    "button",
    "btn btn-danger d-block mx-auto mb-4",
    "Clear All Tasks"
  );

  // Task List
  let taskList = createElement("ul", "list-group");

  // ================= STORAGE FUNCTIONS =================

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // ================= RENDER TASKS =================

  function renderTasks() {
    taskList.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach(function (task, index) {
      let taskItem = createElement(
        "li",
        "list-group-item d-flex justify-content-between align-items-center"
      );

      let taskName = createElement("span", "", task);

      // Mark Completed
      taskName.onclick = function () {
        taskName.style.textDecoration = "line-through";
      };

      // Delete Button
      let deleteBtn = createElement(
        "button",
        "btn btn-sm btn-danger",
        "Delete"
      );

      deleteBtn.onclick = function () {
        tasks.splice(index, 1); // remove from array
        saveTasks(tasks);       // update storage
        renderTasks();          // update UI
      };

      taskItem.appendChild(taskName);
      taskItem.appendChild(deleteBtn);

      taskList.appendChild(taskItem);
    });
  }

  // ================= ADD TASK =================

  function addTask() {
    let taskText = input.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    let tasks = getTasks();
    tasks.push(taskText);

    saveTasks(tasks);

    input.value = "";
    renderTasks();
  }

  addBtn.onclick = addTask;

  // Enter Key Support
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Clear All Tasks
  clearBtn.onclick = function () {
    localStorage.removeItem("tasks");
    renderTasks();
  };

  // Load Saved Tasks on Start
  renderTasks();

  // Append Everything
  section.appendChild(heading);
  section.appendChild(inputGroup);
  section.appendChild(clearBtn);
  section.appendChild(taskList);

  document.body.appendChild(section);
}


// ===================== RUN WEBSITE =====================
createNavbar();
createHero();
createSkills();
createProjects();
createTodoApp();
createFooter();
