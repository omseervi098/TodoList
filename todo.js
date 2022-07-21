var TodoApp = (() => {
  let tasks = [];
  const taskList = document.getElementById("list");
  const addtask = document.getElementById("add");
  const taskCounter = document.getElementById("tasks-counter");
  async function fetchTodos() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      tasks = data.slice(0, 12);
      renderList();
    } catch (err) {
      console.log(err);
    }
  }
  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="${task.id}" ${
      task.completed ? "checked" : ""
    } class="custom-checkbox"/>
      <label for="${task.id}">${task.title}</label>
      <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjYjM5ZGRiIiBkPSJNMzAuNiw0NEgxNy40Yy0yLDAtMy43LTEuNC00LTMuNEw5LDExaDMwbC00LjUsMjkuNkMzNC4yLDQyLjYsMzIuNSw0NCwzMC42LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM5NTc1Y2QiIGQ9Ik0yOCA2TDIwIDYgMTQgMTIgMzQgMTJ6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzdlNTdjMiIgZD0iTTEwLDhoMjhjMS4xLDAsMiwwLjksMiwydjJIOHYtMkM4LDguOSw4LjksOCwxMCw4eiI+PC9wYXRoPjwvc3ZnPg==" class="delete" data-id="${
        task.id
      }"/>`;
    taskList.append(li);
  }
  function renderList() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }
    taskCounter.innerHTML = tasks.length;
  }
  function checkTodo(taskId) {
    let item = tasks.filter((task) => {
      return task.id == taskId;
    });
    if (item.length > 0) {
      item[0].completed = !item[0].completed;
      renderList();
      showNotification("Task Toggled !!");
      return;
    }
    showNotification("Could not toggle task !!");
  }
  function deleteTask(taskId) {
    const newtask = tasks.filter((task) => {
      return task.id != taskId;
    });
    tasks = newtask;
    renderList();
  }
  function addTask(task) {
    if (task) {
      tasks.push(task);
      renderList();
      return;
    }
  }
  function showNotification(text) {
    alert(text);
  }
  function handleinputkeypress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;
      console.log("text", text);
      if (!text) {
        showNotification("Text cannot empty !! " + text);
        return;
      }
      const task = {
        title: text,
        id: Date.now().toString(),
        completed: false,
      };
      e.target.value = "";
      addTask(task);
    }
  }
  function handleclick(e) {
    const target = e.target;
    if (target.className === "delete") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
    } else if (target.className === "custom-checkbox") {
      const taskId = target.id;
      checkTodo(taskId);
    }
  }
  function initializeApp() {
    fetchTodos();
    addtask.addEventListener("keyup", handleinputkeypress);
    //event delegation
    document.addEventListener("click", handleclick);
  }
  initializeApp();
  return {
    initialize: initializeApp,
  };
})();
