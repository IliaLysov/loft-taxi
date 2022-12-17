import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { logIn, logOut, addPayment, getAddress } from "./actions"


const isLoggedIn = handleActions(
    {
        [logIn]: () => true,
        [logOut]: () => false
    },
    false
)

const isPaymentAdded = handleActions(
    {
        [addPayment]: () => true
    },
    false
)

const addresses = handleActions(
    {
        [getAddress]: (_state, action) => action.payload
    },
    []
)


export default combineReducers({
    isLoggedIn,
    isPaymentAdded,
    addresses
})