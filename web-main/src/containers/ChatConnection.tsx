import * as React from 'react'
import * as io from 'socket.io-client'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import { messageQueue, ChatMessage, actions as chatActions } from '../modules/chat'
import {
  outgoingCall,
  incomingCall,
  OutgoingCall,
  IncomingCall as IncomingCallState,
  actions as videoActions
} from '../modules/videoChat'
import { PopUp } from '../components/PopUp'
import { IncomingCall } from '../components/IncomingCall'
import { token } from '../modules/token'

const url = 'https://192.168.0.111:5000'

type StateProps = {
  messageQueue: ChatMessage[],
  token: string,
  outgoingCall: OutgoingCall|undefined,
  incomingCall: IncomingCallState|undefined
}

type DispatchProps = {
  connected: typeof chatActions.connected
  sendMessages: typeof chatActions.sendMessages
  receivedMessage: typeof chatActions.receivedMessage
  callIncoming: typeof videoActions.callIncoming,
  answerCall: typeof videoActions.answerCall,
  rejectCall: typeof videoActions.rejectCall,
  callAnswered: typeof videoActions.callAnswered
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
    this.socket.on('handshake', this.props.connected)
    this.socket.on('call', this.props.callIncoming)
    this.socket.on('callAnswered', this.props.callAnswered)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.socket.connected) {
      if (nextProps.messageQueue.length > 0) {
        this.props.sendMessages(this.socket)
      }

      if (!this.props.outgoingCall && nextProps.outgoingCall) {
        this.socket.emit('call', { recipient: nextProps.outgoingCall.recipientId })
      }
    }
  }

  render() {
    return (
      <PopUp isOpen={!!this.props.incomingCall}>
        <IncomingCall
          onAnswer={() => this.props.answerCall(this.socket, this.props.incomingCall)}
          onHangUp={() => this.props.rejectCall(this.socket)}
        />
      </PopUp>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  messageQueue: messageQueue(state),
  token: token(state),
  outgoingCall: outgoingCall(state),
  incomingCall: incomingCall(state)
})

const mapDispatchToProps = {
  connected: chatActions.connected,
  sendMessages: chatActions.sendMessages,
  receivedMessage: chatActions.receivedMessage,
  callIncoming: videoActions.callIncoming,
  answerCall: videoActions.answerCall,
  rejectCall: videoActions.rejectCall,
  callAnswered: videoActions.callAnswered
}

const ConnectedChatConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatConnection)

export { ConnectedChatConnection as ChatConnection }