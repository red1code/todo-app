import todoService from "./todo.service";
import projectService from "./project.service";
import { format, formatDistance } from 'date-fns'



const deleteAllTasksBtn = getElement('dlt-all-tasks');
const projectsContainer = getElement('projectsContainer');
const ENUMS = {
  TODO_LIST: 'todoList',
  PROJECT_LIST: 'projectList'
}


export {
  ENUMS,
  projectsContainer,
  saveToLocalStorage,
  getFromLocalStorage,
  getFooterYear,
  renderUI,
  generateID,
  getElement,
  getTomorrowDate
}


function renderUI() {
  renderSidebarLinks();
  deleteAllTasksBtn.onclick = todoService().deleteAllTodos;
}

function openTodoDetails(todo) {
  getElement('todoDescription').textContent = todo.description;
  getElement('todoDueDate').textContent = 'For: ' + format(new Date(todo.dueDate), 'MMMM dd, yyyy')
  getElement('createdAt').textContent = 'Created ' + formatDistance(
    new Date(todo.createdAt),
    new Date(),
    { addtrSuffix: true }
  ) + ' ago';
  const deleteTodo = () => {
    todoService().deleteTodo(todo)
  }
  getElement('deleteTodo').onclick = deleteTodo;
}

function renderSidebarLinks() {
  projectService().getProjectList().map(projectItem => {
    const link = document.createElement('button');
    link.textContent = projectItem.title;
    const rederTodos = () => {
      renderTodoList(projectItem, todoService().getTodosByProject(projectItem));
    }
    link.onclick = rederTodos;
    projectsContainer.appendChild(link);
  });
}

function renderTodoList(project, todoList) {
  const todoListContainer = getElement('todoListContainer');
  todoListContainer.innerHTML = '';
  const todoListTitle = document.createElement('h3');
  todoListTitle.classList.add('project-title')
  todoListTitle.textContent = project.title;
  todoListContainer.appendChild(todoListTitle);
  todoList.map(todoItem => {
    const todoBtn = document.createElement('button');
    todoBtn.textContent = todoItem.title;
    const openTodo = () => {
      openTodoDetails(todoItem)
    }
    todoBtn.onclick = openTodo;
    todoListContainer.appendChild(todoBtn);
  })
}


function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (error) {
    console.error(error);
  }
}


function getFromLocalStorage(key) {
  let data;
  try {
    data = localStorage.getItem(key);
  }
  catch (error) {
    console.error(error)
  }
  return JSON.parse(data)
}


function getFooterYear() {
  getElement('currentYear').textContent = new Date().getFullYear();
}


function generateID(length = 7) {
  return Math.random().toString(36).substring(2, length + 2);
}

function getElement(elID) {
  return document.getElementById(elID)
}

function getTomorrowDate() {
  return new Date(new Date().setDate(new Date().getDate() + 1))
}
