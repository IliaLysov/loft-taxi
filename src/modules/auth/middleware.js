import {logIn} from './'
import { serverLogin } from '../../api'
import { authentificate } from './'


export const authMiddleware = store => next => async action => {
    if(action.type === authentificate.toString()) {
        const {email, password} = action.payload
        const success = await serverLogin(email, password)
        if(success){
            store.dispatch(logIn())
        }
    } else {
        next(action)
    }
}