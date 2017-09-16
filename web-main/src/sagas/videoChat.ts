import { Action } from 'redux-actions'
import { push } from 'connected-react-router'
import { types, IncomingCall } from '../modules/videoChat'
import * as Dto from 'language-exchange-commons/dist/dto'
import { routeNames } from '../constants/routeNames'
import { takeLatest, put } from 'redux-saga/effects'

function* answerCallSaga(
  action: Action<{ socket: SocketIOClient.Socket, incomingCall: IncomingCall}>
) {
  if (action.payload) {
    action.payload.socket.emit('answerCall')
    yield put(push(`${routeNames.call}/${action.payload.incomingCall.roomId}`))
  }
}

function* callAnsweredSaga(action: Action<Dto.RoomData>) {
  if (action.payload) {
    yield put(push(`${routeNames.call}/${action.payload.room}`))
  }
}

function rejectCallSaga(action: Action<SocketIOClient.Socket>) {
  const socket = action.payload
  if (socket) {
    socket.emit('rejectCall')
  }
}

export default [
  takeLatest(types.ANSWER_CALL, answerCallSaga),
  takeLatest(types.REJECT_CALL, rejectCallSaga),
  takeLatest(types.CALL_ANSWERED, callAnsweredSaga)
]
