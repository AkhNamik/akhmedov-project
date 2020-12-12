import { token } from "../../API"

const initialState = {
  isLoggedIn: !!(token !== null),
  status: "idle",
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login/pending":
      return {
        ...state,
        isLoggdIn: false,
        status: "pending",
      }
    case "login/resolved":
      return {
        ...state,
        isLoggedIn: true,
        status: "resolved",
      }
    case "login/rejected":
      return {
        ...state,
        isLoggedIn: false,
        status: "rejected",
      }
    case "login/quit":
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}

export default authReducer
