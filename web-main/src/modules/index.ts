import { combineReducers, Action } from 'redux'
import { reducer as peerjs, PeerJsState } from './peerjs'
import { reducer as chat, ChatState } from './chat'
import {
  reducer as notifications,
  NotificationsReducer
} from 'react-notification-system-redux'

interface State {
  peerjs: PeerJsState,
  notifications: NotificationsReducer<Action>,
  chat: ChatState
}

const reducers = combineReducers({
  peerjs,
  notifications,
  chat
})

export { State, reducers }