import './css/styles.css';
import { getFooterYear, generateID, renderUI } from './js/reusable';
import { Project, Todo } from './js/models';
import projectService from './js/project.service';
import todoService from './js/todo.service';


getFooterYear();


renderUI();


const newProject = new Project(generateID(), 'LalaAchou', 2, new Date());
// projectService().addNewProject(newProject);


const newTask = new Todo(
  generateID(9),
  'Test Todo',
  'This todo belongs to Home!',
  new Date('07-23-2023'),
  1,
  new Date(),
  false,
  'default_tasks'
);
todoService().addNewTodo(newTask)
