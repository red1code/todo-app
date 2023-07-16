import {
  saveToLocalStorage, getFromLocalStorage, ENUMS, displayUI
} from "./reusable";


export default function todoService() {
  let _todosList = getFromLocalStorage(ENUMS.TODO_LIST) || [];
  const getTodosList = () => _todosList;

  const addNewTodo = (todo) => {
    _todosList.push(todo);
    saveToLocalStorage(ENUMS.TODO_LIST, _todosList);
    displayUI(`${ENUMS.TODO_LIST} : \n' ${_todosList}`);
  }

  const deleteTodo = (todo) => {
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete task "${todo.title}"?`)) {
      _todosList = _todosList.filter(item => item.id !== deleteID);
      saveToLocalStorage(ENUMS.TODO_LIST, _todosList);
      displayUI(`${ENUMS.TODO_LIST} : \n' ${_todosList}`);
    }    
  }

  const deleteAllTodos = () => {
    if (confirm(`Are you sure you want to delete all tasks?`)) {
      _todosList = [];
      saveToLocalStorage(ENUMS.TODO_LIST, _todosList);
      displayUI(`${ENUMS.TODO_LIST} : \n' ${_todosList}`);
    }    
  }

  return {
    getTodosList,
    addNewTodo,
    deleteTodo,
    deleteAllTodos
  }
}
