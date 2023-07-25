import {
  saveToLocalStorage, getFromLocalStorage, STORAGE_KEYS
} from "./utilities";
import UI from "./ui";



export default function todoService() {
  let _todosList = getFromLocalStorage(STORAGE_KEYS.TODO_LIST) || [];

  const getAllTodos = () => _todosList;

  const getTodosByProject = (project) => {
    return _todosList.filter(item => item.parentProject === project.id && item.isCompleted === false)
  }

  const addNewTodo = (todo) => {
    _todosList.push(todo);
    saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
    UI().render()
  }

  const getCompletedTodos = (project) => {
    return _todosList.filter(item => item.parentProject === project.id && item.isCompleted === true)
  }

  const updateTodo = (todoID, todoUpdates) => {
    _todosList.map(todoItem => {
      if (todoItem.id === todoID) {
        Object.keys(todoUpdates).forEach(key => {
          todoItem[key] = todoUpdates[key]
        })
      }
    });
    saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
    UI().render()
  }

  const deleteTodo = (todo) => {
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete task "${todo.title}"?`)) {
      _todosList = _todosList.filter(item => item.id !== deleteID);
      saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
      UI().render();
      UI().hideTodoDetailsSidebar()
    }
  }

  const deleteAllTodos = () => {
    if (confirm(`Are you sure you want to delete all tasks?`)) {
      _todosList = [];
      saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
    }
  }

  return {
    getAllTodos,
    getTodosByProject,
    getCompletedTodos,
    addNewTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
  }
}
