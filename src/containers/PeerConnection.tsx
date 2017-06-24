import * as React from 'react'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import { actions } from '../modules/peerjs'
const Peer = require('peerjs') // TODO: f**k peerJs declaring a namespace...

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

type PassedProps = {
  peerId?: string,
  onStream?: (stream: MediaStream) => void
}

type ReduxProps = {
  initializePeerJs: typeof actions.initialize
}

type Props = PassedProps & ReduxProps

class PeerConnection extends React.Component<Props, {}> {
  peer: PeerJs.Peer
  props: Props

  componentDidMount() {
    if (!this.props.peerId) {
      this.peer = new Peer({ key: 'h6cv4dod6i774x6r' })
      this.peer.on('open', this.props.initializePeerJs)
      this.peer.on('call', (call) => this.handleCall(call))
    }
  }

  handleCall = (call: PeerJs.MediaConnection) => {
    // call.answer(this.state.localStream)

    this.handleStream(call)
  }

  handleStream = (call: PeerJs.MediaConnection) => {
    call.on('stream', this.props.onStream || (() => { return }))
  }

  render() {
    return null
  }
}

const mapStateToProps = (state: ReduxState) => ({

})

const mapDispatchToProps = {
  initializePeerJs: actions.initialize
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeerConnection)
