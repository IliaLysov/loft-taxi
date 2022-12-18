import {takeEvery, call, put} from 'redux-saga/effects'
import { serverLogin, serverRegistration, serverPayment, serverAddress, serverRoute, serverGetPayment } from '../../api'
import { authentificate, logIn, registration, payment, addPayment, address, getAddress, route, getRoute, getPayment, setPayment } from './'

export function* authentificateSaga(action) {
    const {email, password} = action.payload
    const response = yield call(serverLogin, email, password)
    console.log(response)
    if(response.success){
        yield put(logIn())
        localStorage.user = JSON.stringify({
            email: email,
            password: password,
            token: response.token
        })
    } else if(response.error) {
        alert(response.error)
    }
}

export function* registrationSaga(action) {
    const {email, password, name, surname} = action.payload
    const response = yield call(serverRegistration, email, password, name, surname)
    console.log(response)
    if(response.success) {
        yield put(logIn())
        localStorage.user = JSON.stringify({
            email: email,
            password: password,
            token: response.token
        }) 
    } else if(response.error) {
        alert(response.error)
    }
}

export function* paymentSaga(action) {
    const {card, cvc, date, name} = action.payload
    const {token} = JSON.parse(localStorage.user)
    const response = yield call(serverPayment, card, date, name, cvc, token)
    console.log(response)
    if(response.success) {
        yield put(addPayment())
    } else if(response.error) {
        alert(response.error)
    }
}

export function* addressSaga() {
    const response = yield call(serverAddress)
    console.log(response)
    if (response.addresses) {
        yield put(getAddress(response.addresses))
    }
}

export function* routeSaga(action) {
    const {from, to} = action.payload
    const response = yield call(serverRoute, from, to)
    if (response) {
        yield put(getRoute(response))
    }
}

export function* getPaymentSaga() {
    const {token} = JSON.parse(localStorage.user)
    const response = yield call(serverGetPayment, token)
    if (response.id) {
        yield put(addPayment())
        yield put(setPayment(response))
    }
}

export function* Sagas() {
    yield takeEvery(authentificate.toString(), authentificateSaga)
    yield takeEvery(registration.toString(), registrationSaga)
    yield takeEvery(payment.toString(), paymentSaga)
    yield takeEvery(address.toString(), addressSaga)
    yield takeEvery(route.toString(), routeSaga)
    yield takeEvery(getPayment.toString(), getPaymentSaga)
}