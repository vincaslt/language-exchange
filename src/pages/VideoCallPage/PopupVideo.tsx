import * as React from 'react'
import styled from '../../constants/themed-components'
import VideoPlayer, { Props as VideoPlayerProps} from '../../components/VideoPlayer'

const StyledVideoPlayer = styled(VideoPlayer)`
  height: 100%
`

type ContainerProps = VideoPlayerProps & {
  className?: string
  visible: boolean
}

const PopupVideoContainer = ({ className, visible, ...rest }: ContainerProps) => (
  <div className={className}>
    <StyledVideoPlayer {...rest} />
  </div>
)

const StyledPopupVideoContainer = styled(PopupVideoContainer)`
  position: absolute
  height: 25%
  width: auto
  min-height: 100px
  overflow: hidden
  background-color: ${({ theme }) => theme.colors.black}
  border: 1px solid ${({ theme }) => theme.colors.dark}
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'}
  bottom: 2%
  left: 2%
  color: white
`

type State = {
  playing: boolean
}

class PopupVideo extends React.Component<VideoPlayerProps, State>  {
  state: State = {
    playing: false
  }

  onStartPlaying = () => {
    this.setState({ ...this.state, playing: true })
  }
  
  render() {
    return (
      <StyledPopupVideoContainer
        visible={this.state.playing}
        onStartPlaying={this.onStartPlaying}
        {...this.props}
      />
    )
  }
}

export default PopupVideo
