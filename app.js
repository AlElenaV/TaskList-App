//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners(); //load all event listeners

//load all event listeners
 function loadEventListeners() {
   //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask); 
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks); 
  filter.addEventListener('keyup', filterTasks);
 }

 //Get tasks from local storage
 function getTasks() {
  let tasks;

  if(localStorage.getItem('tasks') === null){tasks = [];} 
  else {tasks = JSON.parse(localStorage.getItem('tasks'));}

  tasks.forEach(function(task){
  const li = document.createElement('li'); // create new li

  li.className = 'collection-item';        //create class
  li.appendChild(document.createTextNode(task)); //append textNode to li

  const link=document.createElement('a'); //create new link

  link.className = 'delete-item secondary-content'; //add class
  link.innerHTML = '<i class="fa fa-remove"></i>'; //create icon 
  li.appendChild(link); //append link to li
  taskList.appendChild(li); //append li to ul (var taskList)
  });
 }

// Add Task
function addTask(e) {
  if(taskInput.value === '') {alert('Add a task');}

  const li = document.createElement('li'); // create new li

  li.className = 'collection-item';        //create class
  li.appendChild(document.createTextNode(taskInput.value)); //append textNode to li

  const link=document.createElement('a'); //create new link

  link.className = 'delete-item secondary-content'; //add class
  link.innerHTML = '<i class="fa fa-remove"></i>'; //create icon 
  li.appendChild(link); //append link to li
  taskList.appendChild(li); //append li to ul (var taskList)

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value=''; //clear input

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null){tasks = [];} 
  else {tasks = JSON.parse(localStorage.getItem('tasks'));}

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


 function removeTask(e) {
   if(e.target.parentElement.classList.contains('delete-item')) {
     if(confirm('Are You Sure?')) {
       e.target.parentElement.parentElement.remove();

       // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

  // Remove from LS
  function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
  }
    

 function clearTasks(){
   //method 1: slower - taskList.innerHTML='';
   //method 2: faster
   while(taskList.firstChild)
   {taskList.removeChild(taskList.firstChild);}
   clearTasksFromLocalStorage();
 }

 function clearTasksFromLocalStorage() {
   localStorage.clear();
 }
 function filterTasks(e) {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach
   (function(task){
       const item = task.firstChild.textContent;

       if(item.toLowerCase().indexOf(text) != -1){task.style.display='block'; }
       else{task.style.display='none';}

        });}