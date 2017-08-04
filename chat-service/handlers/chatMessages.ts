import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import * as Dto from 'language-exchange-commons/dist/dto'

// TODO: Move to common constants for command names
const command = 'chatMessages'

// TODO: Make user id a string ?
const createChatMessagesHandler = ({ socket, io, sender }: HandlerPayload) => {
  socket.on(command, ([...messages]: Dto.ChatMessage[]) => {
    messages.forEach(message => {
      const room = ActiveUsers.enterRoomForTwo(sender.id.toString(), message.recipient)
      console.info('---')
      console.info('from: ', sender.id)
      console.info('to: ', message.recipient)
      console.info('message: ', message)
      console.info('---')
      const payload: Dto.ReceivedChatMessage = { 
        content: message.content,
        sender: {
          id: sender.id,
          name: sender.name
        }
      }
      socket.to(room).broadcast.emit('chatMessage', payload)
    })
  })
}

export { createChatMessagesHandler }