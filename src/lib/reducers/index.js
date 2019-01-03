import { combineReducers } from "redux"
import rooms from "./rooms"
import user from "./user"
import error from "./error"
import userSearch from "./userSearch"

export default combineReducers({
    rooms,
    user,
    error,
    userSearch
})
