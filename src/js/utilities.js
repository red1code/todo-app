export {
  STORAGE_KEYS,
  getCurrentProjectID,
  saveToLocalStorage,
  getFromLocalStorage,
  getFooterYear,
  generateID,
  getElement
}



const STORAGE_KEYS = {
  TODO_LIST: 'todoList',
  PROJECT_LIST: 'projectList',
  CURRENT_PROJECT_ID: 'currentProjectID'
}

function getCurrentProjectID() {
  return getFromLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID) || 'default_tasks'
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
