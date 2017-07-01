import * as React from 'react'
import styled from '../../constants/themed-components'
import { ChatWindow } from './ChatWindow'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

const Chat = ({ ...rest }) => (
  <div {...rest}>
    <ChatWindow>
      <ChatMessage secondary>
        Hello, how are you?
      </ChatMessage>
      <ChatMessage>
        I am fine, thanks!
      </ChatMessage>
    </ChatWindow>
    <ChatInput />
  </div>
)

const StyledChat = styled(Chat)`
  display: flex
  flex-direction: column
  width: 400px
  height: 300px
  border: 1px solid ${({ theme }) => theme.colors.light}
  border-radius: 5px
`

export { StyledChat as Chat }