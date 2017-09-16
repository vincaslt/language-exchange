import { combineReducers } from 'redux'
import { reducer as chat, ChatState } from './chat'
import { reducer as token, TokenState } from './token'
import { reducer as user, UserState } from './user'
import { reducer as videoChat, VideoChatState } from './videoChat'
import {
  reducer as notifications,
  NotificationsState
} from 'react-notification-system-redux'

interface State {
  notifications: NotificationsState,
  chat: ChatState,
  token: TokenState,
  user: UserState,
  videoChat: VideoChatState
}

const reducers = combineReducers({
  notifications,
  chat,
  token,
  user,
  videoChat
})

const persistedState = [
  'token',
  'user'
]

export { State, reducers, persistedState }