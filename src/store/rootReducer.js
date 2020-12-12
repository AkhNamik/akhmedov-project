import authReducer from "./auth/authReducer"

const { combineReducers } = require("redux")

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
