import {
  ENUMS, getFromLocalStorage, saveToLocalStorage, projectsContainer, displayUI, setupHomeLink
} from "./reusable";


export default function projectService() {
  let _projectList = getFromLocalStorage(ENUMS.PROJECT_LIST) || [];
  const getProjectList = () => _projectList;

  const addNewProject = (project) => {
    _projectList.push(project);
    saveToLocalStorage(ENUMS.PROJECT_LIST, _projectList);
    displayUI(`${ENUMS.PROJECT_LIST} : \n' ${_projectList}`);
  }

  const deleteProject = (project) => {
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete project "${project.title}"?`)) {
      _projectList = _projectList.filter(item => item.id !== deleteID);
      saveToLocalStorage(ENUMS.PROJECT_LIST, _projectList);
      displayUI(`${ENUMS.PROJECT_LIST} : \n' ${_projectList}`);
    }
  }

  const renderProjectsUI = () => {
    setupHomeLink();
    _projectList.map(item => {
      const divProject = document.createElement('button');
      divProject.textContent = item.title;
      projectsContainer.appendChild(divProject);
    })
  }

  return {
    getProjectList,
    addNewProject,
    deleteProject,
    renderProjectsUI
  }
}
