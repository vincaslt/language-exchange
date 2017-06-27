import * as React from 'react'
import styled from '../../constants/themed-components'
import { InputField } from '../../ui/InputField'
import { Button } from '../../ui/Button'

const ChatInput = ({ ...rest }) => (
  <div {...rest}>
    <InputField />
    <Button color="secondary">Send</Button>
  </div>
)

const StyledChatInput = styled(ChatInput)`
  display: flex
  justify-content: stretch
  align-items: center
  padding: 10px
  width: 100%
`

export { StyledChatInput as ChatInput }