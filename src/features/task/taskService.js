import axios from 'axios'

const API_URL = 'https://backend-todoapp-rqnl.onrender.com/api/tasks/'

//crear tarea
const createTask = async(taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, taskData, config)

  return response.data
}

//obtener tareas
const getTasks = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

//eliminar tarea
const deleteTask = async(id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const taskService = {
  createTask,
  getTasks,
  deleteTask
}

export default taskService