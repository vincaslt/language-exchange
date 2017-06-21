import * as React from 'react'
import styled from 'styled-components'
import { Props as VideoPlayerProps} from './VideoPlayer'

type State = {
  playing: boolean
}

type ContainerProps = VideoPlayerProps & {
  className?: string
  visible: boolean
}

const preloadableVideo = (VideoPlayerComponent: React.ComponentClass<VideoPlayerProps>) => {

  const VideoContainer = ({ className, visible, ...rest }: ContainerProps) => (
    <div className={className}>
      <VideoPlayerComponent {...rest} />
    </div>
  )

  const StyledVideoContainer = styled(VideoContainer)`
    visibility: ${(props) => props.visible ? 'visible' : 'hidden'}
  `

  class PreloadableVideo extends React.Component<VideoPlayerProps, State>  {
    state: State = {
      playing: false
    }

    onStartPlaying = () => {
      this.setState({ ...this.state, playing: true })
    }
    
    render() {
      return (
        <StyledVideoContainer
          visible={this.state.playing}
          onStartPlaying={this.onStartPlaying}
          {...this.props}
        />
      )
    }
  }

  return PreloadableVideo
}

export default preloadableVideo