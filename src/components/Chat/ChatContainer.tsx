import styled from '../../constants/themed-components'
import { Chat } from '../../components/Chat'

const StyledChatContainer = styled(Chat)`
  position: fixed
  display: flex
  max-width: 350px
  width: auto
  bottom: 0
  right: 125px
  border-radius: 5px 5px 0 0
  background: ${({ theme }) => theme.colors.white}
  border-color: ${({ theme }) => theme.colors.dark}
`

export { StyledChatContainer as ChatContainer }