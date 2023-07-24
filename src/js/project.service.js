import UI from "./ui";
import {
  STORAGE_KEYS, getFromLocalStorage, saveToLocalStorage
} from "./utilities";



export default function projectService() {
  let _projectList = getFromLocalStorage(STORAGE_KEYS.PROJECT_LIST) || [];

  const getProjectList = () => _projectList;

  const addNewProject = (project) => {
    _projectList.push(project);
    saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
    UI().render()
  }

  const deleteProject = (project) => {
    if (confirm(`Are you sure to delete project "${project.title}"?`)) {
      _projectList = _projectList.filter(item => item.id !== project.id);
      saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
      UI().render()
    }
  }

  const getProject = (projectID) => {
    let project;
    _projectList.map(projectItem => {
      if (projectItem.id === projectID) {
        project = projectItem;
        return
      }
    })
    return project
  }

  return {
    getProjectList,
    addNewProject,
    deleteProject,
    getProject
  }
}
