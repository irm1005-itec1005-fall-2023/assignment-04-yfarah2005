/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */
let todoItems = [];
let todoId = 0;

// Load todo items from local storage when the page loads
function loadTodoItems() {
  const storedItems = JSON.parse(localStorage.getItem("todoItems"));
  if (storedItems) {
    todoItems = storedItems;
    renderTodoList();
  }
}

// Save todo items to local storage
function saveTodoItems() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function addToDoItem(text) {
  if (typeof text !== "string") {
    console.log("Please enter a string value");
  } else {
    let todoItem = {
      id: todoId++,
      text: text,
      completed: false,
    };
    todoItems.push(todoItem);
    renderTodoList();
    saveTodoItems(); // Save to local storage after adding
  }
}

function removeToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
      renderTodoList();
      saveTodoItems(); // Save to local storage after removing
    }
  }
}

function markToDoItemAsCompleted(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems[i].completed = true;
      renderTodoList();
      saveTodoItems(); // Save to local storage after marking as completed
    }
  }
}

function deleteToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
      renderTodoList();
      saveTodoItems(); // Save to local storage after deleting
    }
  }
}

function clearCompletedTasks() {
  for (let i = todoItems.length - 1; i >= 0; i--) {
    if (todoItems[i].completed) {
      todoItems.splice(i, 1);
    }
  }
  renderTodoList();
  saveTodoItems(); // Save to local storage after clearing completed tasks
}

function renderTodoList() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  if (todoItems.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("empty-message");

    const emptyText1 = document.createElement("p");
    emptyText1.textContent = "No todos found.";
    emptyMessage.appendChild(emptyText1);

    const emptyText2 = document.createElement("p");
    emptyText2.textContent = "🙈";
    emptyMessage.appendChild(emptyText2);

    todoList.appendChild(emptyMessage);
  } else {
    for (const todo of todoItems) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <button class="mark-as-done" data-id="${todo.id}">Mark as Done</button>
        <button class="delete" data-id="${todo.id}">Delete</button>
      `;
      todoList.appendChild(listItem);
    }
  }
 
}

// Initial render when the page loads
loadTodoItems();

document.getElementById("todo-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const todoInput = document.getElementById("todo-input");
  addToDoItem(todoInput.value);
  todoInput.value = "";
});

document.getElementById("clear-todos").addEventListener("click", function () {
  clearCompletedTasks();
});

document.getElementById("todo-list").addEventListener("click", function (event) {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    const todoId = parseInt(target.dataset.id);
    if (target.classList.contains("mark-as-done")) {
      markToDoItemAsCompleted(todoId);
    } else if (target.classList.contains("delete")) {
      deleteToDoItem(todoId);
    }
  }
});
