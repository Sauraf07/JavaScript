function createTodoApp() {
  let section = createElement("div", "container my-5");

  let heading = createElement(
    "h2",
    "text-center fw-bold mb-4",
    "My To-Do App"
  );

  // Input + Button Row
  let inputGroup = createElement(
    "div",
    "d-flex gap-2 justify-content-center mb-4"
  );

  let input = createElement("input", "form-control w-50");
  input.placeholder = "Enter a new task...";

  let addBtn = createElement(
    "button",
    "btn btn-success",
    "Add Task"
  );

  inputGroup.appendChild(input);
  inputGroup.appendChild(addBtn);

  // Task List Container
  let taskList = createElement("ul", "list-group");

  // Button Click Logic
  addBtn.onclick = function () {
    let taskText = input.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create Task Item
    let taskItem = createElement(
      "li",
      "list-group-item d-flex justify-content-between align-items-center"
    );

    let taskName = createElement("span", "", taskText);

    // Delete Button
    let deleteBtn = createElement(
      "button",
      "btn btn-danger btn-sm",
      "Delete"
    );

    deleteBtn.onclick = function () {
      taskItem.remove();
    };

    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    // Clear input
    input.value = "";
  };

  section.appendChild(heading);
  section.appendChild(inputGroup);
  section.appendChild(taskList);

  document.body.appendChild(section);
}
