let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskContainer = document.getElementById('taskContainer');
const taskCounter = document.getElementById('taskCounter');

function renderTasks() {
    taskContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'task-card' + (task.completed ? ' completed' : '');

        const text = document.createElement('span');
        text.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(text);
        card.appendChild(actions);
        taskContainer.appendChild(card);
    });
    updateCounter();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    if (taskInput.value.trim() === '') return;
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = '';
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    if (confirm('¿Eliminar esta tarea?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

function updateCounter() {
    const pending = tasks.filter(t => !t.completed).length;
    taskCounter.textContent = `Tareas pendientes: ${pending}`;
}

addTaskBtn.addEventListener('click', addTask);
renderTasks();
