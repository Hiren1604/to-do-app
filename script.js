// Get references to the relevant DOM elements
let taskForm = document.getElementById("task-form"); // the form used to create the todo list
let taskInput = document.getElementById("task-input"); // input field where the task is entered
let addBtn = document.getElementById("add-task-btn"); // add task button used to add or edit the task
let taskList = document.getElementById("task-list"); // task list or the unordered list used to append tasks when the user hits add
let editingTaskItem = null; // a status variable to check if we are editing or adding a task

// Add an event listener to the form's submit event
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (!editingTaskItem) {
        addTask(); // Call addTask function if not editing a task
    } else {
        editTask(); // Call editTask function if editing a task
    }
});

// Function to add a new task
function addTask() {
    const task = taskInput.value.trim(); // Get and trim the input value
    if (!task) {
        alert("Please enter a task."); // Alert if the input is empty
        return;
    }
    const taskItem = document.createElement("li"); // Create a new list item
    taskItem.className = "task-item"; // Add a class to the list item

    const taskContent = document.createElement("span"); // Create a span for the task content
    taskContent.className = "task-content"; // Add a class to the span
    taskContent.textContent = task; // Set the span text to the task content

    const editBtn = document.createElement("button"); // Create an Edit button
    editBtn.id = "edit"; // Set the ID for the button
    editBtn.textContent = "Edit"; // Set the button text

    const delBtn = document.createElement("button"); // Create a Delete button
    delBtn.id = "delete"; // Set the ID for the button
    delBtn.textContent = "Delete"; // Set the button text

    // Append the task content and buttons to the list item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(delBtn);

    // Insert the new task at the beginning of the task list
    taskList.insertAdjacentElement("afterbegin", taskItem);

    taskInput.value = ""; // Clear the input field

    // Add an event listener to the Edit button
    editBtn.addEventListener("click", function () {
        taskInput.value = taskContent.textContent; // Set the input field to the task content
        addBtn.textContent = "Edit"; // Change the button text to "Edit"
        editingTaskItem = taskItem; // Set the editing task item to the current task
    });

    // Add an event listener to the Delete button
    delBtn.addEventListener("click", function () {
        taskList.removeChild(taskItem); // Remove the task from the list
        taskInput.value = ""; // Clear the input field
        editingTaskItem = null; // Reset the editing task item
        addBtn.textContent = "Add"; // Change the button text to "Add"
    });
}

// Function to edit an existing task
function editTask() {
    let editedTask = taskInput.value.trim(); // Get and trim the input value

    if (!editedTask) {
        alert("Please enter a task."); // Alert if the input is empty
        return;
    }

    // Update the content of the editing task
    const editedTaskContent = editingTaskItem.querySelector(".task-content");
    editedTaskContent.textContent = editedTask;

    addBtn.textContent = "Add"; // Change the button text to "Add"
    editingTaskItem = null; // Reset the editing task item
    taskInput.value = ""; // Clear the input field
}
