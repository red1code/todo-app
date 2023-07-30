import { format, formatDistance } from 'date-fns';
import todoService from "../todo.service";
import { getElement } from "../utilities";
import deleteIcon from '../../assets/trash-can.svg';




export default function todoDetails(todo) {
  // todo title
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
  // todo description
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
  // due date
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
  // created at
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

function showTodoDetailsSidebar() {
  getElement('rightSidebar').classList.add('show-todo-details');
}

export function hideTodoDetailsSidebar() {
  getElement('rightSidebar').classList.remove('show-todo-details');
}
