const API_URL = 'http://localhost:3000/api/todos';
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderTodos(data);
  } catch (error) {
    todoList.innerHTML = '<li class="empty-state">No se pudo conectar con el backend.</li>';
    console.error(error);
  }
}

function renderTodos(todos) {
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

async function addTodo(title) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    todoInput.value = '';
    fetchTodos();
  } catch (error) {
    console.error(error);
  }
}

async function toggleTodo(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });

    fetchTodos();
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    fetchTodos();
  } catch (error) {
    console.error(error);
  }
}

todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();

  if (!title) {
    todoInput.focus();
    return;
  }

  await addTodo(title);
});

todoList.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const { action, id } = target.dataset;

  if (!action || !id) return;

  if (action === 'delete') {
    await deleteTodo(id);
  }
});

todoList.addEventListener('change', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;

  const { action, id } = target.dataset;
  if (action === 'toggle') {
    await toggleTodo(id, target.checked);
  }
});

fetchTodos();
