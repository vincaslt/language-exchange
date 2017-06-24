import { combineReducers } from 'redux'
import peerjs, { PeerJsState } from './peerjs'

export interface State {
  peerjs: PeerJsState
}

export const reducers = combineReducers({
  peerjs
})
