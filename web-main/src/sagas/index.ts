import peerjs from './peerjs'
import chat from './chat'
import user from './user'

export function* sagas () {
  yield [
    ...peerjs,
    ...chat,
    ...user
  ]
}
