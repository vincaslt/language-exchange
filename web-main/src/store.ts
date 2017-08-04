import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import persistState, { mergePersistedState } from 'redux-localstorage'
import * as adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'
import { reducers, persistedState } from './modules'
import { sagas } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const history = createBrowserHistory()
const router = routerMiddleware(history)

const reducer = mergePersistedState()(connectRouter(history)(reducers))

// initializes local storage persistence
const storage = compose(
  filter(persistedState)
)(adapter(window.localStorage))

const middlewares = [
  sagaMiddleware,
  router
]

// apply the middlewares
let middleware = applyMiddleware(...middlewares)
let composeFn = process.env.NODE_ENV !== 'production'
  ? composeWithDevTools // adds devtools in development
  : compose

const enhancer = composeFn(middleware, persistState(storage, 'language-exchange'))

// create the store
const store = createStore(
  reducer,
  enhancer
)
sagaMiddleware.run(sagas)

export { store, history as browserHistory }
