import { addPayment, authenticateSaga, logIn, authenticate, registrationSaga, registration } from "."
import {put, call} from 'redux-saga/effects'
import { serverLogin, serverGetPayment, serverRegistration } from "../../api"


describe('test sagas', () => {
    const user = {
        email: 'testmail',
        password: 'testpassword',
        name: 'testname',
        surname: 'testsurname'
    }
    describe('test authenticateSaga', () => {
        const gen = authenticateSaga(authenticate(user))
        
        it('calls serverLogin', () => {
            expect(gen.next().value).toEqual(call(serverLogin, user.email, user.password))
        })
    
        it('calls serverGetPaypent', () => {
            const response = {
                success: true,
                token: 'test'
            }
        
            expect(gen.next(response).value).toEqual(call(serverGetPayment, response.token))
        })
    
        it('dispatch addPayment', () => {
            const responsePayment = {
                id: 'testid'
            }
    
            expect(gen.next(responsePayment).value).toEqual(put(addPayment(true)))
        })
    
        it('dispatch logIn', () => {
            expect(gen.next().value).toEqual(put(logIn()))
        })
    })
    describe('test registrationSaga', () => {
        const gen = registrationSaga(registration(user))

        it('calls serverRegistration', () => {
            expect(gen.next().value).toEqual(call(serverRegistration, user.email, user.password, user.name, user.surname))
        })
    })
})    
