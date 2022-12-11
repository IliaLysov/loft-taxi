import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { logIn, logOut } from "./actions"


const isLoggedIn = handleActions(
    {
        [logIn]: () => true,
        [logOut]: () => false
    },
    false
)


export default combineReducers({
    isLoggedIn
})