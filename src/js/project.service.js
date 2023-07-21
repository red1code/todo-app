import {
  ENUMS, getFromLocalStorage, saveToLocalStorage
} from "./reusable";


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

  return {
    getProjectList,
    addNewProject,
    deleteProject
  }
}
