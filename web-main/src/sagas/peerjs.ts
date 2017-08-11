import { types, actions } from '../modules/peerjs'
import { takeLatest, put } from 'redux-saga/effects'
import * as Notifications from 'react-notification-system-redux'

/**
 * Automatically accepts all incomming peerjs calls
 * TODO: let the user manually accept them?
 */
function* receiveCallSaga() {
  yield put(actions.answerCall())
}

/**
 * Clears all notifications when receiving a call
 */
function* dropCallSaga() {
  yield put(Notifications.removeAll())
}

export default [
  takeLatest(types.RECEIVE_CALL, receiveCallSaga),
  takeLatest(types.DROP_CALL, dropCallSaga)
]
