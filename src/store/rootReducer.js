import adReducer from "./adCreator/adReducer"
import authReducer from "./auth/authReducer"
const { combineReducers } = require("redux")
const rootReducer = combineReducers({
  auth: authReducer,
  adCreator: adReducer,
})
export default rootReducer
