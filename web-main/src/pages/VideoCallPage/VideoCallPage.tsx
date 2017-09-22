import * as React from 'react'
import * as Router from 'react-router'
import styled from '../../constants/themed-components'
import { HeaderWithContent } from '../../components/HeaderWithContent'
import { VideoCall } from '../../containers/VideoCall'
import { FullscreenVideo } from './FullscreenVideo'
import { PopupVideo } from './PopupVideo'
import { Sidebar } from './Sidebar'
// import { routeNames } from '../../constants/routeNames'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-between;
  background-color: ${({ theme }) => theme.colors.black};
  height: 100%;
  width: 100%;
`

type OwnProps = Router.RouteComponentProps<{
  roomId: string
}>

type Props = OwnProps
type State = {
  localStream?: MediaStream
  remoteStream?: MediaStream
}

class VideoCallPage extends React.Component<Props, State> {
  state: State = {
    localStream: undefined,
    remoteStream: undefined
  }

  handleRemoteStream = (remoteStream: MediaStream) => {
    this.setState({ remoteStream })
  }

  handleLocalStream = (localStream: MediaStream) => {
    this.setState({ localStream })
  }

  // handleCloseCall = () => {
  //   this.setState({ ...this.state, localStream: undefined, remoteStream: undefined })
  //   this.props.push(routeNames.call)
  // }

  render() {
    
    const minimizedLocalVideo = this.state.remoteStream
      ? <PopupVideo source={this.state.localStream} muted />
      : null

    const roomId = this.props.match.params.roomId
    const videoCall = roomId
      ? (
        <VideoCall
          onLocalStream={this.handleLocalStream}
          onRemoteStream={this.handleRemoteStream}
          roomId={roomId}
        />
      ) : null
    
    return (
      <HeaderWithContent fullscreen>
        {videoCall}
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
  background-color: ${({ theme }) => theme.colors.white};
`

export { StyledVideoCallPage as VideoCallPage }
