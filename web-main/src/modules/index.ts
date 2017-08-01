import { combineReducers } from 'redux'
import { reducer as peerjs, PeerJsState } from './peerjs'
import { reducer as chat, ChatState } from './chat'
import { reducer as token, TokenState } from './token'
import {
  reducer as notifications,
  NotificationsState
} from 'react-notification-system-redux'

interface State {
  peerjs: PeerJsState,
  notifications: NotificationsState,
  chat: ChatState,
  token: TokenState
}

const reducers = combineReducers({
  peerjs,
  notifications,
  chat,
  token
})

const persistedState = [
  'token'
]

export { State, reducers, persistedState }