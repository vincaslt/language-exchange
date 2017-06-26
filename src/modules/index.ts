import { combineReducers, Action } from 'redux'
import peerjs, { PeerJsState } from './peerjs'
import { reducer as notifications, NotificationsReducer } from 'react-notification-system-redux';

export interface State {
  peerjs: PeerJsState,
  notifications: NotificationsReducer<Action>
}

export const reducers = combineReducers({
  peerjs,
  notifications
})
