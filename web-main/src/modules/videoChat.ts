import { createAction, handleActions, Action } from 'redux-actions'
import { State as ReduxState } from './index'
import { createSelector } from 'reselect'
import { withPayload } from '../utils/reduxUtils'
import * as Dto from 'language-exchange-commons/dist/dto'

export interface OutgoingCall {
  recipientId: string
}

export interface IncomingCall {
  // TODO: some room info (caller etc.)
  roomId: string
}

export type ActiveCall = IncomingCall

export type VideoChatState = {
  incomingCall?: IncomingCall,
  outgoingCall?: OutgoingCall,
  activeCall?: ActiveCall
}

export const initialState: VideoChatState = {}

export const types = {
  START_CALL: 'VIDEO_CHAT/START_CALL',
  CALL_INCOMING: 'VIDEO_CHAT/CALL_INCOMING',
  ANSWER_CALL: 'VIDEO_CHAT/ANSWER_CALL',
  REJECT_CALL: 'VIDEO_CHAT/REJECT_CALL',
  JOIN_ROOM: 'VIDEO_CHAT/JOIN_ROOM',
  CALL_ANSWERED: 'VIDEO_CHAT/CALL_ANSWERED',
  DROP_CALL: 'VIDEO_CHAT/DROP_CALL'
}

export const actions = {
  startCall: createAction(types.START_CALL, (callData: Dto.CallData) => callData),
  callIncoming: createAction(types.CALL_INCOMING, (roomData: Dto.RoomData) => roomData),
  answerCall: createAction(
    types.ANSWER_CALL,
    (socket: SocketIOClient.Socket, incomingCall: IncomingCall|undefined) => ({
      socket, incomingCall
    })),
  rejectCall: createAction(types.REJECT_CALL, (socket: SocketIOClient.Socket) => socket),
  joinRoom: createAction(types.JOIN_ROOM, (roomData: Dto.RoomData) => roomData),
  callAnswered: createAction(types.CALL_ANSWERED, (roomData: Dto.RoomData) => roomData),
  dropCall: createAction(types.DROP_CALL)
}

export const reducer = handleActions<VideoChatState, Dto.CallData | Dto.RoomData>({
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
  }),
  [types.DROP_CALL]: (state: VideoChatState) => ({
    ...state,
    activeCall: undefined
  }),
  [types.JOIN_ROOM]: (state: VideoChatState, action: Action<Dto.RoomData>) => (
    withPayload(action, payload => ({
      ...state,
      activeCall: {
        roomId: payload.room
      }
    }), state)
  )
}, initialState)

export const outgoingCall = (state: ReduxState) => state.videoChat.outgoingCall
export const incomingCall = (state: ReduxState) => state.videoChat.incomingCall
export const activeCall = (state: ReduxState) => state.videoChat.activeCall
export const activeRoomId = createSelector(
  activeCall,
  (activeCall) => activeCall ? activeCall.roomId : undefined
)
