import { Input } from "@material-ui/core"
import { gql } from "graphql-request"
import React, { useState } from "react"
import API from "../../../API"
import "../LoginAuth/Login.css"
const createMutation = gql`
  mutation create($login: String!, $password: String!) {
    createUser(login: $login, password: $password) {
      _id
      login
    }
  }
`
const LoginRegistration = () => {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState("")
  const onSubmit = (e) => {
    e.preventDefault()
    const { login, password } = values
    if (values !== {} && login !== undefined && password !== undefined) {
      API.request(createMutation, values)
      setStatus(<p>Регистрация прошла успешно</p>)
    }
  }
  const onChange = (e) => {
    const target = e.target
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="nav-form">
        <Input
          type="text"
          placeholder="Login"
          name="login"
          onChange={onChange}
        />
      </div>
      <div className="nav-form">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
      </div>
      <button type="submit" className="nav-formBtn">
        Регистрация
      </button>
      {status}
    </form>
  )
}

export default React.memo(LoginRegistration)
