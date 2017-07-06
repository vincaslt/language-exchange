import * as React from 'react'
import * as io from 'socket.io-client'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import { messageQueue, ChatMessage, actions } from '../modules/chat'

const url = 'http://localhost:5000'

type StateProps = {
  messageQueue: ChatMessage[]
}

type DispatchProps = {
  sendMessages: typeof actions.sendMessages
}

type Props = StateProps & DispatchProps

class ChatConnection extends React.Component<Props> {
  props: Props
  socket: SocketIOClient.Socket

  componentDidMount() {
    this.socket = io(url)
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
  messageQueue: messageQueue(state)
})

const mapDispatchToProps = {
  sendMessages: actions.sendMessages
}

const ConnectedChatConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatConnection)

export { ConnectedChatConnection as ChatConnection }