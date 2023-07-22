
export {
  ENUMS,
  projectsContainer,
  saveToLocalStorage,
  getFromLocalStorage,
  getFooterYear,
  renderUI,
  generateID,
  getElement
}


const projectsContainer = getElement('projectsContainer');

const ENUMS = {
  TODO_LIST: 'todoList',
  PROJECT_LIST: 'projectList'
}

function renderUI() {
  renderSidebarLinks();
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
