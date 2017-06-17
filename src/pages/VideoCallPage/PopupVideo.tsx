import * as React from 'react'
import styled from '../../constants/themed-components'
import VideoPlayer, { Props as VideoPlayerProps} from '../../components/VideoPlayer'

const StyledVideoPlayer = styled(VideoPlayer)`
  height: 100%
`

type Props = {
  className?: string
} & VideoPlayerProps

const Container = ({ className, ...rest }: Props) => (
  <div className={className}>
    <StyledVideoPlayer {...rest} />
  </div>
)

const PopupVideo = styled(Container)`
  position: absolute
  height: 25%
  width: auto
  min-height: 100px
  overflow: hidden
  background-color: ${({ theme }) => theme.colors.black}
  border: 1px solid ${({ theme }) => theme.colors.dark}
  bottom: 1%
  left: 1%
`

export default PopupVideo
