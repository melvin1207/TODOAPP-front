import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/user/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.user)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header className='navbar navbar-expand-lg bg-danger' data-bs-theme='dark'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link to='/' className='logo'>TODOAPP</Link>
        </div>

        <ul>
          {user ? (
            <li>
              <button className='btn btn-success' onClick={onLogout}>
                <FaSignOutAlt/> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login' className='btn btn-success'>
                  <FaSignInAlt/>Login
                </Link>
              </li>

              <li>
                <Link to='/register' className='btn btn-success'>
                  <FaUser/> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header