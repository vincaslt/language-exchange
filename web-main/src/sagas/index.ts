import { all } from 'redux-saga/effects'
import chat from './chat'
import user from './user'
import videoChat from './videoChat'

export function* sagas () {
  yield all([
    ...chat,
    ...user,
    ...videoChat
  ])
}
