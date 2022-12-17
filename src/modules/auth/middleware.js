import {logIn} from './'
import { serverLogin, serverRegistration } from '../../api'
import { authentificate, registration } from './'



export const authMiddleware = store => next => async action => {
    if(action.type === authentificate.toString()) {
        const {email, password} = action.payload
        const response = await serverLogin(email, password)
        if(response.success){
            store.dispatch(logIn())
            localStorage.user = JSON.stringify({
                email: email,
                password: password,
                // token: response.token
            })
        }
    } else if(action.type === registration.toString()) {
        const {email, password, name, surname} = action.payload
        const response = await serverRegistration(email, password, name, surname)
        if(response.success){
            store.dispatch(logIn())
            localStorage.user = JSON.stringify({
                email: email,
                password: password,
            })
        } else {
            console.log(response)
        }
    } else {
        next(action)
    }
}