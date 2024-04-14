import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { reset, register } from '../features/user/userSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.user)

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Los passwords no coinciden')
    } else {
      const userData = {
        name, email, password
      }
      dispatch(register(userData))
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/login')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <main className='container d-flex justify-content-center'>
        <form className="form rounded py-3 my-5 p-3" onSubmit={onSubmit}>
          <h4>Hola, Crea una cuenta para comenzar a usar la aplicación</h4>
          <div className="row">
            <div className="col">
              <label htmlFor="first_name" className="form-label" >Nombre</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                name='name'
                value={name}
                placeholder="Nombre"
                onChange={onChange}
                required />
            </div>

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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Repita el password</label>
              <input 
              type="password" 
              className="form-control" 
              id="password2" 
              name='password2'
              value={password2}
              onChange={onChange}
              required />
            </div>
          </div>
          <button type="submit" className="my-2 btn btn-primary btn-form">Enviar</button>
        </form>
      </main>
    </>
  )
}

export default Register
