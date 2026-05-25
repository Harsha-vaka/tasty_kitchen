import {useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    navigate('/', {replace: true})
  }

  const onSubmitFailure = error => {
    setShowErrorMsg(true)
    setErrorMsg(error)
  }

  const submitLoginForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
  <div className="login-container">
    <div className="login-form-container">
      <div className="form-card">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dmbzwerm6/image/upload/v1779452892/Frame_274_l2aqvg.png"
            className="login-logo"
            alt="website logo"
          />

          <h1 className="website-name">Tasty Kitchens</h1>
        </div>

        <h1 className="login-heading">Login</h1>

        <form className="form-container" onSubmit={submitLoginForm}>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>

            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>

            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>

    <div className="login-image-container">
      <img
        src="https://res.cloudinary.com/dmbzwerm6/image/upload/v1779442925/Rectangle_1456_inyvzn.png"
        className="login-image"
        alt="website login"
      />
    </div>
  </div>
)
}

export default LoginForm
