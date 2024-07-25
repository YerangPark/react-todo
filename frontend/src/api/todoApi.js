import axios from 'axios';

async function insertTodo(id, contents, status) {
  try {
    const response = await axios.post('/todos/insert', {
      id: id,
      contents: contents,
      status: status
    });
    console.log('Insert result:', response.data);
  } catch (error) {
    console.error('Error inserting todo:', error);
  }
}

async function getAllTodos() {
  try {
    const response = await axios.get('/todos/getAll', {});
    console.log('GetAllTodos result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting all todo:', error);
    throw error;
  }
}

async function updateTodoContents(id, newContents) {
  try {
    const response = await axios.post('/todos/update', {
      filter: { id: id },
      update: { contents: newContents },
    });
    console.log('Update result:', response.data);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}

async function updateTodoStatus(id, newStatus) {
  try {
    const response = await axios.post('/todos/update', {
      filter: { id: id },
      update: { status: newStatus },
    });
    console.log('Update result:', response.data);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await axios.post('/todos/delete', {
      filter: { id: id },
    });
    console.log('Delete result:', response.data);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

export default { insertTodo, getAllTodos, updateTodoContents, updateTodoStatus, deleteTodo };