import { gql } from "graphql-request"
import API from "../../API"

const loginQuery = gql`
  query auth($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }
`

export const login = (values) => async (dispatch) => {
  try {
    console.log("СЮДА ЗАХОДИТ")
    dispatch({ type: "login/pending" })
    const { login } = await API.request(loginQuery, values)

    if (login !== null) {
      dispatch({ type: "login/resolved" })
      localStorage.setItem("authToken", login)
      API.setHeader("Authorization", `Bearer ${login}`)
    } else{
      dispatch({ type: "login/rejected"})
    }
    
  } catch (error) {
    dispatch({ type: "login/rejected"})
  }
}
