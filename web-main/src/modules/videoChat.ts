import { createAction, handleActions, Action } from 'redux-actions'
import { State as ReduxState } from './index'
import { withPayload } from '../utils/reduxUtils'
import * as Dto from 'language-exchange-commons/dist/dto'

export interface OutgoingCall {
  recipientId: string
}

export interface IncomingCall {
  // TODO: some room info (caller etc.)
  roomId: string
}

export type VideoChatState = {
  incomingCall?: IncomingCall,
  outgoingCall?: OutgoingCall
  activeCall?: {
    roomId: string
    // TODO: some room info (caller etc.)
  }
}

export const initialState: VideoChatState = {}

export const types = {
  START_CALL: 'VIDEO_CHAT/START_CALL',
  CALL_INCOMING: 'VIDEO_CHAT/CALL_INCOMING',
  ANSWER_CALL: 'VIDEO_CHAT/ANSWER_CALL',
  REJECT_CALL: 'VIDEO_CHAT/REJECT_CALL'
}

export const actions = {
  startCall: createAction(types.START_CALL, (callData: Dto.CallData) => callData),
  callIncoming: createAction(types.CALL_INCOMING, (roomData: Dto.RoomData) => roomData),
  answerCall: createAction(types.ANSWER_CALL),
  rejectCall: createAction(types.REJECT_CALL)
}

export const reducer = handleActions<VideoChatState, Dto.CallData|Dto.RoomData>({
  [types.START_CALL]: (state: VideoChatState, action: Action<Dto.CallData>) => (
    withPayload(action, payload => ({
      ...state,
      outgoingCall: {
        recipientId: payload.recipient
      }
    }), state)
  ),
  [types.CALL_INCOMING]: (state: VideoChatState, action: Action<Dto.RoomData>) => (
    withPayload(action, payload => ({
      ...state,
      incomingCall: {
        roomId: payload.room
      }
    }), state)
  ),
  [types.ANSWER_CALL]: (state: VideoChatState) => ({
    ...state,
    incomingCall: undefined
  }),
  [types.REJECT_CALL]: (state: VideoChatState) => ({
    ...state,
    incomingCall: undefined
  })
}, initialState)

export const outgoingCall = (state: ReduxState) => state.videoChat.outgoingCall
export const incomingCall = (state: ReduxState) => state.videoChat.incomingCall
