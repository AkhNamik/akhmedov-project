import React from "react"
import { Link } from "react-router-dom"
import Logo from "../../images/OLX-Logo.png"
import "./Navbar.css"
import userIcon from "../../images/userIcon.png"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"
import DropDown from "./DropDown"

const Navbar = ({ isLoggedIn }) => {
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
              <img src={userIcon} alt="user"></img>
            </li>
            <li>
              {isLoggedIn ? (
                <DropDown />
              ) : (
                <Link to="/loginform/login">
                  <Button>Мой профиль</Button>
                </Link>
              )}
            </li>
            <li className="nav-button">
              {isLoggedIn ? (
                <Link to="/adpost">
                  <button> Подать обьявление</button>
                </Link>
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
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(Navbar)
