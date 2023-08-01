import renderUI from "./ui";
import {
  STORAGE_KEYS, getFromLocalStorage, saveToLocalStorage
} from "./utilities";



export default function projectService() {
  let _projectList = getFromLocalStorage(STORAGE_KEYS.PROJECT_LIST) || [];

  const getProjectList = () => _projectList;

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

  const addNewProject = (project) => {
    _projectList.push(project);
    saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
    renderUI()
  }

  const updateProject = (projectID, projectUpdates) => {
    _projectList.map(projectItem => {
      if (projectItem.id === projectID) {
        Object.keys(projectUpdates).forEach(key => {
          projectItem[key] = projectUpdates[key]
        })
      }
    });
    saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
    renderUI()
  }

  const deleteProject = (projectID) => {
    _projectList = _projectList.filter(item => item.id !== projectID);
    saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
  }

  const setupHomeProject = () => {
    if (_projectList.length > 0) {
      return
    }
    addNewProject({ id: 'default_tasks', name: 'Home', createdAt: new Date() });
  }

  return {
    setupHomeProject,
    getProjectList,
    getProject,
    addNewProject,
    updateProject,
    deleteProject
  }
}
