import {takeEvery, call, put} from 'redux-saga/effects'
import { serverLogin, serverRegistration, serverPayment, serverAddress, serverRoute, serverGetPayment } from '../../api'
import { authenticate, logIn, registration, payment, addPayment, address, getAddress, route, getRoute, serverStatus, setPaymentStatus, setRouteStatus } from '.'
import { offlineRoutes, offlineRouteNames } from './mapRoutes'


export function setServer(action) {
    localStorage.isOffline = action.payload
}


export function* authenticateSaga(action) {
    const {email, password} = action.payload

    let isOffline = false

    if (localStorage.isOffline) {
        isOffline = JSON.parse(localStorage.isOffline)
    } 
    if (isOffline) {
        let response = {}
        if (email === 'test@test.com' && password === '123123') {
            yield response = {success: true, token: 123}
        } else {
            yield response = {success: false, error: 'account whith this email or password does not exist'}
        }
        if (response.success) {
            if (typeof localStorage.payment !== 'undefined') {
                yield put(addPayment(true))
            }
            yield put(logIn())
            localStorage.user = JSON.stringify({
                email: email,
                password: password,
                token: response.token
            })
        } else if (response.error) {
            alert(response.error)
        }
    } else {
        try {
            const response = yield call(serverLogin, email, password)
            if(response.success){
                const responsePayment = yield call(serverGetPayment, response.token)
                if (responsePayment.id) {
                    yield put(addPayment(true))
                    localStorage.payment = JSON.stringify({
                        cardName: responsePayment.cardName,
                        cardNumber: responsePayment.cardNumber,
                        cvc: responsePayment.cvc,
                        expiryDate: responsePayment.expiryDate
                    })
                }
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
        catch(error) {
            alert(`The server is not responding. ${error}`)
        }
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

    let isOffline = false

    if (localStorage.isOffline) {
        isOffline = JSON.parse(localStorage.isOffline)
    }

    if (isOffline) {
        yield put(addPayment(true))
        yield put(setPaymentStatus(true))
        localStorage.payment = JSON.stringify({
            cardName: name,
            cardNumber: card,
            cvc: cvc,
            expiryDate: date
        })
    } else {
        const response = yield call(serverPayment, card, date, name, cvc, token)
        if(response.success) {
            yield put(addPayment(true))
            yield put(setPaymentStatus(true))
            localStorage.payment = JSON.stringify({
                cardName: name,
                cardNumber: card,
                cvc: cvc,
                expiryDate: date
            })
        } else if(response.error) {
            alert(response.error)
        }
    }
}

export function* addressSaga() {
    let isOffline = false

    if (localStorage.isOffline) {
        isOffline = JSON.parse(localStorage.isOffline)
    }

    if (isOffline) {
        yield put(getAddress(offlineRouteNames))
    } else {
        const response = yield call(serverAddress)
        if (response.addresses) {
            yield put(getAddress(response.addresses))
        }
    }
}

export function* routeSaga(action) {
    const {from, to} = action.payload

    let isOffline = false

    if (localStorage.isOffline) {
        isOffline = JSON.parse(localStorage.isOffline)
    }
    
    if(isOffline) {
        const input = (direction) => direction.trim().toLowerCase().split('').map(e => {
            if(e === '(' || e === ')') {
                e = `\\${e}`
                return e
            } else {
                return e
            }
        }).join('')
        const inputFrom = input(from)
        const inputTo = input(to)

        for (const route in offlineRoutes) {
            const inputRoute = (direction) => route.trim().toLowerCase().search(direction)

            if (inputRoute(inputFrom) !== -1 && inputRoute(inputTo) !== -1) {
                yield put(setRouteStatus(true))
                yield put(getRoute(offlineRoutes[route]))
            }            
        }
    } else {
        const response = yield call(serverRoute, from, to)
        if (response) {
            yield put(setRouteStatus(true))
            yield put(getRoute(response))
        }
    }
}



export function* Sagas() {
    yield takeEvery(authenticate.toString(), authenticateSaga)
    yield takeEvery(registration.toString(), registrationSaga)
    yield takeEvery(payment.toString(), paymentSaga)
    yield takeEvery(address.toString(), addressSaga)
    yield takeEvery(route.toString(), routeSaga)
    yield takeEvery(serverStatus.toString(), setServer)
}