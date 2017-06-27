import { combineReducers, Action } from 'redux'
import { reducer as peerjs, PeerJsState } from './peerjs'
import {
  reducer as notifications,
  NotificationsReducer
} from 'react-notification-system-redux'

interface State {
  peerjs: PeerJsState,
  notifications: NotificationsReducer<Action>
}

const reducers = combineReducers({
  peerjs,
  notifications
})

export { State, reducers }