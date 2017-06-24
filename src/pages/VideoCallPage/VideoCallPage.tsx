import * as React from 'react'
import * as Router from 'react-router'
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

type Props = Router.RouteComponentProps<{}>
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
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => this.setState({ ...this.state, localStream: stream }))
  }

  render() {
    const minimizedLocalVideo = this.state.remoteStream
      ? <PopupVideo source={this.state.localStream} muted />
      : null
    return (
      <HeaderWithContent fullscreen>
        <PeerConnection />
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

export default StyledVideoCallPage
