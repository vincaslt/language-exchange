import * as React from 'react'
import styled from '../../constants/themed-components'
import { InputField } from '../../ui/InputField'
import { Button } from '../../ui/Button'

interface Props {
  onClickSend: (message: string) => void
}

interface State {
  message: string
}

class ChatInput extends React.Component<Props, State> {
  props: Props

  handleClickSend = () => {
    this.props.onClickSend(this.state.message)
    this.setState({ message: '' })
  }

  handleMessageChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ message: evt.currentTarget.value })
  }

  render() {
    const { onClickSend, ...rest} = this.props
    return (
      <div {...rest}>
        <InputField onChange={this.handleMessageChange} />
        <Button onClick={this.handleClickSend} color="secondary">Send</Button>
      </div>
    )
  }
}

const StyledChatInput = styled(ChatInput)`
  display: flex
  justify-content: stretch
  align-items: center
  padding: 10px
  width: 100%
`

export { StyledChatInput as ChatInput }