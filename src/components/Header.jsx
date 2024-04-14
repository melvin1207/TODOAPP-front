import { FaSignInAlt, FaUser, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
  return (
    <header className='navbar navbar-expand-lg bg-danger' data-bs-theme='dark'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link to='/' className='logo'>TODOAPP</Link>
        </div>

        <ul>
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
        </ul>
      </div>
    </header>
  )
}

export default Header