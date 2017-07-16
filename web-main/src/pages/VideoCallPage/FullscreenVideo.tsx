import styled from '../../constants/themed-components'
import { VideoPlayer, preloadableVideo } from '../../components/VideoPlayer'

const StyledVideoPlayer = preloadableVideo(styled(VideoPlayer)`
  height: 95%
  max-width: 95%
  border: 1px solid ${({ theme }) => theme.colors.dark}
`)

const FullscreenVideo = styled(StyledVideoPlayer)`
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background-color: ${({ theme }) => theme.colors.black}
`

export { FullscreenVideo }
