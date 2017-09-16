import { ActiveUser } from '../managers/activeUsers'
import { chatMessagesHandler } from './chatMessages'
import { callHandler } from './call'
import { authentication } from './authentication'
import { answerCallHandler } from './answerCall'

// Register handlers here
const handlers = [
  chatMessagesHandler,
  callHandler,
  answerCallHandler
]

export interface HandlerPayload {
  io: SocketIO.Server,
  socket: SocketIO.Socket,
  sender: ActiveUser
}

const createHandlers = (payload: HandlerPayload) => {
  handlers.forEach(handler => handler(payload))
}

export { createHandlers, authentication }