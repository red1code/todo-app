import { getFooterYear, generateID } from './js/reusable';
import { Project, Todo } from './js/models';
import UI from './js/ui';
import todoService from './js/todo.service';

getFooterYear();


UI().render();


const newProject = new Project(generateID(), 'LalaAchou', 2, new Date());
// projectService().addNewProject(newProject);


const newTask = new Todo(
  generateID(9),
  'Test Todo 3',
  'description todo belongs to Home list!',
  new Date('07-25-2023'),
  1,
  new Date(),
  false,
  'default_tasks'
);
// todoService().addNewTodo(newTask)
