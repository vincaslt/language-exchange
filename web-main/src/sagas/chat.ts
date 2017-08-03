import { Action } from 'redux-actions'
import { types, actions, messageQueue } from '../modules/chat'
import { Dto } from 'language-exchange-commons'
import { takeLatest, select, put } from 'redux-saga/effects'

function* sendMessagesSaga(action: Action<SocketIOClient.Socket>) {
  if (action.payload) {
    const socket = action.payload
    const queue: Dto.ChatMessage = yield select(messageQueue)
    socket.emit('chatMessages', queue)
    yield put(actions.clearQueue())
  }
}

export default [
  takeLatest(types.SEND_MESSAGES, sendMessagesSaga)
]
