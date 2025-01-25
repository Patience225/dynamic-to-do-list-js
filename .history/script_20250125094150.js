document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving to localStorage
  }

  // Function to add a task
  function addTask(taskText, save = true) {
      if (taskText === "") return; // Don't add empty tasks
      
      // Create a new li element for the task
      const taskItem = document.createElement('li');
      taskItem.textContent = taskText;

      // Create a button to remove the task
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.classList.add('remove-btn');

      // Attach the remove functionality to the button
      removeButton.onclick = function () {
          taskList.removeChild(taskItem); // Remove the task item from the list
          updateLocalStorage(); // Update localStorage after removing the task
      };

      // Append the remove button to the task item, and the task item to the list
      taskItem.appendChild(removeButton);
      taskList.appendChild(taskItem);

      // Save the task to localStorage if required
      if (save) {
          const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          storedTasks.push(taskText);
          localStorage.setItem('tasks', JSON.stringify(storedTasks));
      }

      // Clear the task input field
      taskInput.value = "";
  }

  // Update localStorage with the current task list
  function updateLocalStorage() {
      const tasks = [];
      const taskItems = document.querySelectorAll('#task-list li');
      taskItems.forEach(taskItem => {
          tasks.push(taskItem.textContent.replace("Remove", "").trim());
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener('click', function () {
      const taskText = taskInput.value.trim();
      addTask(taskText);
  });

  // Event listener for pressing "Enter" to add the task
  taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
          const taskText = taskInput.value.trim();
          addTask(taskText);
      }
  });

  // Load the tasks when the page is loaded
  loadTasks();
});
