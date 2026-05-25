import Cookies from 'js-cookie'
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="website-logo-link"
      >
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dmbzwerm6/image/upload/v1779452892/Frame_274_l2aqvg.png"
            alt="website logo"
            className="website-logo"
          />

          <h1 className="website-name">
            Tasty Kitchens
          </h1>
        </div>
      </Link>

      <div className="nav-menu">
        <Link
          to="/"
          className={
            location.pathname === '/'
              ? 'active-link'
              : 'nav-link'
          }
        >
          Home
        </Link>

        <Link
          to="/cart"
          className={
            location.pathname ===
            '/cart'
              ? 'active-link'
              : 'nav-link'
          }
        >
          Cart
        </Link>

        <button
          type="button"
          className="logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header