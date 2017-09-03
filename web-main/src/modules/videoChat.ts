import { createAction, handleActions, Action } from 'redux-actions'
import { withPayload } from '../utils/reduxUtils'

type VideoChatState = {
  incomingCall?: {
    // TODO: some room info (caller etc.)
    roomId: string
  },
  outgoingCall?: {
    recipientId: string
  }
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
  startCall: createAction(types.START_CALL, (recipientId: string) => recipientId),
  callIncoming: createAction(types.CALL_INCOMING, (roomId: string) => roomId), // TODO: make DTO for call info
  answerCall: createAction(types.ANSWER_CALL),
  rejectCall: createAction(types.REJECT_CALL)
}

export const reducer = handleActions<VideoChatState, string>({
  [types.START_CALL]: (state: VideoChatState, action: Action<string>) => (
    withPayload(action, payload => ({
      ...state,
      outgoingCall: {
        recipientId: payload
      }
    }), state)
  ),
  [types.CALL_INCOMING]: (state: VideoChatState, action: Action<string>) => (
    withPayload(action, payload => ({
      ...state,
      incomingCall: {
        roomId: payload
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
