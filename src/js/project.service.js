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
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete project "${project.title}"?`)) {
      _projectList = _projectList.filter(item => item.id !== deleteID);
      saveToLocalStorage(STORAGE_KEYS.PROJECT_LIST, _projectList);
      UI().render()
    }
  }

  const getProject = (listID) => {
    let list;
    _projectList.map(listItem => {
      if (listItem.id === listID) list = listItem
    })
    return list
  }

  return {
    getProjectList,
    addNewProject,
    deleteProject,
    getProject
  }
}
