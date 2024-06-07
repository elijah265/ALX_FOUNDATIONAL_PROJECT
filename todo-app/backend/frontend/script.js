const apiUrl =const apiUrl = '/api/todos';


document.addEventListener('DOMContentLoaded', loadTodos);

async function loadTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => toggleComplete(todo.id, !todo.completed));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const newTodoInput = document.getElementById('new-todo');
    const newTodoText = newTodoInput.value;
    if (!newTodoText) return;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newTodoText })
    });
    const newTodo = await response.json();
    newTodoInput.value = '';
    loadTodos();
}

async function toggleComplete(id, completed) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    });
    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    loadTodos();
}

