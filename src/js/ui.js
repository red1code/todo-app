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
    getElement('todoListTitle').textContent = project.name;
    todoList.map(todo => {
      const todoBtn = document.createElement('button');
      todoBtn.textContent = todo.title;
      todoBtn.onclick = () => { _openTodoDetails(todo) }
      todoListContainer.appendChild(todoBtn);
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
    getElement('todoTitle').textContent = todo.title;
    getElement('todoDescription').textContent = todo.description;
    getElement('todoDueDate').textContent = todo.dueDate ?
      'For: ' + format(new Date(todo.dueDate), 'MMMM dd, yyyy') : 'For: ';
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

  return {
    render,
    showTodoDetailsSidebar,
    hideTodoDetailsSidebar
  }
}
