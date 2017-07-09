import * as React from 'react'
import { connect } from 'react-redux'
import { State as ReduxState } from '../modules'
import { isChatWindowVisible } from '../modules/chat'
import {
  SmallChatProps,
  SmallChatContainer,
  ChatWindow,
  ChatMessage,
  ChatInput
} from '../components/Chat'

interface StateProps {
  isChatWindowVisible: boolean
}

interface DispatchProps {

}

type OwnProps = SmallChatProps & {
  windowId: string
}

type Props = StateProps & DispatchProps & OwnProps

class SmallChat extends React.Component<Props> {
  props: Props
  render() {
    return this.props.isChatWindowVisible ? (
      <SmallChatContainer order={this.props.order}>
        <ChatWindow>
          <ChatMessage secondary>
            Hello, how are you?
          </ChatMessage>
          <ChatMessage>
            I am fine, thanks!
          </ChatMessage>
        </ChatWindow>
        <ChatInput />
      </SmallChatContainer>
    ) : null
  }
}

const mapStateToProps = (state: ReduxState, props?: OwnProps) => ({
  isChatWindowVisible: props ? isChatWindowVisible(props.windowId)(state) : false
})

const mapDispatchToProps = {

}

const ConnectedSmallChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallChat)

export { ConnectedSmallChat as SmallChat }