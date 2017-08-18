import { createAction, handleActions, Action } from 'redux-actions'
import { State as ReduxState } from './index'
import { safeSelect, withPayload } from '../utils/reduxUtils'


// TODO: remove peerId, it should be the same userId
export type PeerJsState = {
  peerId: string,
  isCalling: boolean,
  isCallIncoming: boolean,
  isCallAnswered: boolean,
  recipientId?: string,
  isReady?: boolean,
  isHost?: boolean
}|{}

export const initialState: PeerJsState = {}

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
  receiveCall: createAction(types.RECEIVE_CALL, (recipientId: string) => recipientId),
  answerCall: createAction(types.ANSWER_CALL),
  startCall: createAction(types.START_CALL, (recipientId: string) => recipientId),
  callAccepted: createAction(types.CALL_ACCEPTED),
  dropCall: createAction(types.DROP_CALL),
  callDropped: createAction(types.CALL_DROPPED)
}

export const reducer = handleActions<PeerJsState, string>({
  [types.INITIALIZE]: (state: PeerJsState, action: Action<string>): PeerJsState => {
    return withPayload(action, (payload) => ({
      peerId: payload,
      isCallIncoming: false,
      isCalling: false,
      isCallAnswered: false,
      isReady: true
    }), state)
  },
  [types.RECEIVE_CALL]: (state: PeerJsState, action: Action<string>): PeerJsState => ({
    ...state,
    recipientId: action.payload,
    isCallIncoming: true
  }),
  [types.ANSWER_CALL]: (state: PeerJsState): PeerJsState => ({
    ...state,
    isHost: false,
    isCallIncoming: false,
    isCallAnswered: true
  }),
  [types.START_CALL]: (state: PeerJsState, action: Action<string>): PeerJsState => ({
    ...state,
    isHost: true,
    recipientId: action.payload,
    isCalling: true
  }),
  [types.CALL_ACCEPTED]: (state: PeerJsState): PeerJsState => ({
    ...state,
    isCalling: false,
    isCallAnswered: true
  }),
  [types.DROP_CALL]: (state: PeerJsState): PeerJsState => ({}),
  [types.CALL_DROPPED]: (state: PeerJsState): PeerJsState => ({
    ...state,
    recipientId: undefined,
    isCallAnswered: false
  })
}, initialState)

const safePeerSelect = safeSelect<ReduxState>('peerjs')

export const isReady = safePeerSelect<boolean>('isReady')
export const isCalling = safePeerSelect<boolean>('isCalling')
export const isCallIncoming = safePeerSelect<boolean>('isCallIncoming')
export const isCallAnswered = safePeerSelect<boolean>('isCallAnswered')
export const isHost = safePeerSelect<boolean>('isHost')
export const recipientId = safePeerSelect<string|undefined>('recipientId')
export const peerId = safePeerSelect<string|undefined>('peerId')
