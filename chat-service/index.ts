import 'core-js'
import * as Server from 'socket.io'
import * as UUID from 'uuid/v4'
import { createHandlers, authentication } from './handlers'
import { ActiveUsers } from './managers/activeUsers'

const io = Server()

io.sockets.on('connection', authentication((socket, user) => {
  const sender = ActiveUsers.addActiveUser({
    id: user.id,
    name: user.username,
    rooms: [],
    socket
  })
  socket.emit('handshake')
  console.info('joined: ', user)

  createHandlers({ io, socket, sender })
}))

// TODO: disconnect cleanup

io.listen(process.env.PORT)

console.info(`Listening on port ${process.env.PORT}`)