import { createAction } from 'redux-actions'

//authenticate
export const logIn = createAction('LOG_IN')
export const logOut = createAction('LOG_OUT')
export const authenticate = createAction('AUTHENTICATE')
export const registration = createAction('REGISTRATION')

//profile
export const payment = createAction('PAYMENT')
export const addPayment = createAction('ADD_PAYMENT')
export const setPaymentStatus = createAction('SET_PAYMENT_STATUS')

//map & order
export const address = createAction('ADDRESS')
export const getAddress = createAction('GET_ADDRESS')
export const route = createAction('ROUTE')
export const getRoute = createAction('GET_ROUTE')
export const setRouteStatus = createAction('SET_ROUTE_STATUS')

//online / offline
export const serverStatus = createAction('SERVER_STATUS')