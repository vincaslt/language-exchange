import * as React from 'react'
import * as io from 'socket.io-client'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import { messageQueue, ChatMessage, actions } from '../modules/chat'
import { token } from '../modules/token'

const url = 'http://localhost:5000'

type StateProps = {
  messageQueue: ChatMessage[],
  token: string
}

type DispatchProps = {
  connected: typeof actions.connected
  sendMessages: typeof actions.sendMessages
  receivedMessage: typeof actions.receivedMessage
}

type Props = StateProps & DispatchProps

class ChatConnection extends React.Component<Props> {
  props: Props
  socket: SocketIOClient.Socket

  componentDidMount() {
    this.socket = io(url)
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', this.props.token)
    })

    this.socket.on('chatMessage', this.props.receivedMessage)
    this.socket.on('handshake', ({ id }: { id: string }) => this.props.connected(id)) 
    // TODO: request for profile info, and won't need this ^
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.socket.connected && nextProps.messageQueue.length > 0) {
      this.props.sendMessages(this.socket)
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  messageQueue: messageQueue(state),
  token: token(state)
})

const mapDispatchToProps = {
  connected: actions.connected,
  sendMessages: actions.sendMessages,
  receivedMessage: actions.receivedMessage
}

const ConnectedChatConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatConnection)

export { ConnectedChatConnection as ChatConnection }