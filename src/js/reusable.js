import todoService from "./todo.service";


const deleteAllTasksBtn = document.getElementById('dlt-all-tasks');
const projectsContainer = document.getElementById('projectsContainer');
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
  displayUI,
  generateID,
  setupHomeLink
}


function displayUI(msg) {
  console.warn(msg);
  deleteAllTasksBtn.onclick = todoService().deleteAllTodos;
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
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}


function generateID(length = 7) {
  return Math.random().toString(36).substring(2, length + 2);
}


function setupHomeLink() {
  const homeLink = document.createElement('button');
  homeLink.textContent = 'Home';
  projectsContainer.appendChild(homeLink);
}
