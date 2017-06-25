import * as React from 'react'
import { connect } from 'react-redux'
import * as Router from 'react-router'
import { actions } from '../../modules/peerjs'
import styled from '../../constants/themed-components'
import HeaderWithContent from '../../components/HeaderWithContent'
import PeerConnection from '../../containers/PeerConnection'
import FullscreenVideo from './FullscreenVideo'
import PopupVideo from './PopupVideo'
import Sidebar from './Sidebar'

const ContentContainer = styled.div`
  display: flex
  flex-direction: row
  justify-content: flex-between
  background-color: ${({ theme }) => theme.colors.black}
  height: 100%
  width: 100%
`

type OwnProps = Router.RouteComponentProps<{
  recipientId?: string
}>

type DispatchProps = {
  startCall: typeof actions.startCall
}

type Props = OwnProps & DispatchProps
type State = {
  localStream?: MediaStream
  remoteStream?: MediaStream
}

class VideoCallPage extends React.Component<Props, State> {
  state: State = {
    localStream: undefined,
    remoteStream: undefined
  }

  componentDidMount() {
    this.loadCamera()
  }

  componentDidUpdate() {
    const recipientId = this.props.match.params.recipientId
    if (!this.state.localStream) {
      this.loadCamera()
    } else if (recipientId) {
      this.props.startCall(recipientId)
    }
  }

  loadCamera = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => this.setState({ ...this.state, localStream: stream }))
  }

  handleStream = (remoteStream?: MediaStream) => {
    if (remoteStream) {
      this.setState({ ...this.state, remoteStream })
    }
  }

  handleCloseCall = () => {
    this.setState({ ...this.state, localStream: undefined, remoteStream: undefined })
  }

  render() {
    const peerConnection = this.state.localStream
      ? (
        <PeerConnection
          localStream={this.state.localStream}
          onStream={this.handleStream}
          onClose={this.handleCloseCall}
        />
      )
      : null
    const minimizedLocalVideo = this.state.remoteStream
      ? <PopupVideo source={this.state.localStream} muted />
      : null
    return (
      <HeaderWithContent fullscreen>
        {peerConnection}
        <ContentContainer>
          <FullscreenVideo source={this.state.remoteStream || this.state.localStream}/>
          <Sidebar />
        </ContentContainer>
        {minimizedLocalVideo}
      </HeaderWithContent>
    )
  }
}

const StyledVideoCallPage = styled(VideoCallPage)`
  background-color: ${({ theme }) => theme.colors.white}
`

const mapDispatchToProps = {
  startCall: actions.startCall
}

export default connect<{}, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(StyledVideoCallPage)
