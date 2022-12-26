import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './modules'
// import { authMiddleware } from './modules/auth'
import createSagaMiddleware from 'redux-saga'
import { Sagas } from './modules/auth'

const sagaMiddleware = createSagaMiddleware()


export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
    )
)

sagaMiddleware.run(Sagas)