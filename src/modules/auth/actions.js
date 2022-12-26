import { createAction } from 'redux-actions'

export const logIn = createAction('LOG_IN')
export const logOut = createAction('LOG_OUT')
export const authenticate = createAction('AUTHENTICATE')
export const registration = createAction('REGISTRATION')
export const payment = createAction('PAYMENT')
export const addPayment = createAction('ADD_PAYMENT')
export const address = createAction('ADDRESS')
export const getAddress = createAction('GET_ADDRESS')
export const route = createAction('ROUTE')
export const getRoute = createAction('GET_ROUTE')