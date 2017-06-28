import * as React from 'react'
import * as Peer from 'peerjs'
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
  onOpen?: (peerId: string) => void
}

type StateProps = {
  recipientId: string|null,
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
  peer: Peer
  incomingCall: Peer.MediaConnection
  props: Props

  componentDidMount() {
    this.peer = new Peer({ secure: true, host: 'server-atxqpdgwmp.now.sh', port: 443 })
    this.peer.on('open', (peerId) => {
      if (this.props.onOpen) {
        this.props.onOpen(peerId)
      }
      this.props.initializePeerJs(peerId)
    })
    this.peer.on('call', (call) => this.handleIncomingCall(call))
  }

  componentWillUnmount() {
    this.cleanupConnection()
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

    if (this.props.isCallAnswered && !nextProps.isCallAnswered) {
      this.cleanupConnection()
    }
  }

  cleanupConnection = () => {
    delete this.incomingCall
    if (this.peer && !this.peer.destroyed) {
      this.peer.destroy()
    }
  }

  handleIncomingCall = (call: Peer.MediaConnection) => {
    this.incomingCall = call
    this.props.receiveCall(call.peer)
  }

  handleCall = (props: Props, call: Peer.MediaConnection) => {
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

const ConnectedPeerConnection = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PeerConnection)

export { ConnectedPeerConnection as PeerConnection }
