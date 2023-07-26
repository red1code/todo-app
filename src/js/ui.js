import '../css/styles.css';
import deleteIcon from '../assets/trash-can.svg';
import { Project, Todo } from './models';
import projectService from "./project.service";
import todoService from "./todo.service";
import { format, formatDistance } from 'date-fns';
import {
  getElement, generateID, STORAGE_KEYS, getFromLocalStorage, saveToLocalStorage
} from "./utilities";



export default function UI() {
  const render = () => {
    const currentProject = projectService().getProject(_currentProjectID());
    _renderSidebarLinks();
    _renderTodoList(currentProject);
    _handleProjectForm();
    _handleTodoForm()
  }

  const _currentProjectID = () => {
    const currentProjectID = getFromLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID)
    if (!currentProjectID) {
      saveToLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID, 'default_tasks');
    }
    return currentProjectID
  }

  const _renderSidebarLinks = () => {
    getElement('projectsContainer').innerHTML = '';
    _getProjectLinks().map(project => {
      const link = document.createElement('button');
      link.textContent = project.name;
      link.onclick = () => {
        _renderTodoList(project);
        saveToLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID, project.id)
      }
      getElement('projectsContainer').appendChild(link);
    });
  }

  const _renderTodoList = (project) => {
    const todoList = todoService().getTodosByProject(project);
    const todoListContainer = getElement('todoListContainer');
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

  const _renderTodoListTitle = (project) => {
    const todoListTitle = getElement('todoListTitle');
    todoListTitle.textContent = project.name;
    if (project.name !== 'Home') {
      todoListTitle.contentEditable = true;
      todoListTitle.onkeydown = evt => {
        if (evt.which === 13) {
          evt.preventDefault();
          projectService().updateProject(project.id, { name: evt.target.innerText });
          todoListTitle.blur()
        }
      }
    }
    if (project.name === 'Home') {
      todoListTitle.contentEditable = false
    }
  }

  const _getTodoCheckBox = (todo) => {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.title = 'Click to change completed status'
    checkBox.checked = todo.isCompleted;
    checkBox.addEventListener('click', evt => {
      todoService().updateTodo(todo.id, {
        isCompleted: !todo.isCompleted
      })
    });
    return checkBox
  }

  const _getTodoBtn = (todo) => {
    const todoBtn = document.createElement('button');
    todoBtn.classList.add('reset-btn', 'task-btn');
    todoBtn.appendChild(_getTodoCheckBox(todo));
    todoBtn.append(todo.title);
    todoBtn.onclick = () => { _openTodoDetails(todo) }
    if (todo.isCompleted === true) {
      todoBtn.style.textDecoration = 'line-through'
    }
    return todoBtn
  }

  const _getCompletedTitleBtn = (project, completedTodosLength) => {
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
        _renderTodoList(project);
        _isCompletedListRendered = false;
      }
    }
    return completedBtn
  }

  const _renderCompletedTasks = (project) => {
    const completedTodos = todoService().getCompletedTodos(project);
    completedTodos.map(todo => {
      todoListContainer.appendChild(_getTodoBtn(todo));
    });
  }

  const _handleProjectForm = () => {
    getElement('projectForm').onsubmit = evt => {
      evt.preventDefault();
      const newProject = Project(
        generateID(),
        evt.target.elements['projectName'].value,
        new Date(),
      );
      projectService().addNewProject(newProject);
      getElement('projectForm').reset();
    }
  }

  const _handleTodoForm = () => {
    getElement('todoForm').onsubmit = evt => {
      evt.preventDefault();
      const newTodo = Todo(
        generateID(),
        evt.target.elements['todoTitle'].value,
        evt.target.elements['todoDescription'].value,
        evt.target.elements['todoDueDate'].value,
        new Date(),
        false,
        _currentProjectID()
      );
      todoService().addNewTodo(newTodo);
      getElement('todoForm').reset();
    }
  }

  const _getProjectLinks = () => {
    if (projectService().getProjectList().length === 0) {
      projectService().addNewProject({
        id: 'default_tasks',
        name: 'Home',
        createdAt: new Date()
      });
    }
    return projectService().getProjectList()
  }

  const _openTodoDetails = (todo) => {
    const todoTitle = getElement('todoTitle');
    todoTitle.textContent = todo.title;
    todoTitle.contentEditable = true;
    todoTitle.onkeydown = evt => {
      if (evt.which === 13) {
        evt.preventDefault();
        todoService().updateTodo(todo.id, { title: evt.target.innerText });
        todoTitle.blur()
      }
    }
    const todoDescription = getElement('todoDescription')
    todoDescription.textContent = todo.description;
    todoDescription.contentEditable = true;
    todoDescription.onkeydown = evt => {
      if (evt.which === 13) {
        evt.preventDefault();
        todoService().updateTodo(todo.id, { description: evt.target.innerText });
        todoDescription.blur()
      }
    }
    const todoDueDate = getElement('todoDueDate');
    todoDueDate.textContent = todo.dueDate ?
      'For: ' + format(new Date(todo.dueDate), 'MMMM dd, yyyy') : 'For: ';
    todoDueDate.contentEditable = true;
    todoDueDate.onkeydown = evt => {
      if (evt.which === 13) {
        evt.preventDefault();
        todoService().updateTodo(todo.id, { dueDate: new Date(evt.target.innerText) });
        todoDueDate.blur()
      }
    }
    getElement('createdAt').title = 'Created at ' + format(new Date(todo.createdAt), 'MMMM dd, yyyy, p');
    getElement('createdAt').textContent = 'Created ' + formatDistance(
      new Date(todo.createdAt),
      new Date(),
      { addtrSuffix: true }
    ) + ' ago';
    getElement('deleteTodo').onclick = () => { todoService().deleteTodo(todo) };
    getElement('deleteTodo').innerHTML = `<img src="${deleteIcon}">`
    showTodoDetailsSidebar();
    getElement('closeSideBar').onclick = hideTodoDetailsSidebar
  }

  const showTodoDetailsSidebar = () => {
    getElement('rightSidebar').classList.add('show-todo-details')
  }

  const hideTodoDetailsSidebar = () => {
    getElement('rightSidebar').classList.remove('show-todo-details')
  }

  let _isCompletedListRendered = false;

  return {
    render,
    showTodoDetailsSidebar,
    hideTodoDetailsSidebar
  }
}
