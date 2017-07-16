import peerjs from './peerjs'
import chat from './chat'

export function* sagas () {
  yield [
    ...peerjs,
    ...chat
  ]
}
