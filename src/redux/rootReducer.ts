import { combineReducers } from "redux"
import { taxiReducer } from "./reducers"

const rootReducer = combineReducers({
  taxi: taxiReducer,
})

export default rootReducer
