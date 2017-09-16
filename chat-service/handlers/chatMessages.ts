import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import * as Dto from 'language-exchange-commons/dist/dto'

// TODO: Move to common constants for command names
const command = 'chatMessages'

// TODO: Make user id a string ?
const chatMessagesHandler = ({ socket, io, sender }: HandlerPayload) => {
  socket.on(command, ([...messages]: Dto.ChatMessage[]) => {
    messages.forEach(message => {
      // First check if already in a room (sending roomId), else create a new one
      let activeRoom = ActiveUsers.getActiveRoom(sender.id.toString())
      if (!activeRoom || activeRoom.id !== message.recipient) {
        activeRoom = ActiveUsers.enterRoomForTwo(sender.id.toString(), message.recipient)
      }
      console.info('---')
      console.info('from: ', sender.id)
      console.info('chatId: ', activeRoom.id)
      console.info('to: ', message.recipient)
      console.info('message: ', message)
      console.info('---')
      const payload: Dto.ReceivedChatMessage = { 
        content: message.content,
        chatId: activeRoom.id,
        sender: {
          id: sender.id,
          name: sender.name
        }
      }
      socket.to(activeRoom.id).broadcast.emit('chatMessage', payload)
    })
  })
}

export { chatMessagesHandler }