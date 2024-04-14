import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/Spinner'


const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  
  useEffect(() =>{

    if(!user){
      navigate('/login')
    } else{
      dispatch()
    }
    return () => {
      dispatch()
    }

  }, [user, navigate, dispatch])


  return (
    <div>MainPage</div>
  )
}

export default MainPage