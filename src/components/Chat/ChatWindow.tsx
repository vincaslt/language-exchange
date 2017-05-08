import * as React from 'react'
import styled from '../../constants/themed-components'

interface Props {
  children?: JSX.Element
}

const ChatWindow = ({ children, ...rest }: Props) => (
  <div {...rest}>
    {children}
  </div>
)

const StyledChatWindow = styled<Props>(ChatWindow)`
  display: flex
  flex-direction: column
  flex-grow: 1
  width: 100%
  padding: 10px
`

export default StyledChatWindow