import { token } from "../../API"

const initialState = {
  isLoggedIn: !!(token !== null),
  status: "idle",
  account: {}
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login/pending":
      return {
        ...state,
        isLoggedIn: false,
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
    case "user/resolved":
      return {
        ...state,
        account: action.payload
      }
    default:
      return state
  }
}

export default authReducer
