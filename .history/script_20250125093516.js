document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a task
  function addTask() {
      const taskText = taskInput.value.trim(); // Get and trim the task input value
      
      if (taskText === "") { // If the input is empty, alert the user
          alert("Please enter a task.");
          return;
      }
      
      // Create a new li element for the task
      const taskItem = document.createElement('li');
      taskItem.textContent = taskText;

      // Create a button to remove the task
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";

      // Add the 'remove-btn' class using classList.add()
      removeButton.classList.add('remove-btn');

      // Attach the remove functionality to the button
      removeButton.onclick = function () {
          taskList.removeChild(taskItem); // Remove the task item from the list
      };

      // Append the remove button to the task item, and the task item to the list
      taskItem.appendChild(removeButton);
      taskList.appendChild(taskItem);

      // Clear the task input field after adding the task
      taskInput.value = "";
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener('click', addTask);

  // Event listener for pressing "Enter" to add the task
  taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
          addTask(); // Call addTask when "Enter" is pressed
      }
  });
});
