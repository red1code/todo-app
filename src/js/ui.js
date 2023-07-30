import '../css/styles.css';
import projectService from "./project.service";
import { getCurrentProjectID } from "./utilities";
import headerToggleMenuIcon from './ui-parts/header-ui';
import newTodoForm from './ui-parts/new-todo-form';
import newProjectForm from './ui-parts/new-project-form';
import leftSidebarMenu from './ui-parts/left-sidebar-menu';
import todoListUI from './ui-parts/todo-list-ui';


export default function UI() {
  const render = () => {
    projectService().setupHomeProject();
    headerToggleMenuIcon();
    leftSidebarMenu();
    const currentProject = projectService().getProject(getCurrentProjectID());
    todoListUI(currentProject);
    newProjectForm();
    newTodoForm()
  }

  return {
    render
  }
}
