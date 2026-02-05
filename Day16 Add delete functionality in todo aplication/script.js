document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // Load saved tasks when the application starts
    loadTasks();

    // Event listener for the Add button
    addButton.addEventListener('click', addTask);
    
    // Allow adding a task by pressing the Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event Delegation: Handles both toggling completion and deletion
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const listItem = target.closest('li');

        if (!listItem) return; // Exit if click wasn't on a list item

        // 1. Delete Functionality
        if (target.classList.contains('delete-button')) {
            deleteTask(listItem);
        }
        
        // 2. Toggle Complete Functionality
        else if (target.classList.contains('task-text')) {
            toggleComplete(listItem);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            createTaskElement(taskText, false);
            saveTasks();
            taskInput.value = ""; // Clear input
            taskInput.focus(); // Keep focus on input
        }
    }

    function createTaskElement(text, isCompleted) {
        const listItem = document.createElement('li');
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete'; // The delete button text

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    function toggleComplete(listItem) {
        listItem.classList.toggle('completed');
        saveTasks();
    }

    /** * Core Delete Functionality: 
     * Removes the task item from the DOM and updates storage.
     */
    function deleteTask(listItem) {
        taskList.removeChild(listItem);
        saveTasks();
    }

    // --- Persistence (Local Storage) Functions ---

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                createTaskElement(task.text, task.completed);
            });
        }
    }
});