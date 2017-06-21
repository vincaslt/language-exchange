import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducers } from './modules'
import { sagas } from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'

// add the middlewares
let middlewares = []

// add the saga middleware
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

// apply the middlewares
let middleware = applyMiddleware(...middlewares)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware)
}

// create the store
const store = createStore(reducers, middleware)
sagaMiddleware.run(sagas)

export { store }
