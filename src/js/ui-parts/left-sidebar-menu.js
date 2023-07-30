import projectService from "../project.service";
import { STORAGE_KEYS, getElement, saveToLocalStorage } from "../utilities";
import todoListUI from "./todo-list-ui";


export default function leftSidebarMenu() {
  getElement('projectsContainer').innerHTML = '';
  projectService().getProjectList().map(project => {
    const link = document.createElement('button');
    link.textContent = project.name;
    link.onclick = () => {
      todoListUI(project);
      saveToLocalStorage(STORAGE_KEYS.CURRENT_PROJECT_ID, project.id);
    }
    getElement('projectsContainer').appendChild(link);
  });
}
