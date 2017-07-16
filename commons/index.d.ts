export namespace Chat {
  interface Message {
    recipient: string,
    content: string
  }

  interface ReceivedMessage {
    content: string,
    sender: {
      id: string,
      name: string
    }
  }
}