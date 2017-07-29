import * as React from 'react'
import styled from '../../constants/themed-components'

interface Props {
  children?: React.ReactNode
}

const ChatWindow = ({ children, ...rest }: Props) => (
  <div {...rest}>
    {children}
  </div>
)

const StyledChatWindow = styled(ChatWindow)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  padding: 10px;
`

export { StyledChatWindow as ChatWindow }