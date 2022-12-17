import {takeEvery, call, put} from 'redux-saga/effects'
import { serverLogin, serverRegistration, serverPayment, serverAddress } from '../../api'
import { authentificate, logIn, registration, payment, addPayment, address, getAddress } from './'

export function* authentificateSaga(action) {
    const {email, password} = action.payload
    const response = yield call(serverLogin, email, password)
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
    // console.log(response)
    if(response.success) {
        yield put(addPayment())
    } else if(response.error) {
        alert(response.error)
    }
}

export function* addressSaga() {
    const response = yield call(serverAddress)
    if (response.addresses) {
        yield put(getAddress(response.addresses))
    }
}

export function* Sagas() {
    yield takeEvery(authentificate.toString(), authentificateSaga)
    yield takeEvery(registration.toString(), registrationSaga)
    yield takeEvery(payment.toString(), paymentSaga)
    yield takeEvery(address.toString(), addressSaga)
}