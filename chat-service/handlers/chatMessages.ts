import { ActiveUsers } from '../managers/activeUsers'
import { HandlerPayload } from './index'
import { Chat } from 'language-exchange-commons'

// TODO: Move to common constants for command names
const command = 'chatMessages'

const createChatMessagesHandler = ({ socket, io, sender }: HandlerPayload) => {
  socket.on(command, ([...messages]: Chat.Message[]) => {
    messages.forEach((message) => {
      const room = ActiveUsers.enterRoomForTwo(sender.id, message.recipient)
      console.info('---')
      console.info('from: ', sender.id)
      console.info('to: ', message.recipient)
      console.info('message: ', message)
      console.info('---')
      const payload: Chat.ReceivedMessage = { 
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