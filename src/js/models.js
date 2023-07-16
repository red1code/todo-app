export {
  Todo,
  Project
}


class Todo {
  constructor(id, title, description, dueDate, priority, createdAt, isCompleted, parentProject) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.createdAt = createdAt;
    this.isCompleted = isCompleted;
    this.parentProject = parentProject;
  }
}


class Project {
  constructor(id, title, priority, createdAt) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.createdAt = createdAt;
  }
}
