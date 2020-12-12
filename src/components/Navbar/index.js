import React from "react"
import { Link } from "react-router-dom"
import Logo from "../../images/OLX-Logo.png"
import "./Navbar.css"
import userIcon from "../../images/userIcon.png"
import { connect } from "react-redux"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const Navbar = ({ dispatch, authStatus }) => {
  const handleQuit = () => {
    localStorage.removeItem("authToken")
    dispatch({ type: "login/quit" })
  }
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="nav-logo">
            <Link to="/">
              <img src={Logo} alt="OLX-logo" />
            </Link>
          </div>
          <ul className="nav-login">
            <li>
              {authStatus ? (
                <button onClick={handleQuit}>
                  <ExitToAppIcon />
                </button>
              ) : null}
            </li>
            <li>
              <img src={userIcon} alt="user"></img>
            </li>
            <li>
              <Link to="/loginform/login">
                <button>Мой профиль</button>
              </Link>
            </li>
            <li className="nav-button">
              {authStatus === "resolved" ? (
                <button> Подать обьявление</button>
              ) : (
                <Link to="/loginform/login">
                  <button> Подать обьявление</button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => ({
  authStatus: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(Navbar)
