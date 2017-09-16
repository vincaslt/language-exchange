export interface ChatMessage {
  recipient: string,
  content: string
}

export interface ReceivedChatMessage {
  content: string,
  chatId: string,
  sender: {
    id: number,
    name: string
  }
}