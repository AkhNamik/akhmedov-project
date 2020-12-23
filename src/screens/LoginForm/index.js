import React, { useState } from "react"
import { Link, Route } from "react-router-dom"
import LoginAuth from "./LoginAuth/"
import LoginRegistration from "./LoginRegistration/"
import "./LoginForm.css"
const LoginForm = () => {
  const [isBtn, setIsBtn] = useState(true)
  const handleChangeFirst = () => setIsBtn(true)
  const handleChangeFalse = () => setIsBtn(false)
  return (
    <div className="login">
      <div className="login_form">
        <div className="login_formButtons">
          <Link to="/loginform/login">
            <button
              onClick={handleChangeFirst}
              className={`login_formFirstButton + " " + ${
                isBtn ? "active_firstButton" : null
              }`}
            >
              Войти
            </button>
          </Link>
          <Link to="/loginform/registr">
            <button
              onClick={handleChangeFalse}
              className={`login_formSecondButton + " " + ${
                !isBtn ? "active_secondButton" : null
              }`}
            >
              {" "}
              Регистрация
            </button>
          </Link>
        </div>
        <Route path="/loginform/login" component={LoginAuth} />
        <Route path="/loginform/registr" component={LoginRegistration} />
      </div>
    </div>
  )
}
export default React.memo(LoginForm)
