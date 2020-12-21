import { token } from "../../API"

const initialState = {
  isLoggedIn: !!(token !== null),
  status: "idle",
  account: {},
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
    case "login/exit":
      return {
        ...state,
        isLoggedIn: false,
      }

    case "user/resolved":
      return {
        ...state,
        account: action.payload,
      }
    case "user/removed":
      return {
        ...state,
        account: {},
      }
    default:
      return state
  }
}

export default authReducer
