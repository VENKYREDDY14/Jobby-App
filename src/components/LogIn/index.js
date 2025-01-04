import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: '', erro: '', isLoginSuccess: true}
  }

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
    this.setState({username: '', password: ''})
  }

  onSubmitFailure = errorMsg => {
    this.setState({error: errorMsg, isLoginSuccess: false})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, error, isLoginSuccess} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="bg-container">
          <form onSubmit={this.submitDetails}>
            <div className="login-container">
              <div className="logo-align">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website logo"
                  className="login-image"
                />
              </div>
              <div className="username-container">
                <label htmlFor="username" className="username-styling">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="styling-input"
                  placeholder="Username"
                  onChange={this.handleUsername}
                  value={username}
                />
              </div>
              <div className="password-container">
                <label htmlFor="password" className="password-styling">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="styling-input"
                  placeholder="Password"
                  onChange={this.handlePassword}
                  value={password}
                />
              </div>

              <button className="login-button" type="submit">
                Login
              </button>
              {isLoginSuccess === false && (
                <p className="error-msg">*{error}</p>
              )}
            </div>
          </form>
        </div>
      </>
    )
  }
}
export default Login
