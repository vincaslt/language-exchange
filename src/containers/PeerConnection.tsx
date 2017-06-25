import * as React from 'react'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import {
  actions,
  isCallIncoming,
  isCalling,
  isCallAnswered,
  recipientId,
  isHost
} from '../modules/peerjs'
const PeerJS: typeof Peer = require('peerjs') // TODO: f**k peerJs declaring a namespace...

/**
 * Starts a real time connection between two clients using PeerJS
 * 
 * - peerId: string | undefined --> @default: redux state entry
 *    string: Immediatelly start a connection to a specified Id. State - client.
 *    undefined: Listend for incomming connections. State - host.
 * 
 * - onStream: (stream: MediaStream) => void
 *    callback that returns a stream object received from accepted call
 */

type OwnProps = {
  localStream?: MediaStream,
  onStream?: (stream: MediaStream) => void,
  onClose?: () => void
}

type StateProps = {
  recipientId: string | null,
  isCallIncoming: boolean,
  isCalling: boolean,
  isCallAnswered: boolean,
  isHost: boolean
}

type DispatchProps = {
  initializePeerJs: typeof actions.initialize,
  receiveCall: typeof actions.receiveCall,
  callAccepted: typeof actions.callAccepted,
  dropCall: typeof actions.dropCall,
  callDropped: typeof actions.callDropped
}

type Props = StateProps & DispatchProps & OwnProps

class PeerConnection extends React.Component<Props, {}> {
  peer: PeerJs.Peer
  incomingCall: PeerJs.MediaConnection
  props: Props

  componentDidMount() {
    this.peer = new PeerJS({ secure: true, host: 'server-atxqpdgwmp.now.sh', port: 443 })
    this.peer.on('open', this.props.initializePeerJs)
    this.peer.on('call', (call) => this.handleIncomingCall(call))
  }

  componentWillUnmount() {
    delete this.incomingCall
    this.peer.destroy()
    this.props.dropCall()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isCallAnswered && nextProps.isCallAnswered &&
        this.props.isCallIncoming && !nextProps.isCallIncoming) {
      this.incomingCall.answer(nextProps.localStream)
      this.handleCall(nextProps, this.incomingCall)
    }

    if (!this.props.isCalling && nextProps.isCalling && nextProps.recipientId) {
      const call = this.peer.call(nextProps.recipientId, nextProps.localStream)
      this.handleCall(nextProps, call)
    }
  }

  handleIncomingCall = (call: PeerJs.MediaConnection) => {
    this.incomingCall = call
    this.props.receiveCall(call.peer)
  }

  handleCall = (props: Props, call: PeerJs.MediaConnection) => {
    call.on('stream', (remoteStream: MediaStream) => {
      if (props.isHost) {
        this.props.callAccepted()
      }

      if (props.onStream) {
        props.onStream(remoteStream)
      }
    })

    call.on('close', () => {
      props.callDropped()
      if (props.onClose) {
        props.onClose()
      }
    })
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({
  recipientId: recipientId(state),
  isCallIncoming: isCallIncoming(state),
  isCalling: isCalling(state),
  isCallAnswered: isCallAnswered(state),
  isHost: isHost(state)
})

const mapDispatchToProps = {
  initializePeerJs: actions.initialize,
  receiveCall: actions.receiveCall,
  callAccepted: actions.callAccepted,
  dropCall: actions.dropCall,
  callDropped: actions.callDropped
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PeerConnection)
