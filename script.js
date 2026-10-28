const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
 
displayTasks();
 
addBtn.addEventListener("click", addTask);
 
function addTask() {
 
const taskText = taskInput.value.trim();
 
if(taskText === "") return;
 
const task = {
id: Date.now(),
text: taskText,
completed: false
};
 
tasks.push(task);
 
saveTasks();
 
taskInput.value = "";
 
displayTasks();
}
 
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}
 
function displayTasks() {
 
taskList.innerHTML = "";
 
let filteredTasks = tasks;
 
if(currentFilter === "active"){
 
filteredTasks = tasks.filter(task => !task.completed);
 
}else if(currentFilter === "completed"){
 
filteredTasks = tasks.filter(task => task.completed);
}
 
filteredTasks.forEach(task => {
 
const li = document.createElement("li");
 
li.innerHTML = `
<span class="${task.completed ? 'completed' : ''}">
${task.text}
</span>
 
<div class="actions">
 
<button class="complete-btn"
data-id="${task.id}">
✓
</button>
 
<button class="edit-btn"
data-id="${task.id}">
Edit
</button>
 
<button class="delete-btn"
data-id="${task.id}">
Delete
</button>
 
</div>
`;
 
taskList.appendChild(li);
});
}
 
taskList.addEventListener("click", function(e){
 
const id = Number(e.target.dataset.id);
 
if(e.target.classList.contains("delete-btn")){
 
deleteTask(id);
}
 
if(e.target.classList.contains("complete-btn")){
 
toggleTask(id);
}
 
if(e.target.classList.contains("edit-btn")){
 
editTask(id);
}
});
 
function deleteTask(id){
 
tasks = tasks.filter(task => task.id !== id);
 
saveTasks();
 
displayTasks();
}
 
function toggleTask(id){
 
const task = tasks.find(task => task.id === id);
 
if(task){
 
task.completed = !task.completed;
 
saveTasks();
 
displayTasks();
}
}
 
function editTask(id){
 
const task = tasks.find(task => task.id === id);
 
if(!task) return;
 
const updatedText = prompt(
"Edit Task:",
task.text
);
 
if(updatedText !== null &&
updatedText.trim() !== ""){
 
task.text = updatedText.trim();
 
saveTasks();
 
displayTasks();
}
}
 
filterBtns.forEach(btn => {
 
btn.addEventListener("click", () => {
 
filterBtns.forEach(button =>
button.classList.remove("active")
);
 
btn.classList.add("active");
 
currentFilter = btn.dataset.filter;
 
displayTasks();
});
 
});