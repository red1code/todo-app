import {
  saveToLocalStorage, getFromLocalStorage, ENUMS, renderUI
} from "./reusable";


export default function todoService() {
  let _todosList = getFromLocalStorage(ENUMS.TODO_LIST) || [];
  const getAllTodos = () => _todosList;

  const getTodosByProject = (project) => {
    return _todosList.filter(item => item.parentProject === project.id)
  }

  const addNewTodo = (todo) => {
    _todosList.push(todo);
    saveToLocalStorage(ENUMS.TODO_LIST, _todosList);
  }

  const deleteTodo = (todo) => {
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete task "${todo.title}"?`)) {
      _todosList = _todosList.filter(item => item.id !== deleteID);
      saveToLocalStorage(ENUMS.TODO_LIST, _todosList);
      window.location.reload();
    }
  }

  const deleteAllTodos = () => {
    if (confirm(`Are you sure you want to delete all tasks?`)) {
      _todosList = [];
      saveToLocalStorage(ENUMS.TODO_LIST, _todosList);
    }
  }

  return {
    getAllTodos,
    getTodosByProject,
    addNewTodo,
    deleteTodo,
    deleteAllTodos
  }
}
