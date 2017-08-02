import { Action } from 'redux-actions'
import { types, actions, messageQueue } from '../modules/chat'
import { Chat } from 'language-exchange-commons'
import { takeLatest, select, put } from 'redux-saga/effects'

function* sendMessagesSaga(action: Action<SocketIOClient.Socket>) {
  if (action.payload) {
    const socket = action.payload
    const queue: Chat.Message = yield select(messageQueue)
    socket.emit('chatMessages', queue)
    yield put(actions.clearQueue())
  }
}

export default [
  takeLatest(types.SEND_MESSAGES, sendMessagesSaga)
]
