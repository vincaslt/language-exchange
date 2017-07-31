import { combineReducers } from 'redux'
import { reducer as peerjs, PeerJsState } from './peerjs'
import { reducer as chat, ChatState } from './chat'
import { reducer as profile, ProfileState } from './profile'
import {
  reducer as notifications,
  NotificationsState
} from 'react-notification-system-redux'

interface State {
  peerjs: PeerJsState,
  notifications: NotificationsState,
  chat: ChatState,
  profile: ProfileState
}

const reducers = combineReducers({
  peerjs,
  notifications,
  chat,
  profile
})

const persistedState = [
  'profile'
]

export { State, reducers, persistedState }