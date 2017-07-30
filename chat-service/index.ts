import 'core-js'
import * as Server from 'socket.io'
import * as socketioJwt from 'socketio-jwt'
import * as UUID from 'uuid/v4'
import { createHandlers } from './handlers'
import { ActiveUsers } from './managers/activeUsers'
import { jwtSecret } from 'language-exchange-commons/constants'

const io = Server()

io.use(socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}))

// Register event handlers
io.on('connection', socket => {
  function random(max: number) {
    return Math.random() * (max - 1) + 1
  }
  const id = UUID()
  const sender = ActiveUsers.addActiveUser({
    id,
    name: 'bob' + random(100),
    rooms: [],
    socket
  })
  socket.emit('handshake', { id })
  console.info('joined: ', id)
  
  // TODO: resolve client id from jwt token
  createHandlers({ io, socket, sender })
})

// Start listening for connections
io.listen(process.env.PORT)

console.info(`Listening on port ${process.env.PORT}`)