import '../css/styles.css';
import projectService from "./project.service"
import todoService from "./todo.service"
import { format, formatDistance } from 'date-fns'
import { projectsContainer, getElement, generateID } from "./utilities";
import deleteIcon from '../assets/trash-can.svg';
import { List, Todo } from './models';

export default function UI() {
  const _path = window.location.hash;

  const render = () => {
    if (!_path) {
      location.href = '#default_tasks';
    }
    _renderSidebarLinks();
    const currentList = projectService().getList(_path.slice(1));
    _renderTodoList(currentList)
    getElement('todoForm').onsubmit = evt => {
      evt.preventDefault();
      const newTodo = Todo(
        generateID(),
        evt.target.elements['todoTitle'].value,
        evt.target.elements['todoDescription'].value,
        evt.target.elements['todoDueDate'].value,
        new Date(),
        false,
        _path.slice(1)
      );
      todoService().addNewTodo(newTodo);
      getElement('todoForm').reset();
    }
  }

  const showTodoDetailsSidebar = () => {
    getElement('rightSidebar').classList.add('show-todo-details')
  }

  const hideTodoDetailsSidebar = () => {
    getElement('rightSidebar').classList.remove('show-todo-details')
  }

  const _renderSidebarLinks = () => {
    projectsContainer.innerHTML = '';
    projectService().getProjectList().map(projectItem => {
      const link = document.createElement('button');
      link.textContent = projectItem.title;
      const renderTodos = () => {
        _renderTodoList(projectItem);
      }
      link.onclick = renderTodos;
      projectsContainer.appendChild(link);
    });
  }

  const _renderTodoList = (project) => {
    const todoList = todoService().getTodosByProject(project)
    const todoListContainer = getElement('todoListContainer');
    todoListContainer.innerHTML = '';
    getElement('todoListTitle').textContent = project.title;
    todoList.map(todoItem => {
      const todoBtn = document.createElement('button');
      todoBtn.textContent = todoItem.title;
      const openTodo = () => {
        _openTodoDetails(todoItem)
      }
      todoBtn.onclick = openTodo;
      todoListContainer.appendChild(todoBtn);
    });
    location.href = '#' + project.id
  }

  const _openTodoDetails = (todo) => {
    getElement('todoDescription').textContent = todo.description;
    getElement('todoDueDate').textContent = todo.dueDate ?
      'For: ' + format(new Date(todo.dueDate), 'MMMM dd, yyyy') : 'For: ';
    getElement('createdAt').title = 'Created at ' + format(new Date(todo.createdAt), 'MMMM dd, yyyy, p');
    getElement('createdAt').textContent = 'Created ' + formatDistance(
      new Date(todo.createdAt),
      new Date(),
      { addtrSuffix: true }
    ) + ' ago';
    const deleteTodo = () => {
      todoService().deleteTodo(todo);
    }
    getElement('deleteTodo').onclick = deleteTodo;//
    getElement('deleteTodo').innerHTML = `<img src="${deleteIcon}">`
    showTodoDetailsSidebar();
    getElement('closeSideBar').onclick = hideTodoDetailsSidebar
  }

  return {
    render,
    hideTodoDetailsSidebar
  }
}
