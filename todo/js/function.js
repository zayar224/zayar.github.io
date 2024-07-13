document.addEventListener('DOMContentLoaded', function() {

    // Task form submission handler
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get task details from form inputs
        const taskInput = document.getElementById('taskInput');
        const taskDueDate = document.getElementById('taskDueDate');
        const taskDueTime = document.getElementById('taskDueTime');

        const task = {
            name: taskInput.value.trim(),
            dueDate: taskDueDate.value,
            dueTime: taskDueTime.value,
            completed: false
        };

        // Clear input fields after adding task
        taskInput.value = '';
        taskDueDate.value = '';
        taskDueTime.value = '';

        // Add the task to local storage
        addTask(task);

        // Set alert for task due time
        setTaskAlert(task);

        // Refresh task lists
        refreshTaskLists();
    });

    // Function to add a task to local storage
    function addTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to retrieve tasks from local storage and refresh task lists
    function refreshTaskLists() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Clear existing task lists
        const activeTasksList = document.getElementById('activeTasksList');
        const completedTasksList = document.getElementById('completedTasksList');
        activeTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        // Populate task lists based on task status
        tasks.forEach(function(task, index) {
            const taskItem = document.createElement('li');
            taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            taskItem.textContent = task.name;

            // Add due date and time if available
            if (task.dueDate || task.dueTime) {
                const dueDetails = document.createElement('span');
                dueDetails.className = 'badge bg-secondary rounded-pill';

                if (task.dueDate) {
                    dueDetails.textContent = task.dueDate;
                }
                if (task.dueTime) {
                    if (task.dueDate) {
                        dueDetails.textContent += ' ';
                    }
                    dueDetails.textContent += task.dueTime;
                }

                taskItem.appendChild(dueDetails);
            }

            // Add a delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                tasks.splice(index, 1); // Remove task from array
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
                refreshTaskLists(); // Refresh task lists
            });

            taskItem.appendChild(deleteBtn);

            // Add radio button for completing task
            const completeRadio = document.createElement('input');
            completeRadio.type = 'radio';
            completeRadio.name = 'taskStatus';
            completeRadio.className = 'form-check-input ms-3';
            completeRadio.id = `completeTask-${index}`;
            completeRadio.addEventListener('change', function() {
                task.completed = true;
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
                refreshTaskLists(); // Refresh task lists
            });

            const completeLabel = document.createElement('label');
            completeLabel.className = 'form-check-label';
            completeLabel.setAttribute('for', `completeTask-${index}`);
            completeLabel.textContent = 'Complete';

            taskItem.appendChild(completeRadio);
            taskItem.appendChild(completeLabel);

            // Append task item to appropriate list based on completion status
            if (task.completed) {
                completedTasksList.appendChild(taskItem);
            } else {
                activeTasksList.appendChild(taskItem);
            }
        });
    }

    // Function to set alert for task due time
    function setTaskAlert(task) {
        if (!task.dueDate || !task.dueTime) return;

        var texts = JSON.parse(localStorage.getItem('texts')) || [];

        const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
        const now = new Date();

        // Calculate time difference in milliseconds
        const timeDiff = dueDateTime.getTime() - now.getTime();

        // If task is due within 2 minutes, set an alert for a random text
        if (timeDiff > 0 && timeDiff <= 120000 && texts.length > 0) { // 120000 milliseconds = 2 minutes
            // Select a random index
            const randomIndex = Math.floor(Math.random() * texts.length);
            const randomText = texts[randomIndex];

            // Alert the selected text
            setTimeout(function() {
                alert(randomText);

                // Remove alerted text from the array
                texts.splice(randomIndex, 1);
                localStorage.setItem('texts', JSON.stringify(texts)); // Update local storage
            }, timeDiff);
        }
    }

    // Initial load: retrieve tasks and refresh lists
    refreshTaskLists();

    // Switching tabs handler (using Bootstrap 5)
    const taskTabs = new bootstrap.Tab(document.getElementById('taskTabs'));
    taskTabs.show(document.querySelector('.nav-link.active'));

    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            taskTabs.show(tab);
        });
    });
});
