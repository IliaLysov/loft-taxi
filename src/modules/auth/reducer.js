import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { logIn, logOut, addPayment, getAddress, getRoute, setPayment } from "./actions"


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

const routeCoordinates = handleActions(
    {
        [getRoute]: (_state, action) => action.payload
    },
    []
)

const payment = handleActions(
    {
        [setPayment]: (_state, action) => action.payload
    },
    {}
)

export default combineReducers({
    isLoggedIn,
    isPaymentAdded,
    addresses,
    routeCoordinates,
    payment
})