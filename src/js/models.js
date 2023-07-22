export {
  Todo,
  List
}


function Todo(id, title, description, dueDate, createdAt, isCompleted, parentProject) {
  return {
    id,
    title,
    description,
    dueDate,
    createdAt,
    isCompleted,
    parentProject
  }
}

function List(id, title, createdAt) {
  return {
    id,
    title,
    createdAt
  }
}


// class Todo {
//   constructor(id, title, description, dueDate, priority, createdAt, isCompleted, parentProject) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.createdAt = createdAt;
//     this.isCompleted = isCompleted;
//     this.parentProject = parentProject;
//   }
// }


// class Project {
//   constructor(id, title, priority, createdAt) {
//     this.id = id;
//     this.title = title;
//     this.priority = priority;
//     this.createdAt = createdAt;
//   }
// }
