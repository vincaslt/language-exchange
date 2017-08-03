import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import { Api, Entities } from 'language-exchange-commons'

// TODO: Move to common constants for command names
const command = 'authenticate'

type CallbackType = (socket: SocketIO.Socket, user: Entities.User) => void

const authentication = (authenticated: CallbackType) => (socket: SocketIO.Socket) => {
  socket.on(command, async (token: string) => {
    try {
      const user = await Api.getUserFromToken(token)
      authenticated(socket, user)
    } catch (error) {
      // TODO: unauthorized response
    }
  })
}

export { authentication }