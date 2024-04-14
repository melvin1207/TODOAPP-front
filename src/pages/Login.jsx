import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, login } from '../features/user/userSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData ={
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <main className='container d-flex justify-content-center'>
        <form className="form rounded py-3 my-5 p-3" onSubmit={onSubmit}>
          <h4>Ingresa los datos de tu cuenta</h4>
          <div className="row">
            <div className="mb-3 my-2">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
              type="email" 
              className="form-control" 
              id="email" 
              name='email'
              value={email}
              placeholder="name@example.com" 
              onChange={onChange}
              required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
              type="password" 
              className="form-control" 
              id="password" 
              name='password'
              value={password}
              onChange={onChange}
              required />
            </div>
          </div>
          <button type="submit" className="my-2 btn btn-primary btn-form">Acceder</button>
        </form>
      </main>
    </>
  )
}

export default Login
