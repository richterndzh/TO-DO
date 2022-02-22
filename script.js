'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];


const render = function() {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  toDoData.forEach(function(item) {

    const li = document.createElement('li');

    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if(item.completed) {
      todoCompleted.append(li);
    } 
    else 
    {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function(){
      item.completed = !item.completed;
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });
    
    li.querySelector('.todo-remove').addEventListener('click', function(){
      let index = toDoData.indexOf(item);
      toDoData.splice(index, 1);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      render();
    });
  });
};

toDoData = JSON.parse(localStorage.getItem ("toDoData")) || toDoData;
render();

todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  if(headerInput.value !== '')
  {
    const newToDo = {
    text: headerInput.value,
    completed: false
    };

    toDoData.push(newToDo);
    headerInput.value = '';

    localStorage.setItem("toDoData", JSON.stringify(toDoData));
    render();
  }

});