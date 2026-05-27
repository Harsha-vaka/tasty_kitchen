import {useEffect, useState} from 'react'

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

  const [cartCount, setCartCount] =
    useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cartData =
        JSON.parse(
          localStorage.getItem(
            'cartData',
          ),
        ) || []

      const totalCount =
        cartData.reduce(
          (acc, each) =>
            acc + each.quantity,
          0,
        )

      setCartCount(totalCount)
    }

    updateCartCount()

    window.addEventListener(
      'storage',
      updateCartCount,
    )

    return () => {
      window.removeEventListener(
        'storage',
        updateCartCount,
      )
    }
  }, [location.pathname])

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
          <div className="cart-nav-container">
            <p className="cart-text">
              Cart
            </p>

            {cartCount > 0 && (
              <div className="cart-count-badge">
                {cartCount}
              </div>
            )}
          </div>
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