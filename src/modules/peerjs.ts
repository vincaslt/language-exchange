import { createAction, handleActions, Action } from 'redux-actions'
// import { createSelector, Selector } from 'reselect'
// import { State as ReduxState } from './index'

export type PeerJsState = {
  peerId: string,
  isCalling: boolean,
  isCallIncoming: boolean,
  isAnswered: boolean,
  isHost?: boolean
} | { 
  error: boolean
} | null

export const initialState: PeerJsState = null

export const types = {
  INITIALIZE: 'PEER_JS/INITIALIZE',
  RECEIVE_CALL: 'PEER_JS/RECEIVE_CALL',
  ANSWER_CALL: 'PEER_JS/ANSWER_CALL',
  START_CALL: 'PEER_JS/START_CALL',
  CALL_ACCEPTED: 'PEER_JS/CALL_ACCEPTED',
  DROP_CALL: 'PEER_JS/DROP_CALL',
  CALL_DROPPED: 'PEER_JS/CALL_DROPPED'
}

export const actions = {
  initialize: createAction(types.INITIALIZE, (peerId: string) => peerId),
  receiveCall: createAction(types.RECEIVE_CALL),
  answerCall: createAction(types.ANSWER_CALL),
  startCall: createAction(types.START_CALL),
  callAccepted: createAction(types.CALL_ACCEPTED),
  dropCall: createAction(types.DROP_CALL),
  callDropped: createAction(types.CALL_DROPPED)
}

export default handleActions<PeerJsState, string>({
  [types.INITIALIZE]: (state: PeerJsState, action: Action<string>): PeerJsState => {
    return action.payload ? {
      peerId: action.payload,
      isCallIncoming: false,
      isCalling: false,
      isAnswered: false
    } : { error: true }
  },
  [types.RECEIVE_CALL]: (state: PeerJsState): PeerJsState => ({
    ...state,
    isCallIncoming: true
  }),
  [types.ANSWER_CALL]: (state: PeerJsState): PeerJsState => ({
    ...state,
    isHost: false,
    isCallIncoming: false,
    isCallAnswered: true
  }),
  [types.START_CALL]: (state: PeerJsState): PeerJsState => ({
    ...state,
    isCalling: true
  }),
  [types.CALL_ACCEPTED]: (state: PeerJsState): PeerJsState => ({
    ...state,
    isHost: true,
    isCalling: false
  }),
  [types.DROP_CALL]: (state: PeerJsState): PeerJsState => null,
  [types.CALL_DROPPED]: (state: PeerJsState): PeerJsState => null // TODO: maybe just clear params?
}, initialState)