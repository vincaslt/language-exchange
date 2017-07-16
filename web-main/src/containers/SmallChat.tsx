import * as React from 'react'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import {
  isChatWindowVisible,
  ChatWindowMessage,
  chatWindowMessages,
  actions
} from '../modules/chat'
import {
  SmallChatProps,
  SmallChatContainer,
  ChatWindow,
  ChatMessage,
  ChatInput
} from '../components/Chat'

interface StateProps {
  isChatWindowVisible: boolean,
  chatWindowMessages: ChatWindowMessage[]
}

interface DispatchProps {
  queueMessage: typeof actions.queueMessage
}

type OwnProps = SmallChatProps & {
  windowId: string
}

type Props = StateProps & DispatchProps & OwnProps

class SmallChat extends React.Component<Props> {
  props: Props

  handleSend = (message: string) => {
    this.props.queueMessage({
      content: message,
      recipient: this.props.windowId // TODO: decouple windowId from recipient, when action is refactored
    })
  }

  render() {
    const windows = this.props.chatWindowMessages.map(message => (
      <ChatMessage secondary>
        <b>{message.senderName}:</b> {message.content}
      </ChatMessage>
    ))
    return this.props.isChatWindowVisible ? (
      <SmallChatContainer order={this.props.order}>
        <ChatWindow>
          {windows}
        </ChatWindow>
        <ChatInput onClickSend={this.handleSend} />
      </SmallChatContainer>
    ) : null
  }
}

const mapStateToProps = (state: ReduxState, props?: OwnProps) => ({
  isChatWindowVisible: props ? isChatWindowVisible(props.windowId)(state) : false,
  chatWindowMessages: props ? chatWindowMessages(props.windowId)(state) : []
})

const mapDispatchToProps = {
  queueMessage: actions.queueMessage
}

const ConnectedSmallChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallChat)

export { ConnectedSmallChat as SmallChat }