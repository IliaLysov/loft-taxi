import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import { authMiddleware } from './modules/auth'



export const store = createStore(
    rootReducer,
    applyMiddleware(authMiddleware)
)
