import * as React from 'react'
import styled from '../../constants/themed-components'
import VideoPlayer, { Props as VideoPlayerProps} from '../../components/VideoPlayer'

const StyledVideoPlayer = styled(VideoPlayer)`
  height: 100%
  max-width: 100%
`

type Props = {
  className?: string
} & VideoPlayerProps

const Container = ({ className, ...rest }: Props) => (
  <div className={className}>
    <StyledVideoPlayer {...rest} />
  </div>
)

const FullscreenVideoContainer = styled(Container)`
  width: 100%
  height: 100%
  display: flex
  justify-content: flex-end
  background-color: ${({ theme }) => theme.colors.black}
`

export default FullscreenVideoContainer
