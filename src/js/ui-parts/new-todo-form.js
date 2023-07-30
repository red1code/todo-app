import { Todo } from "../models";
import todoService from "../todo.service";
import { generateID, getElement, getCurrentProjectID } from "../utilities";


export default function newTodoForm() {
  getElement('todoForm').onsubmit = evt => {
    evt.preventDefault();
    const newTodo = Todo(
      generateID(),
      evt.target.elements['todoTitle'].value,
      evt.target.elements['todoDescription'].value,
      evt.target.elements['todoDueDate'].value,
      new Date(),
      false,
      getCurrentProjectID()
    );
    todoService().addNewTodo(newTodo);
    getElement('todoForm').reset();
  }
}
