import { types, actions } from '../modules/peerjs'
import { takeLatest, put } from 'redux-saga/effects'

/**
 * Automatically accepts all incomming peerjs calls
 * TODO: let the user manually accept them?
 */
function* requestCourseLoadSaga() {
  yield put(actions.answerCall())
}

export default [
  takeLatest(types.RECEIVE_CALL, requestCourseLoadSaga)
]
