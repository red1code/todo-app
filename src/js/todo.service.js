import { saveToLocalStorage, getFromLocalStorage, STORAGE_KEYS } from "./utilities";
import { hideTodoDetailsSidebar } from "./ui-parts/todo-details";
import renderUI from "./ui";


export default function todoService() {
  let _todosList = getFromLocalStorage(STORAGE_KEYS.TODO_LIST) || [];

  const getAllTodos = () => _todosList;

  const getTodosByProject = (project) => {
    return _todosList.filter(item => item.parentProject === project.id && item.isCompleted === false)
  }

  const addNewTodo = (todo) => {
    _todosList.push(todo);
    saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
    renderUI()
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
    renderUI()
  }

  const deleteTodo = (todo) => {
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete task "${todo.title}"?`)) {
      _todosList = _todosList.filter(item => item.id !== deleteID);
      saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
      renderUI();
      hideTodoDetailsSidebar()
    }
  }

  const deleteProjectTasks = (projectID) => {
    _todosList = _todosList.filter(task => task.parentProject !== projectID);
    saveToLocalStorage(STORAGE_KEYS.TODO_LIST, _todosList);
  }

  return {
    getAllTodos,
    getTodosByProject,
    getCompletedTodos,
    addNewTodo,
    updateTodo,
    deleteTodo,
    deleteProjectTasks
  }
}
