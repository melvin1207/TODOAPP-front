import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Crear una tarea
export const createTask = createAsyncThunk('tasks/create', async(tareaData, thunkAPI) => {
  try{
    const token = thunkAPI.getState().user.user.token
    return await taskService.createTask(tareaData, token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//obtener tareas de un usuario
export const getTasks = createAsyncThunk('tasks/get', async(_, thunkAPI) => {
  try{
    const token = thunkAPI.getState().user.user.token
    return await taskService.getTasks(token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//obtener tareas de un usuario
export const updateTask = createAsyncThunk('tasks/update', async(task, thunkAPI) => {
  try{
    const token = thunkAPI.getState().user.user.token
    return await taskService.updateTask(task, token) && taskService.getTasks(task.id, token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//borrar una tarea
export const deleteTask = createAsyncThunk('tasks/delete', async(id, thunkAPI) => {
  try{
    const token = thunkAPI.getState().user.user.token
    return await taskService.deleteTask(id, token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const taskSlice = createSlice ({
  name: 'task',
  initialState,
  reducers:{
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTask.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tasks.push(action.payload)
    })
    .addCase(createTask.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getTasks.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tasks = action.payload
    })
    .addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(updateTask.pending, (state) => {
      state.isLoading = true
    })
    .addCase(updateTask.fulfilled, (state,action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movies = action.payload
    })
    .addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(deleteTask.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tasks = state.tasks.filter((task) => task._id !== action.payload.id)
    })
    .addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer