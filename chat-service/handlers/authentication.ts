import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import { getUserFromToken } from '../api/profile'
import { User } from 'language-exchange-commons/entities'

// TODO: Move to common constants for command names
const command = 'authenticate'

type CallbackType = (socket: SocketIO.Socket, user: User) => void

const authentication = (authenticated: CallbackType) => (socket: SocketIO.Socket) => {
  socket.on(command, async (token: string) => {
    try {
      const user = await getUserFromToken(token)
      authenticated(socket, user)
    } catch (error) {
      // TODO: unauthorized response
    }
  })
}

export { authentication }