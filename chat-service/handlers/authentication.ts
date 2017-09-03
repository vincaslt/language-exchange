import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import * as Api from 'language-exchange-commons/dist/api'
import * as Models from 'language-exchange-commons/dist/models'

// TODO: Move to common constants for command names
const command = 'authenticate'

type CallbackType = (socket: SocketIO.Socket, user: Models.User) => void

const authentication = (authenticated: CallbackType) => (socket: SocketIO.Socket) => {
  socket.on(command, async (token: string) => {
    try {
      const user = await Api.getUserFromToken(token)
      authenticated(socket, user)
    } catch (error) {
      console.error(error.stack)
      // TODO: unauthorized response
    }
  })
}

export { authentication }