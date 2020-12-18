import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { login } from "../../../store/auth/action"
import "./Login.css"
import { CircularProgress, Input } from "@material-ui/core"
import ErrorIcon from "@material-ui/icons/Error"
const LoginAuth = ({ dispatch, isLoggedIn, authStatus }) => {
  const [values, setValues] = React.useState({})
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(values))
  }
  const onChange = (e) => {
    const target = e.target
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }
  if (isLoggedIn) {
    return <Redirect to="/" />
  }
  const Error = () => {
    return (
      <>
        <ErrorIcon />
        <p>Не правильный логин или пароль</p>
      </>
    )
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="nav-form">
        <Input
          name="login"
          onChange={onChange}
          type="text"
          placeholder="Login"
        />
      </div>
      <div className="nav-form">
        <Input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="nav-formBtn">
        Войти
      </button>
      <div className="error_box">
        {authStatus === "pending" ? <CircularProgress /> : null}
        {authStatus === "rejected" ? Error() : null}
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  authStatus: state.auth.status,
})
export default connect(mapStateToProps)(LoginAuth)
