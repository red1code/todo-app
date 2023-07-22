import {
  ENUMS, getFromLocalStorage, saveToLocalStorage
} from "./utilities";


export default function projectService() {
  let _projectList = getFromLocalStorage(ENUMS.PROJECT_LIST) || [];
  const getProjectList = () => _projectList;

  const addNewProject = (project) => {
    _projectList.push(project);
    saveToLocalStorage(ENUMS.PROJECT_LIST, _projectList);
  }

  const deleteProject = (project) => {
    const deleteID = todo.id;
    if (confirm(`Are you sure to delete project "${project.title}"?`)) {
      _projectList = _projectList.filter(item => item.id !== deleteID);
      saveToLocalStorage(ENUMS.PROJECT_LIST, _projectList);
    }
  }

  const getList = (listID) => {
    let list;
    _projectList.map(listItem => {
      if (listItem.id === listID) list= listItem
    })
    return list
  }

  return {
    getProjectList,
    addNewProject,
    deleteProject,
    getList
  }
}
