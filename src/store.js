import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './modules'
import { authMiddleware } from './modules/auth'



export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(authMiddleware),
    )
)
