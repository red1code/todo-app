import '../css/styles.css';
import projectService from "./project.service"
import todoService from "./todo.service"
import { format, formatDistance } from 'date-fns'
import { projectsContainer, getElement } from "./reusable";
import deleteIcon from '../assets/trash-can.svg';


export default function UI() {
  const render = () => {
    _renderSidebarLinks();
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
        const todoList = todoService().getTodosByProject(projectItem)
        _renderTodoList(projectItem, todoList);
      }
      link.onclick = renderTodos;
      projectsContainer.appendChild(link);
    });
  }

  const _renderTodoList = (project, todoList) => {
    const todoListContainer = getElement('todoListContainer');
    todoListContainer.innerHTML = '';
    const todoListTitle = document.createElement('h3');
    todoListTitle.classList.add('project-title');
    todoListTitle.textContent = project.title;
    todoListContainer.appendChild(todoListTitle);
    todoList.map(todoItem => {
      const todoBtn = document.createElement('button');
      todoBtn.textContent = todoItem.title;
      const openTodo = () => {
        _openTodoDetails(todoItem)
      }
      todoBtn.onclick = openTodo;
      todoListContainer.appendChild(todoBtn);
    });
  }

  const _openTodoDetails = (todo) => {
    getElement('todoDescription').textContent = todo.description;
    getElement('todoDueDate').textContent = 'For: ' + format(new Date(todo.dueDate), 'MMMM dd, yyyy');
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
    render
  }
}
