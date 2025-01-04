import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BsHouseDoor, BsBriefcase} from 'react-icons/bs'

import {IoExitOutline} from 'react-icons/io5'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-bg-container">
        <div className="header-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-top-image"
            />
          </Link>
          <div>
            <ul className="header-list">
              <div className="d">
                <div className="di">
                  <Link to="/" className="list-item">
                    <li className="h">Home</li>
                    <BsHouseDoor className="ic" />
                  </Link>

                  <Link to="/jobs" className="list-item">
                    <li className="h"> Jobs</li>
                    <BsBriefcase className="ic" />
                  </Link>
                </div>
                <li>
                  <div>
                    <button className="logout-button h" onClick={logout}>
                      Logout
                      <IoExitOutline className="ic" />
                    </button>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(Header)
