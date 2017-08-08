import { all } from 'redux-saga/effects'
import peerjs from './peerjs'
import chat from './chat'
import user from './user'

export function* sagas () {
  yield all([
    ...peerjs,
    ...chat,
    ...user
  ])
}
