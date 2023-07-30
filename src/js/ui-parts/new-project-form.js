import { Project } from "../models";
import projectService from "../project.service";
import { generateID, getElement } from "../utilities";


export default function newProjectForm() {
  getElement('projectForm').onsubmit = evt => {
    evt.preventDefault();
    const newProject = Project(
      generateID(),
      evt.target.elements['projectName'].value,
      new Date(),
    );
    projectService().addNewProject(newProject);
    getElement('projectForm').reset();
  }
}
