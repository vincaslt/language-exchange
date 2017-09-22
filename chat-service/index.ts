import 'core-js'

import * as fs from 'fs'
import * as https from 'https'
import * as express from 'express'
import * as Server from 'socket.io'
import * as UUID from 'uuid/v4'
import { User } from 'language-exchange-commons/dist/dto/User'
import { createHandlers, authentication } from './handlers'
import { ActiveUsers } from './managers/activeUsers'

const app = express()

app.get('/status', (req, res) => res.send('ok'))

// TODO: paging
app.get('/activeUsers', (req, res) => {
  const users = Object.values(ActiveUsers.getActiveUsers())
  const activeUsersDTO: User[] = users.map(user => ({
    id: user.id.toString(), // TODO: refactor userId to be always string
    name: user.name
  }))
  res.send(activeUsersDTO)
})

const server = https.createServer({
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}, app)

const io = Server(server)

io.sockets.on('connection', authentication((socket, user) => {
  const activeRoomIds = ActiveUsers.getActiveRooms(user.id.toString()).map(room => room.id)
  const sender = ActiveUsers.addActiveUser({
    id: user.id,
    name: user.username,
    rooms: activeRoomIds,
    socket
  })
  socket.emit('handshake')
  console.info('joined: ', user)

  createHandlers({ io, socket, sender })
}))

// TODO: disconnect cleanup
server.listen(process.env.PORT)

console.info(`Listening on port ${process.env.PORT}`)