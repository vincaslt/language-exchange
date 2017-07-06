import { Action } from 'redux-actions'
import { types, actions, messageQueue } from '../modules/chat'
import { takeLatest, select, put } from 'redux-saga/effects'

function* sendMessages(action: Action<SocketIOClient.Socket>) {
  if (action.payload) {
    const socket = action.payload
    const queue = yield select(messageQueue)
    socket.emit('chatMessages', queue)
    yield put(actions.clearQueue())
  }
}

export default [
  takeLatest(types.SEND_MESSAGES, sendMessages)
]
