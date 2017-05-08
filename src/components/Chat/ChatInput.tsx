import * as React from 'react'
import styled from '../../constants/themed-components'
import InputField from '../InputField'
import Button from '../Button'

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

export default StyledChatInput