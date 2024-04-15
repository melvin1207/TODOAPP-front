import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTask } from '../features/task/taskSlice'

const TaskForm = () => {
  const [description, setDescription] = useState([])

  const dispatch = useDispatch()
  
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createTask({description}))
    setDescription('')
  }

  return (
    <>
        <form onSubmit={onSubmit} className="form-task">
          <div className="p-4">
            <label htmlFor="descripcion">Descripción</label>
            <input 
              className="form-control" 
              type="text"
              name="descripcion"
              id="descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success btn-submit my-5">Crear Tarea</button>
          </div>
        </form>
    </>
  )
}

export default TaskForm