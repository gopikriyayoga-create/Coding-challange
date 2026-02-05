document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Event listener for the Add button
    addButton.addEventListener('click', addTask);
    
    // Event listener for pressing 'Enter' in the input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event delegation for marking complete and deleting tasks
    taskList.addEventListener('click', (e) => {
        // Check if the clicked element is the text (for completion)
        if (e.target.classList.contains('task-text')) {
            toggleComplete(e.target.closest('li'));
        }
        // Check if the clicked element is the delete button
        if (e.target.classList.contains('delete-button')) {
            deleteTask(e.target.closest('li'));
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            createTaskElement(taskText, false);
            saveTasks();
            taskInput.value = ""; // Clear the input field
        } else {
            alert("Please enter a task!");
        }
    }

    function createTaskElement(text, isCompleted) {
        const listItem = document.createElement('li');
        
        // Add completion class if needed
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    function toggleComplete(listItem) {
        listItem.classList.toggle('completed');
        saveTasks();
    }

    function deleteTask(listItem) {
        taskList.removeChild(listItem);
        saveTasks();
    }

    // --- Local Storage Functions (for persistence) ---

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