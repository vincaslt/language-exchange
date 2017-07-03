import * as React from 'react'
import styled from '../../constants/themed-components'
import { Chat } from '../../components/Chat'

type Props = {
  order: number
}

const ChatContainer = ({ order, ...props }: Props) => (
  <Chat {...props} />
)

const StyledChatContainer = styled(ChatContainer)`
  position: fixed
  display: flex
  width: 325px
  width: auto
  bottom: 0
  right: ${({ order }: Props) => 125 + order * 335 }px
  border-radius: 5px 5px 0 0
  background: ${({ theme }) => theme.colors.white}
  border-color: ${({ theme }) => theme.colors.dark}
`

export { StyledChatContainer as ChatContainer }