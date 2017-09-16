import * as React from 'react'
import { connect } from 'react-redux'
import * as SimpleWebRTC from 'simplewebrtc'
import { actions } from '../modules/videoChat'


interface OwnProps {
  onLocalStream: (stream: MediaStream) => void,
  onRemoteStream: (stream: MediaStream) => void,
  // TODO: onClose
  roomId: string
}

interface DispatchProps {
  joinRoom: typeof actions.joinRoom
}

type Props = DispatchProps & OwnProps

class VideoCall extends React.Component<Props> {
  props: Props
  rtc: SimpleWebRTC

  componentDidMount() {
    this.rtc = new SimpleWebRTC({
      autoRequestMedia: true,
      url: 'https://192.168.0.111:8888'
    })

    this.rtc.on('readyToCall', () => {
      this.rtc.joinRoom(this.props.roomId, (err) => {
        if (err) {
          throw err
        }
      })
    })

    this.rtc.on('localStream', this.props.onLocalStream)
    this.rtc.on('videoAdded', (video, peer) => {
      this.props.onRemoteStream(peer.stream)
    })
  }

  render() {
    return null
  }
}

const mapDispatchToProps = {
  joinRoom: actions.joinRoom
}

const ConnectedVideoCall = connect<{}, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(VideoCall)

export { ConnectedVideoCall as VideoCall }