import { ActiveUser } from '../managers/activeUsers'
import { createChatMessagesHandler } from './chatMessages'

// Register handlers here
const handlers = [
  createChatMessagesHandler
]

export interface HandlerPayload {
  io: SocketIO.Server,
  socket: SocketIO.Socket,
  sender: ActiveUser
}

const createHandlers = (payload: HandlerPayload) => {
  handlers.forEach(handler => handler(payload))
}

export { createHandlers }