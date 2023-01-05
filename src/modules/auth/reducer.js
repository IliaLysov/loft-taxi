import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { logIn, logOut, addPayment, getAddress, getRoute, setPaymentStatus, setRouteStatus } from "./actions"


const isLoggedIn = handleActions(
    {
        [logIn]: () => true,
        [logOut]: () => false
    },
    false
)

const isPaymentAdded = handleActions(
    {
        [addPayment]: (_state, action) => action.payload
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

const paymentStatus = handleActions(
    {
        [setPaymentStatus]: (_state, action) => action.payload
    },
    false
)

const routeStatus = handleActions(
    {
        [setRouteStatus]: (_state, action) => action.payload
    },
    false
)

export default combineReducers({
    isLoggedIn,
    isPaymentAdded,
    addresses,
    routeCoordinates,
    paymentStatus,
    routeStatus
})