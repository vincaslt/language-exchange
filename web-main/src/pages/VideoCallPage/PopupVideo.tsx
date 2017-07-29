import styled from '../../constants/themed-components'
import { VideoPlayer, preloadableVideo } from '../../components/VideoPlayer'

const StyledVideoPlayer = preloadableVideo(styled(VideoPlayer)`
  height: 100%;
`)

const PopupVideo = styled(StyledVideoPlayer)`
  position: absolute;
  height: 25%;
  width: auto;
  display: flex;
  flex: 0 0 auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  bottom: 2%;
  left: 2%;
  color: white;
`

export { PopupVideo }
