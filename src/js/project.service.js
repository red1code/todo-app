import UI from "./ui";
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
    UI().render()
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
    UI().render()
  }

  const deleteProject = (projectID) => {
    _projectList = _projectList.filter(item => item.id !== projectID);
    saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
  }

  return {
    getProjectList,
    getProject,
    addNewProject,
    updateProject,
    deleteProject,
  }
}
