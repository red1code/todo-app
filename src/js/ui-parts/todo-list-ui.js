import todoService from "../todo.service";
import projectService from "../project.service";
import { STORAGE_KEYS, getElement, saveToLocalStorage } from "../utilities";
import deleteIcon from '../../assets/trash-can.svg';
import UI from "../ui";
import todoDetails from "./todo-details";


const todoListContainer = getElement('todoListContainer');
let _isCompletedListRendered = false;


export default function todoListUI(project) {
  const todoList = todoService().getTodosByProject(project);
  todoListContainer.innerHTML = '';
  _renderTodoListTitle(project);
  todoList.map(todo => {
    todoListContainer.appendChild(_getTodoBtn(todo));
  });
  const completedTodos = todoService().getCompletedTodos(project)
  if (completedTodos.length > 0) {
    todoListContainer.appendChild(_getCompletedTitleBtn(project, completedTodos.length));
  }
}


function _renderTodoListTitle(project) {
  const todoListTitle = getElement('todoListTitle');
  todoListTitle.innerHTML = `<span>${project.name}</span>`;
  if (project.name !== 'Home') {
    todoListTitle.append(_getDeleteListBtn(project));
    todoListTitle.firstChild.contentEditable = true;
    todoListTitle.firstChild.onkeydown = evt => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        projectService().updateProject(project.id, { name: evt.target.innerText });
        todoListTitle.blur()
      }
      if (evt.key === 'Escape') {
        todoListTitle.firstChild.blur();
        todoListTitle.firstChild.innerHTML = `<span>${project.name}</span>`;
      }
    }
  }
  if (project.name === 'Home') {
    todoListTitle.contentEditable = false
  }
}


function _getDeleteListBtn(project) {
  const deleteListBtn = document.createElement('button');
  deleteListBtn.innerHTML = `<img src="${deleteIcon}" width="16">Delete list`;
  deleteListBtn.classList.add('reset-btn', 'delete-list-btn');
  deleteListBtn.onclick = () => {
    if (confirm(`"${project.name}" list will be permanently deleted. \nDo you want to continue?`)) {
      saveToLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID, 'default_tasks');
      todoService().deleteProjectTasks(project.id);
      projectService().deleteProject(project.id);
      UI().render()
    }
  }
  return deleteListBtn
}


function _getTodoBtn(todo) {
  const todoBtn = document.createElement('button');
  todoBtn.classList.add('reset-btn', 'task-btn');
  todoBtn.appendChild(_getTodoCheckBox(todo));
  todoBtn.append(todo.title);
  todoBtn.onclick = (evt) => {
    if (evt.target !== evt.currentTarget) return;
    todoDetails(todo)
  }
  if (todo.isCompleted === true) {
    todoBtn.style.textDecoration = 'line-through'
  }
  return todoBtn
}


function _getTodoCheckBox(todo) {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.title = 'Click to change completed status'
  checkBox.checked = todo.isCompleted;
  checkBox.addEventListener('click', () => {
    todoService().updateTodo(todo.id, { isCompleted: !todo.isCompleted })
  });
  return checkBox
}


function _getCompletedTitleBtn(project, completedTodosLength) {
  const completedBtn = document.createElement('button');
  completedBtn.classList.add('reset-btn', 'completed-title-btn');
  completedBtn.innerHTML = `<span>+</span>
      <span><strong>Completed</strong></span>
      <span>${completedTodosLength}</span>`;
  completedBtn.onclick = () => {
    if (_isCompletedListRendered === false) {
      _renderCompletedTasks(project);
      completedBtn.innerHTML = `<span>-</span>
          <span><strong>Completed</strong></span>
          <span>${completedTodosLength}</span>`;
      _isCompletedListRendered = true;
    }
    else if (_isCompletedListRendered === true) {
      todoListUI(project);
      _isCompletedListRendered = false;
    }
  }
  return completedBtn
}


function _renderCompletedTasks(project) {
  const completedTodos = todoService().getCompletedTodos(project);
  completedTodos.map(todo => {
    todoListContainer.appendChild(_getTodoBtn(todo));
  });
}
