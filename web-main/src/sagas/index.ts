import { all } from 'redux-saga/effects'
import peerjs from './peerjs'
import chat from './chat'
import user from './user'
import videoChat from './videoChat'

export function* sagas () {
  yield all([
    ...peerjs,
    ...chat,
    ...user,
    ...videoChat
  ])
}
