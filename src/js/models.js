export {
  Todo,
  Project
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

function Project(id, name, createdAt) {
  return {
    id,
    name,
    createdAt
  }
}
