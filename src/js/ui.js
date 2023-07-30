import '../css/styles.css';
import deleteIcon from '../assets/trash-can.svg';
import { Project, Todo } from './models';
import projectService from "./project.service";
import todoService from "./todo.service";
import { format, formatDistance } from 'date-fns';
import {
  getElement, generateID, STORAGE_KEYS, getFromLocalStorage, saveToLocalStorage
} from "./utilities";
import headerToggleMenuIcon from './UI/header-ui';



export default function UI() {
  const _currentProjectID = () => getFromLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID) || 'default_tasks';

  const render = () => {
    projectService().setupHomeProject();
    headerToggleMenuIcon();
    const currentProject = projectService().getProject(_currentProjectID());
    _renderSidebarLinks();
    _renderTodoList(currentProject);
    _handleProjectForm();
    _handleTodoForm()
  }

  const _renderSidebarLinks = () => {
    getElement('projectsContainer').innerHTML = '';
    projectService().getProjectList().map(project => {
      const link = document.createElement('button');
      link.textContent = project.name;
      link.onclick = () => {
        _renderTodoList(project);
        saveToLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID, project.id);
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

  const _getDeleteListBtn = (project) => {
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
    todoBtn.onclick = (evt) => {
      if (evt.target !== evt.currentTarget) return;
      _openTodoDetails(todo)
    }
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

  const _openTodoDetails = (todo) => {
    const todoTitle = getElement('todoTitle');
    todoTitle.textContent = todo.title;
    todoTitle.contentEditable = true;
    todoTitle.onkeydown = evt => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        todoService().updateTodo(todo.id, { title: evt.target.innerText });
        todoTitle.blur();
      }
      if (evt.key === 'Escape') {
        todoTitle.blur();
        todoTitle.textContent = todo.title;
      }
    }
    const todoDescription = getElement('todoDescription')
    todoDescription.textContent = todo.description;
    todoDescription.contentEditable = true;
    todoDescription.onkeydown = evt => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        todoService().updateTodo(todo.id, { description: evt.target.innerText });
        todoDescription.blur();
      }
      if (evt.key === 'Escape') {
        todoDescription.blur();
        todoDescription.textContent = todo.description;
      }
    }
    const todoDueDate = getElement('todoDueDate');
    const getDueDate = todo.dueDate ? 'Due ' + format(new Date(todo.dueDate), 'MMMM dd, yyyy') : 'Due ';
    todoDueDate.textContent = getDueDate;
    todoDueDate.contentEditable = true;
    todoDueDate.onkeydown = evt => {
      const getDueUpdate = evt.target.innerText ? new Date(evt.target.innerText) : null;
      if (evt.key === 'Enter') {
        evt.preventDefault();
        todoService().updateTodo(todo.id, { dueDate: getDueUpdate });
        todoDueDate.blur();
      }
      if (evt.key === 'Escape') {
        todoDueDate.blur();
        todoDueDate.textContent = getDueDate;
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
    getElement('rightSidebar').classList.add('show-todo-details');
  }

  const hideTodoDetailsSidebar = () => {
    getElement('rightSidebar').classList.remove('show-todo-details');
  }

  let _isCompletedListRendered = false;

  return {
    render,
    showTodoDetailsSidebar,
    hideTodoDetailsSidebar
  }
}
