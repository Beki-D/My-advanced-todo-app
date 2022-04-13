//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getFromLocal);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteNCheck);
filterOption.addEventListener("click", filterTodo);

/*
 * Functions
 */

function addTodo(e) {
  //Prevent natural browser behaviour of reloading when pressing button(since form automatically submits)
  e.preventDefault();

  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  
  //Add to local storage
  saveToLocal(todoInput.value);

  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="btn btn-check">
  <svg height="20" width="20">
    <polyline points="5,9 8,13 15,6" style="fill:none;stroke:lime;stroke-width:2" />
  </svg>
  </i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Create Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="btn btn-trash">
  <svg 
  height="20" width="20">
    <line x1="5" y1="5" x2="15" y2="15" style="stroke:rgb(255, 230, 230);stroke-width:4" />
    <line x1="5" y1="15" x2="15" y2="5" style="stroke:rgb(255, 230, 230);stroke-width:4" />
  </svg>
  </i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  if(todoInput.value!=''){
    //Append to List
    todoList.appendChild(todoDiv);
  
    //Clear input field after it has been added to the list
    todoInput.value='';
  }else {
    todoInput.value='write something first...';
    setTimeout(() => {
      console.log("error! empty field");
      todoInput.value='';
    }, 1500);
  } 
}

function deleteNCheck(e){
  //console.log(e.target);//log which item is being clicked
  const item = e.target;
  //Delete one of the todo div
  if(item.classList[0]=='trash-btn'){
    const todo=item.parentElement;
    //Transition effect is set by the class 'fall' on the css 
    todo.classList.add('fall');
    
    //Remove the item from local storage as well
    removeFromLocal(todo);

    //Wait for transition effect to end to remove the item 
    todo.addEventListener('transitionend', remover);
  }
  //remover function to be called when 'transitionend' condition is met
  function remover(){
    this.remove();
  }
  
  //check mark
  if(item.classList[0]=='complete-btn'){
    const todo=item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todo = todoList.children;
  var i=0;
  for(i=0; i<todo.length; i++) {
    switch(e.target.value){
      case "all":
        todo[i].style.display = "flex";
        break;
      
      case "completed":
        if(!todo[i].classList.contains("completed")){
          todo[i].style.display = "none";
        }else 
          todo[i].style.display = "flex";
        break;

      case "uncompleted":
        if(todo[i].classList.contains("completed")){
          todo[i].style.display = "none";
        }else 
          todo[i].style.display = "flex";
        break;
    }
  }
}

function saveToLocal(todo) {
  let todos;

  //are there todo items already in local storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
    console.log("local storage empty!");
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log("This stuff is already on local storage:" + todos);
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFromLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    console.log("local storage empty!");
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log("This stuff is already on local storage:" + todos);
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="btn btn-check">
    <svg height="20" width="20">
      <polyline points="5,9 8,13 15,6" style="fill:none;stroke:lime;stroke-width:2" />
    </svg>
    </i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="btn btn-trash">
    <svg 
    height="20" width="20">
      <line x1="5" y1="5" x2="15" y2="15" style="stroke:rgb(255, 230, 230);stroke-width:4" />
      <line x1="5" y1="15" x2="15" y2="5" style="stroke:rgb(255, 230, 230);stroke-width:4" />
    </svg>
    </i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //FINALLY APPEND! 
    todoList.appendChild(todoDiv);
  });
}

function removeFromLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoItemKey = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoItemKey), 1);
  
  localStorage.setItem("todos", JSON.stringify(todos));  
}

/*
functions I would like to add to this:
  1, make another list on local storage so that the check marked status is saved and automatically added on reload
  2, more animations! glow effects, expand input and filter options on hover, 
*/