import 'core-js'
import * as Server from 'socket.io'
import * as socketioJwt from 'socketio-jwt'
import * as UUID from 'uuid/v4'
import { createHandlers } from './handlers'
import { ActiveUsers } from './managers/activeUsers'
import { jwtSecret } from 'language-exchange-commons/constants'

const io = Server()

// Register event handlers
io.sockets.on('connection', socketioJwt.authorize({
  secret: jwtSecret,
  timeout: 15000
})).on('authenticated', socket => {
  const id = socket.decoded_token.id // TODO: type / user model

  function random(max: number) {
    return Math.random() * (max - 1) + 1
  }

  const sender = ActiveUsers.addActiveUser({
    id,
    name: 'bobik' + random(100), // TODO: get from database
    rooms: [],
    socket
  })
  socket.emit('handshake', { id }) // TODO: No need, user should already know his ID
  console.info('joined: ', id)

  createHandlers({ io, socket, sender })
})

// TODO: disconnect cleanup

// Start listening for connections
io.listen(process.env.PORT)

console.info(`Listening on port ${process.env.PORT}`)