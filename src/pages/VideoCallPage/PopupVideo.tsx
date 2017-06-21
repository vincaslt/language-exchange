import styled from '../../constants/themed-components'
import VideoPlayer from '../../components/VideoPlayer'
import { PreloadableVideo } from '../../components/VideoPlayer'

const StyledVideoPlayer = PreloadableVideo(styled(VideoPlayer)`
  height: 100%
`)


const PopupVideo = styled(StyledVideoPlayer)`
  position: absolute
  height: 25%
  width: auto
  min-height: 100px
  overflow: hidden
  background-color: ${({ theme }) => theme.colors.black}
  border: 1px solid ${({ theme }) => theme.colors.dark}
  bottom: 2%
  left: 2%
  color: white
`


export default PopupVideo
