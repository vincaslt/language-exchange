import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import * as Dto from 'language-exchange-commons/dist/dto'

// TODO: Move to common constants for command names
const command = 'call'

// TODO: Make user id a string ?
const callHandler = ({ socket, io, sender }: HandlerPayload) => {
  socket.on(command, (callData: Dto.CallData) => {
    const room = ActiveUsers.enterRoomForTwo(sender.id.toString(), callData.recipient)
    console.info('---')
    console.info(`${sender.id} is calling ${callData.recipient}`)
    console.info('---')
    const payload: Dto.RoomData = { room }
    // TODO: call to specific socket rather than room
    socket.to(room).broadcast.emit('call', payload)
  })
}

export { callHandler }