import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/task/taskSlice'
import DragAndDrop from '../components/DragAndDrop'
import TaskForm from '../components/TaskForm'

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { tasks, isLoading, isError, isSuccess, message } = useSelector((state) => state.task)

  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    } else {
      dispatch(getTasks())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  
  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <TaskForm/>
      <div className='container my-5 '>
        
        <DragAndDrop tareas={tasks}/>
      </div>
    </>
  )
}

export default MainPage