import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import * as Dto from 'language-exchange-commons/dist/dto'

// TODO: Move to common constants for command names
const command = 'answerCall'


// TODO: sender ID is string by default
const answerCallHandler = ({ socket, io, sender }: HandlerPayload) => {
  socket.on(command, (roomId: string) => {
    const room = ActiveUsers.getActiveRoomById(sender.id.toString(), roomId).id
    console.info('---')
    console.info(`${sender.id} has answered the call`)
    console.info('---')
    const payload: Dto.RoomData = { room }
    socket.to(room).broadcast.emit('callAnswered', payload)
  })
}

export { answerCallHandler }