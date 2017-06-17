import * as React from 'react'
import * as Router from 'react-router'
import styled from '../../constants/themed-components'
import HeaderWithContent from '../../components/HeaderWithContent'
import FullscreenVideo from './FullscreenVideo'
import PopupVideo from './PopupVideo'
import Sidebar from './Sidebar'

const ContentContainer = styled.div`
  display: flex
  flex-direction: row
  justify-content: flex-between
  height: 100%
  width: 100%
`

type Props = Router.RouteComponentProps<{}>
type State = {
  localStream?: MediaStream
}

class VideoCallPage extends React.Component<Props, State> {
  state: State = {
    localStream: undefined
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => this.setState({ ...this.state, localStream: stream }))
  }

  render() {
    return (
      <HeaderWithContent fullscreen>
        <ContentContainer>
          <FullscreenVideo muted source="https://clips-media-assets.twitch.tv/25524229792-offset-14474.mp4#t=0"/>
          <Sidebar />
        </ContentContainer>
        <PopupVideo source={this.state.localStream} muted />
      </HeaderWithContent>
    )
  }
}


const StyledVideoCallPage = styled(VideoCallPage)`
  background-color: ${({ theme }) => theme.colors.white}
`

export default StyledVideoCallPage
