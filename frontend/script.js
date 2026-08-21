const STORAGE_KEY = 'todo-app-items';
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

function getTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();

  if (!todos.length) {
    todoList.innerHTML = '<li class="empty-state">No hay tareas aún.</li>';
    return;
  }

  todoList.innerHTML = todos
    .map(
      (todo) => `
        <li class="todo-item">
          <div class="todo-main">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-action="toggle" data-id="${todo.id}" />
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.title}</span>
          </div>
          <div class="todo-actions">
            <button class="btn btn-delete" data-action="delete" data-id="${todo.id}">Eliminar</button>
          </div>
        </li>
      `
    )
    .join('');
}

function addTodo(title) {
  const todos = getTodos();
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
  };

  todos.unshift(newTodo);
  saveTodos(todos);
  todoInput.value = '';
  renderTodos();
}

function toggleTodo(id, completed) {
  const todos = getTodos().map((todo) =>
    Number(todo.id) === Number(id) ? { ...todo, completed } : todo
  );

  saveTodos(todos);
  renderTodos();
}

function deleteTodo(id) {
  const todos = getTodos().filter((todo) => Number(todo.id) !== Number(id));
  saveTodos(todos);
  renderTodos();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();

  if (!title) {
    todoInput.focus();
    return;
  }

  addTodo(title);
});

todoList.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const { action, id } = target.dataset;
  if (!action || !id) return;

  if (action === 'delete') {
    deleteTodo(id);
  }
});

todoList.addEventListener('change', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;

  const { action, id } = target.dataset;
  if (action === 'toggle') {
    toggleTodo(id, target.checked);
  }
});

renderTodos();
